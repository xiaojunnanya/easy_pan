/*
 * @Author: XJN
 * @Date: 2023-11-16 16:56:04
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-07 09:05:07
 * @FilePath: \easy_pan\src\components\Table\Preview\index.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import { Button, Modal, Spin, Watermark } from 'antd';
import PerPdf from './Handle/PrePdf'
import PerDoc from './Handle/PreDoc'
import { getFileInfo, getImage, getVideo } from '@/service/modules/home';
import type { DataType } from '../type';
import { PreviewStyled } from './style';
import CodeBlock from '@/utils/CodeBlock';
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
    let show = <div>loading...</div>

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
          show = <PerPdf fileId={record.fileId}></PerPdf>
          
          break;
        // doc
        case 5:
          show = <PerDoc fileId={record.fileId}></PerDoc>
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