import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { Modal, Spin, Watermark } from 'antd';

import { getFileInfo } from '@/service/modules/home';
import type { DataType } from '../type';
import { IMGPREVIEW_URL } from '@/service/config';
import { PreviewStyled } from './style';
import CodeBlock from '@/utils/CodeBlock';
import DocViewer, { PDFRenderer } from "@cyntler/react-doc-viewer";
// import { Document, Page } from 'react-pdf';


const Preview = memo(forwardRef((props, ref) => {

  // 暴露句柄
  useImperativeHandle(ref, () => ({
    openModel,
  }));
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "{}");

  const [open, setOpen] = useState(false);
  const [ recordData, setRecordData ] = useState<DataType>()
  const [ showView, setShowView] = useState<any>()

  const openModel = async (record: DataType) => {
    setOpen(true);
    setRecordData(record)
    setShowView('')
    setShowView(await previewShow(record))
  }

  // 文件夹的时候为null
  const previewShow = async (record: DataType) =>{

    let show = <div></div>
    const res = await getFileInfo(record.fileId)

    if(record.fileType){
      switch (record.fileType) {
        // 视频
        case 1:
          break;

        case 2:
          break;
        // 图片
        case 3:
          let a = record.fileCover ? IMGPREVIEW_URL + record.fileCover.split('_').join('') : ''
          show = (
            <div className='img'>
              <img src={a} alt="" />
            </div>
          )
        
          break;
        // pdf
        case 4:
          const aa = 'http://netdisk.kbws.xyz/api/file/getFile/' + record.fileId
          // console.log(aa);
          const docs = [
            { uri: 'https://minio.aimed.cn/xs-szhpt/base/2023-03-23/2014版NOF防治骨质疏松症临床指南解读.90f94a1bbe.pdf' },
            { uri: '/file/getFile/4iWy5DyBPm' },
            // { uri: 'http://netdisk.kbws.xyz/api/file/getFile/4iWy5DyBPm' },
          ];
          // HEAD请求跨域   记得设置请求失败处理方式
          show = (
            <DocViewer documents={docs} pluginRenderers={[PDFRenderer]} prefetchMethod="GET"/>
          )
          
          break;
        // doc
        case 5:
          break;
        // excel
        case 6:
          break;
        // txt:没有break执行下一个
        case 7:
        // code
        case 8:
          const language = record.fileName.split('.').pop()
          show = (
            <CodeBlock code={res.data} language={language}></CodeBlock>
          )
          break;
        // zip
        case 9:
          break;
        // 其他
        case 10:
          break;
      
        default:
          break;
      }
    }

    return show
  }

  return (
    <>
      <Modal title={recordData?.fileName} centered open={open} width={900} footer = {[]}
        onCancel={() => setOpen(false)}
        bodyStyle={{
          height: '80vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          textAlign:'left'
        }}
        style={{textAlign:'center'}}
      >
        {
          showView ? (
            <PreviewStyled>
              <Watermark content={[userInfo.nickName, 'Easy云盘']} style={{height:'100%'}}>
                {
                  showView
                }
              </Watermark>
            </PreviewStyled>
          ) : (
            <div className="example" style={{textAlign:'center',marginTop:'100px'}}>
              <Spin />
            </div>
          )
        }
      </Modal>
    </>
  );
}))

export default Preview;