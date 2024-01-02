/*
 * @Author: XJN
 * @Date: 2023-11-27 10:18:39
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2024-01-02 15:19:09
 * @FilePath: \easy_pan\src\views\Home\UploadShow\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import { useAppDispatch, useAppSelector } from '@/store';
import { SwapOutlined } from '@ant-design/icons'
import { Popover, Progress } from 'antd'
import React, { memo, useEffect, useId, useRef, useState } from 'react'
import SparkMD5 from "spark-md5";
import {nanoid} from 'nanoid'
import { UploadShowStyle } from './style';
import { uploadChunkFile } from '@/service/modules/upload';
import { changeMessageApi } from '@/store/modules/common';

enum STATUS{
  success = 'success',
  exception = 'exception', // 错误
  normal = 'normal'
}

// const STATUS = {
//   emptyfile: {
//       value: "emptyfile",
//       desc: "文件为空",
//       color: "#F75000",
//       icon: "close",
//   },
//   fail: {
//       value: "fail",
//       desc: "上传失败",
//       color: "#F75000",
//       icon: "close",
//   },
//   init: {
//       value: "init",
//       desc: "解析中",
//       color: "#e6a23c",
//       icon: "clock"
//   },
//   uploading: {
//       value: "uploading",
//       desc: "上传中",
//       color: "#409eff",
//       icon: "upload",
//   },
//   upload_finish: {
//       value: "upload_finish",
//       desc: "上传完成",
//       color: "#67c23a",
//       icon: "ok",
//   },
//   upload_seconds: {
//       value: "upload_seconds",
//       desc: "秒传",
//       color: "#67c23a",
//       icon: "ok",
//   },
// };

interface fileItemType{
  // 文件, 文件大小, 文件流, 文件名...
  file: string
  // 文件UID
  uid: string
  // md5进度
  md5Progress: number
  // md5值
  md5: null | string
  // 文件名
  fileName: string
  // 上传状态
  status: STATUS
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
  errorMsg: null | string,
  // 上传描述信息
  desc: {
    desc: string
    color?: string
  },
  fileId: string
}

const chunkSize = 1024 * 1024 * 5;

const index = memo(() => {
  const dispatch = useAppDispatch()
  
  const { popoverShow, file }  = useAppSelector((state)=>{
    return {
      popoverShow: state.upload.isPopoverShow,
      file: state.upload.file,
    }
  })

  // Popover 是否展示
  const [ isPopoverShow, setIsPopoverShow ] = useState<boolean>(popoverShow)
  // 视图列表的展示
  const fileList = useRef<fileItemType[]>([])
  // const [ fileList, setFileList ] = useState<fileItemType[]>([]);
    
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
        const fileItem: fileItemType = {
            // 文件, 文件大小, 文件流, 文件名...
            file: file,
            // 文件UID
            uid: nanoid(),
            // md5进度:他这边做的这个进度在旁边会有一个解析的圆心的那种图，这边我暂时先不做
            md5Progress: 0,
            // md5值
            md5: null,
            // 文件名
            fileName: file.name,
            // 上传状态
            status: STATUS.normal,
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
            errorMsg: null,
            desc:{
              desc:'解析中...',
              color:'#e6a23c'
            },
            fileId: ''
        };
        // 添加文件
        const a = [...fileList.current]
        a.unshift(fileItem)
        fileList.current = a
        // setFileList(a)

        if(fileItem.totalSize === 0){
          fileItem.status = STATUS.exception
          fileItem.desc = {
            desc:'文件为空',
            color:"#F75000"
          }
          return
        }

        // 设置文件md5
        let md5FileUid = await computeMd5(fileItem)
        if (!md5FileUid) return
        uploadFile(md5FileUid as string);

    }

    /**
     * 计算md5
     * @param fileItem 
     */
    const computeMd5 = (fileItem: fileItemType) => {
      // let file = fileItem.file;
      // 这个代码本来是为了兼容的，但是我这里会报错
      // let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
      let blobSlice = File.prototype.slice
      // 切割份数
      let chunks = Math.ceil(fileItem.totalSize / chunkSize);
      let currentChunk = 0;
      // 创建 SparkMD5 实例，使用 ArrayBuffer 作为输入数据类型
      let spark = new SparkMD5.ArrayBuffer();
      // 读取文件内容
      let fileReader = new FileReader();
      let time = new Date().getTime();

      let loadNext = () => {
          let start = currentChunk * chunkSize;
          let isEnd = start + chunkSize
          let end = isEnd >= fileItem.totalSize ? fileItem.totalSize : isEnd;
          // 以 ArrayBuffer 的形式读取文件。参数是一个表示文件的二进制数据块（Blob）。
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      };
      loadNext();
      
      return new Promise((resolve, reject) => {
          let resultFile = getFileByUid(fileItem.uid);
          fileReader.onload = (e) => {
              spark.append(e.target!.result as ArrayBuffer);
              currentChunk++;
              if (currentChunk < chunks) {
                  console.log(
                      `第${file.name}, ${currentChunk}个分片的解析完成, 开始第${
                          currentChunk + 1
                      }个分片的解析`
                  );
                  let percent = Math.floor((currentChunk / chunks) * 100);
                  resultFile.md5Progress = percent;
                  loadNext();
              } else {
                console.log(`第${file.name}, ${currentChunk}个分片的解析完成，完成全部解析`);
                  let md5 = spark.end();
                  spark.destroy();
                  resultFile.md5Progress = 100;
                  resultFile.status = STATUS.normal;
                  resultFile.desc = {
                    desc:'开始上传...',
                    color:"#409eff"
                  }
                  resultFile.md5 = md5;
                  resolve(fileItem.uid);
              }
          };
          fileReader.onerror = () => {
              resultFile.md5Progress = -1;
              resultFile.status = STATUS.exception;
              resultFile.desc = {
                desc:'文件读取出错',
                color:'#F75000'
              };
              resolve(fileItem.uid);
          };
      }).catch(error => { return null });
      
    }

    /**
     * 获取到进入条中的文件，为了方便对其进行操作
     * @param uid 
     * @returns 
     */
    const getFileByUid = (uid: string) => {
      return fileList.current.filter(item =>{
        return item.uid === uid;
      })[0]
    };


    /**
     * 上传
     * @param uid 
     * @param chunkIndex 
     */
    const uploadFile = async (uid: string, chunkIndex?: number) => {
        chunkIndex = chunkIndex ? chunkIndex : 0;
        // 分片上传
        let currentFile = getFileByUid(uid);
        const file = currentFile.file;
        const fileSize = currentFile.totalSize;
        const chunks = Math.ceil(fileSize / chunkSize);
        for (let i = chunkIndex; i < chunks; i++) {
          
            let start = i * chunkSize;
            let isEnd = start + chunkSize
            let end = isEnd >= fileSize ? fileSize : isEnd;
            let chunkFile = file.slice(start, end);

            try {
              // 对每一个分片进行上传
              let res = await uploadChunkFile({
                file: chunkFile,
                // @ts-ignore
                fileName: file.name,
                fileMd5: currentFile.md5 || '',
                chunkIndex: String(i),
                chunks: String(chunks),
                fileId: currentFile.fileId,
                filePid: currentFile.filePid,
              })
              
              if(res.data.data){
                currentFile.fileId = res.data.data.fileId
                // 中断做的事
                currentFile.chunkIndex = i
              }
            } catch (error) {
              dispatch(changeMessageApi({
                  type: 'error',
                  info: '上传失败，请稍后重试'
              }))
              break
            }
        }
    };

      // 上传区域展示
    const showContent = () =>{
      const files: fileItemType[] = fileList.current;
      return (
        <UploadShowStyle>
          {
            files.map(file => {
              return (
                <div className='fileshow' key={file.uid}>
                  <span>{file.fileName}</span>
                  <div>
                    <Progress percent={file.uploadProgress} status={file.status} />
                    <span className='desc' style={{ color: file.desc.color }}>{ file.desc.desc }</span>
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
          <Popover content={showContent} title="上传任务（仅展示本次上传任务）" trigger="click" overlayInnerStyle={{
              width: '500px',
              marginRight: '10px'
          }} open={isPopoverShow} onOpenChange={()=>{setIsPopoverShow(!isPopoverShow)}}>
              <SwapOutlined className='icon-transfer'/>
          </Popover>
      </>
    )
})

export default index