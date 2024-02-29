/*
 * @Author: XJN
 * @Date: 2023-11-27 10:18:39
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2024-01-02 15:19:09
 * @FilePath: \easy_pan\src\views\Home\UploadShow\index.tsx
 * @Description: 上传
 * 分为了好几个部分
 *  1. 先上传进行切片，在切片的过程中，显示的是在解析中，有一个饼形图来显示切片的速度
 *  2. 在切玩片之后，在进行上传，显示上传的进度
 *  3. 还有暂停的功能，上传到一半，我暂停，之后在继续上传
 * （这里也涉及到断点上传，在上传到一半的时候，我下次再从这个地方进行上传）
 *  4. 在服务器接收到所上传的参数的时候也需要进行一个拼接的过程，这个时候我们的前端展示的应该是解码中这样的字段...
 * @前端实习生: 鲸落
 */
import { useAppDispatch, useAppSelector } from '@/store';
import { ClockCircleOutlined, CloseCircleTwoTone, CloudUploadOutlined, PauseCircleTwoTone, SwapOutlined } from '@ant-design/icons'
import { Popover, Progress } from 'antd'
import React, { memo, useEffect, useRef, useState } from 'react'
import SparkMD5 from "spark-md5";
import {nanoid} from 'nanoid'
import { UploadShowStyle } from './style';
import { uploadChunkFile } from '@/service/modules/upload';
import { changeMessageApi } from '@/store/modules/common';
import { useOutletContext } from 'react-router-dom';


const STATUS = {
  emptyfile: {
      value: "emptyfile",
      desc: "文件为空",
      color: "#F75000",
      icon: "close",
  },
  fail: {
      value: "fail",
      desc: "上传失败",
      color: "#F75000",
      icon: "close",
  },
  init: {
      value: "init",
      desc: "解析中",
      color: "#e6a23c",
      icon: "clock"
  },
  uploading: {
      value: "uploading",
      desc: "上传中",
      color: "#409eff",
      icon: "upload",
  },
  upload_finish: {
      value: "upload_finish",
      desc: "上传完成",
      color: "#67c23a",
      icon: "ok",
  },
  upload_seconds: {
      value: "upload_seconds",
      desc: "秒传",
      color: "#67c23a",
      icon: "ok",
  },
};

interface fileItemType{
  // 文件
  file: Blob
  // 文件UID
  uid: string
  // md5进度：切片进度
  md5Progress: number
  // md5值
  md5: null | string
  // 文件名
  fileName: string
  // 上传状态
  status: any
  // 已上传大小
  uploadSize: number
  // 文件总大小
  totalSize: number
  // 上传进度
  uploadProgress: number
  // 暂停
  pause: boolean
  // 当前分片
  chunkIndex: number
  // 文件父级ID
  filePid: string
  // 错误信息
  errorMsg: null | string
}

// 切片大小
const CHUNK_SIZE = 1024 * 1024 * 3;

const index = memo(() => {
  const getSpace = useOutletContext() as ()=>{};
  const dispatch = useAppDispatch()
  
  const { popoverShow, file, getDataMethod }  = useAppSelector((state)=>{
    return {
      popoverShow: state.upload.isPopoverShow,
      file: state.upload.file,
      getDataMethod: state.home.getDataMethod,
    }
  })

  // Popover 是否展示
  const [ isPopoverShow, setIsPopoverShow ] = useState<boolean>(popoverShow)
  // 视图列表的展示
  const arrList = useRef<fileItemType[]>([])
  const [ fileList, setFileList ] = useState<fileItemType[]>([]);
    
    useEffect(()=>{
      setIsPopoverShow(popoverShow)
    }, [popoverShow])

    useEffect(()=>{
      // 取10位时间戳
      if(file.name) addFile(file, String(Math.round(new Date().getTime() / 1000)))
    }, [file])

    // ---- method -----

    /**
     * 添加文件
     * @param file 文件：包含文件大小、文件名、文件流.... 
     * @param filePid 文件ID
     */
    const addFile = async (file: any, filePid: string) => {
        const uuid = nanoid()
        const fileItem: fileItemType = {
            // 文件, 文件大小, 文件流, 文件名...
            file: file,
            // 文件UID
            uid: uuid,
            // md5进度:进度解析
            md5Progress: 0,
            // md5值
            md5: null,
            // 文件名
            fileName: file.name,
            // 上传状态
            status: 'init',
            // 已上传大小
            uploadSize: 0,
            // 文件总大小
            totalSize: file.size,
            // 上传进度
            uploadProgress: 0,
            // 暂停
            pause: false,
            // 当前分片
            chunkIndex: 0,
            // 文件父级ID
            filePid: filePid,
            // 错误信息
            errorMsg: null
        };

        let arr = [...fileList, fileItem]
        // 初始结构将其放入
        setFileList(arr);
        // 这边多一个ref来存储数据，为了获取最新数组中的数据，我也不知道为什么在数据流的传递中，无法获取到最新的fileList
        arrList.current = arr

        // 为空直接结束
        if(fileItem.totalSize === 0){
          fileItem.status = STATUS.emptyfile.value;
          return
        }

        // 切片
        let blobStream = await createChunk(fileItem);
        if (!blobStream) return
        uploadFile(blobStream);
    }

    /**
     * 切片
     * @param fileItem 
     * @returns 
     */
    const createChunk = async (fileItem: fileItemType) =>{
      // 切割的份数
      const chunks = Math.ceil( fileItem.totalSize / CHUNK_SIZE );

      const arr = []

      // 调用切割方法并计算MD5
      for (let i = 0; i < chunks; i++) {
        const chunk = await computeMd5(fileItem, i, chunks)
        arr.push(chunk)
      }

      return arr
    }

    /**
     * 在fileList取到当前的数据的索引或数据
     * @param uid 
     * @returns 
     */
    const getFileItem = (uid: string, isUid: boolean = true) => {
      if(isUid){
        return arrList.current.findIndex(item => item.uid === uid) 
      }else{
        return arrList.current.find(item => item.uid === uid)
      }
    }

    // 更新数据
    const updateFileItem = (fileItem: fileItemType, i: number) => {
      if( i >=0 ){
        let arr = [...arrList.current]
        arr.splice(i, 1, fileItem)
        setFileList(arr)
        arrList.current = arr

        return true
      }else{
        return false
      }
    }


    /**
     * 计算md5
     * @param fileItem 文件
     * @param start 开始位置
     * @param chunks 切割总数
     */
    const computeMd5 = async (fileItem: fileItemType, index: number, chunks: number) => {
      return new Promise((resolve, reject) => {

          const { file } = fileItem

          const start = index * CHUNK_SIZE
          const end = start + CHUNK_SIZE >= file.size ? file.size : start + CHUNK_SIZE
           // 创建 SparkMD5 实例，使用 ArrayBuffer 作为输入数据类型
          let spark = new SparkMD5.ArrayBuffer();
          // 读取文件内容
          let fileReader = new FileReader();

          const blob = file.slice(start, end)
          fileReader.readAsArrayBuffer(blob);
         
          fileReader.onload = (e) => {
            spark.append(e.target?.result as ArrayBuffer);

            if( index + 1 < chunks ){
              // console.log(
              //   `第${fileItem.fileName}, ${index}个分片的解析完成, 开始第${
              //     index + 1
              //   }个分片的解析`
              // );

              let percent = Math.floor((index / chunks) * 100);
              fileItem.md5Progress = percent
            }else{
              // console.log(`第${fileItem.fileName}, ${index}个分片的解析完成，完成全部解析`);

              fileItem.md5Progress = 100;
            }


            if(updateFileItem(fileItem, getFileItem(fileItem.uid) as number)){
              resolve({
                fileId: fileItem.uid,
                file: blob,
                fileName: fileItem.fileName,
                filePid: 0,
                fileMd5: spark.end(),
                chunkIndex: index,
                chunks: chunks
              });
            }
          }

      })
    }

    /**
     * 上传
     */
    const uploadFile = async (blobStream: any) =>{
      // 拿着这个item的id
      const fileId = blobStream[0].fileId
      const item = getFileItem(fileId, false) as fileItemType
      
      for (let i = 0; i < blobStream.length; i++) {

        // 对于i为0的时候，他的fileId是可以随机的，但是服务器有一个长度的判断，这里我们就截取一下
        if(i === 0) blobStream[i].fileId = blobStream[i].fileId.slice(0, 10)

        try {
          const { data } = await uploadChunkFile(blobStream[i])

          // 后端拼接所用，后一个的fileid对于前一个返回值的fileid
          if(i < blobStream.length - 1 && data){
            blobStream[i+1].fileId = data.data.fileId
          }

          let percent = Math.floor((i + 1 ) / blobStream.length * 100)
          item.uploadProgress = percent
          

          if( data.status === 'error' ){
            dispatch(changeMessageApi({ type:'error', info:'上传失败' }))
          }

          if( data.data.status === 'upload_finish'){
            dispatch(changeMessageApi({ type:'success', info:'上传成功' }))
            item.uploadProgress = 100

            // 获取表格的最新内容
            getDataMethod()
            // 获取空间
            getSpace()
            
          }

          updateFileItem(item, getFileItem(item.uid) as number)

        } catch (error) {
          console.log(error)
        }
      }
    }

      // 上传区域展示
    const showContent = () =>{
      return (
        <UploadShowStyle>
          {
            fileList.map(file => {
              return file.md5Progress !== 100 ? (
                <div className='cutShow' key={file.uid}>
                  <span className='top'>
                    <span>{file.fileName}</span>
                    <span style={{
                      color:'#e6a23c'
                    }}><ClockCircleOutlined /> 解析中...</span>
                  </span>
                  <Progress type="circle" percent={file.md5Progress} status={file.status} size={60}/>
                </div>
              ) : (
                <div className='uploadShow' key={file.uid}>
                  <span className='top'>
                    <span>{file.fileName}</span>
                    <span style={{
                      color: file.uploadProgress === 100 ? '#67c23a' : '#409eff'
                    }}><CloudUploadOutlined /> { file.uploadProgress === 100 ? '上传成功' : '上传中...'  } </span>
                  </span>
                  <div className='bottom'>
                    <div className='progress'>
                      <Progress percent={file.uploadProgress} status={file.status} />
                    </div>
                    <div className='btn'>
                      <PauseCircleTwoTone />
                      <CloseCircleTwoTone />
                    </div>
                  </div>
                </div>
              )
            })
          }
        </UploadShowStyle>
      )
    }

    return (
      <>
        <Popover content={fileList.length ? showContent : '暂无任务'} title="上传任务（仅展示本次上传任务）" trigger="click" overlayInnerStyle={{
            width: '500px',
            marginRight: '10px'
        }} open={isPopoverShow} onOpenChange={()=>{setIsPopoverShow(!isPopoverShow)}}>
            <SwapOutlined className='icon-transfer'/>
        </Popover>
      </>
    )
})

export default index