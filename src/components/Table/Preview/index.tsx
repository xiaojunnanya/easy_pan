import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import { Button, Modal, Spin, Watermark } from 'antd';

import { getFileInfo, getImage, getVideo } from '@/service/modules/home';
import type { DataType } from '../type';
import { PreviewStyled } from './style';
import CodeBlock from '@/utils/CodeBlock';
import DocViewer, { PDFRenderer } from "@cyntler/react-doc-viewer";
import { ChildPreviewMethods } from '../Handle/RenderName';
import DPlayer from 'dplayer';
import Hls from 'hls.js';
import { downLoadFile, setSize } from '@/utils';


const Preview = memo(forwardRef<ChildPreviewMethods>((props, ref) => {

  // 暴露句柄
  useImperativeHandle(ref, () => ({
    openModel,
  }), []);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
  const videoRef = useRef(null)

  const [open, setOpen] = useState(false);
  const [ recordData, setRecordData ] = useState<DataType>()
  const [ showView, setShowView] = useState<any>()

  const openModel = async (record: DataType, img: string) => {
    setOpen(true);
    setRecordData(record)
    setShowView(await previewShow(record, img))
  }

  const download = async (fileId: string) =>{
    downLoadFile(fileId)
  }


  // 文件夹的时候为null
  const previewShow = async (record: DataType, showImg: string) =>{
    let show = <div></div>

    if(record.fileType){
      switch (record.fileType) {
        // 视频
        case 1:
          show = <div ref={videoRef} className='video'></div>
          setTimeout(()=>{
            new DPlayer({
                container: videoRef.current,
                autoplay: true,
                video: {
                    url: getVideo(record.fileId),
                    type:'customHls',
                    customType:{
                        customHls: function(video: any) {
                            const hls = new Hls();
                            hls.loadSource(video.src);
                            hls.attachMedia(video);
                        },
                    }
                },
            });
          },100)
          break;
        // 图片
        case 3:
          const a = record.fileCover!.split('_')
          const b = a.pop()
          const c = a.join('_')+b
          show = (
            <div className='img'>
              <img src={getImage(c)} alt={record.fileName} />
            </div>
          )
        
          break;
        // pdf
        case 4:
          const aa = 'http://netdisk.kbws.xyz/api/file/getFile/' + record.fileId
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
        // 没有break执行下一个
        // txt
        case 7:
        // code
        case 8:
          const res = await getFileInfo(record.fileId)
          const language = record.fileName.split('.').pop()
          show = (
            <CodeBlock code={res.data} language={language}></CodeBlock>
          )
          break;
        // 音频
        case 2:
        // zip
        case 9:
        // 其他
        case 10:
          show = (
            <div className='other'>
              <div>
                <img src={showImg} alt="" />
                <div className='name'>{ record.fileName }</div>
                <div className='info'>该类型的文件暂不支持预览，请下载后查看</div>
                <Button onClick={()=>{download(record.fileId)}}>点击下载 { record.fileSize && setSize(Number(record.fileSize)) }</Button>
              </div>
            </div>
          )
          break;
      
        default:
          break;
      }
    }

    return show
  }

  return (
    <>
      <Modal title={recordData?.fileName} centered open={open} width={900} footer = {null}
        onCancel={() => setOpen(false)}
        bodyStyle={{
          height: '80vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          textAlign:'left'
        }}
        style={{textAlign:'center'}}
        destroyOnClose
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