/*
 * @Author: XJN
 * @Date: 2023-11-27 10:18:39
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-18 17:34:04
 * @FilePath: \easy_pan\src\views\Home\UploadShow\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import { useAppSelector } from '@/store';
import { SwapOutlined } from '@ant-design/icons'
import { Popover, Progress } from 'antd'
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'

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
  status: string
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
}

const chunkSize = 1024 * 1024 * 5;

const index = memo(() => {
  const { popoverShow, file }  = useAppSelector((state)=>{
    return {
      popoverShow: state.upload.isPopoverShow,
      file: state.upload.file,
    }
  })

  // Popover 是否展示
  const [ isPopoverShow, setIsPopoverShow ] = useState<boolean>(popoverShow)
  // 视图列表的展示
  const [ fileList, setFileList ] = useState<fileItemType[]>([]);
    
    useEffect(()=>{
      setIsPopoverShow(popoverShow)
    }, [popoverShow])

    useEffect(()=>{
      if(file.name) addFile(file, new Date().getTime().toString())
    }, [file])

    // ---- method -----

    /**
     * 添加文件
     * @param file 文件：包含文件大小、文件名、文件流.... 
     * @param filePid 文件ID
     */
    const addFile = async (file: any, filePid: string) => {
        console.log(file, filePid);
      
        const fileItem: fileItemType = {
            // 文件, 文件大小, 文件流, 文件名...
            file: file,
            // 文件UID
            uid: file.uid,
            // md5进度
            md5Progress: 0,
            // md5值
            md5: null,
            // 文件名
            fileName: file.name,
            // 上传状态
            status: STATUS.init.value,
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
        };
        // 添加文件
        const a = [...fileList]
        a.unshift(fileItem)
        setFileList(a)

        if(fileItem.totalSize === 0){
          fileItem.status = STATUS.emptyfile.value
          return
        }

        // 设置文件md5
        // let md5FileUid = await computeMd5(fileItem)
        // if (!md5FileUid) return
        // uploadFile(md5FileUid);

    }

    /**
     * 计算md5
     * @param fileItem 
     */
    const computeMd5 = (fileItem: fileItemType) => {}


      // 上传区域展示
    const showContent = () =>{
      return (
        <div className="content">
          {
            fileList.map(file => {
              return (
                <div>
                  <span>{file.fileName}</span>
                  <Progress percent={30} status="active" />
                </div>
              )
            })
          }
        </div>
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