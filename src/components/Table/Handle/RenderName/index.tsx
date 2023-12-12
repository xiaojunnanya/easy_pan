import React, { FC, memo, useRef } from 'react'
import { DataType } from '../../type'

import folderIcon from '@/assets/images/icon-image/folder.png'

import videoIcon from '@/assets/images/icon-image/video.png'
import musicIcon from '@/assets/images/icon-image/music.png'
import pdfIcon from '@/assets/images/icon-image/pdf.png'
import excelIcon from '@/assets/images/icon-image/excel.png'
import wordIcon from '@/assets/images/icon-image/word.png'
import txtIcon from '@/assets/images/icon-image/txt.png'
import otherIcon from '@/assets/images/icon-image/others.png'
import zipIcon from '@/assets/images/icon-image/zip.png'
import codeIcon from '@/assets/images/icon-image/code.png'
import { getImage } from '@/service/modules/home'
import Preview from '../../Preview'
import { useAppDispatch } from '@/store'
import { changeFileName, changeFilePid } from '@/store/modules/home'
import { RenderNameStyle } from './style'
import { useSearchParams } from 'react-router-dom'

interface IProps {
    record: DataType,
    preview?: boolean
}

export interface ChildPreviewMethods {
  openModel: (record: DataType, img: string) => void;
}

const index: FC<IProps> = memo((props) => {
  const dispatch = useAppDispatch()
  const { record, preview = false } = props
  const childPreviewRef = useRef<ChildPreviewMethods>(null)
  const [ searchParams ] = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())
  const path = query.path || '0'
    
  // 默认是文件夹
  let showImg = folderIcon

  // 0是文件,1是文件夹
  if( record.folderType === 0 ){
    
    switch (record.fileType) {
      case 1:
        showImg = record.fileCover ? getImage(record.fileCover) : videoIcon
        break;

      case 2:showImg = musicIcon
        break;

      case 3:
        showImg = record.fileCover ? getImage(record.fileCover) : folderIcon
        break;

      case 4:showImg = pdfIcon
        break;

      case 5:showImg = wordIcon
        break;

      case 6:showImg = excelIcon
        break;

      case 7:showImg = txtIcon
        break;

      case 8:showImg = codeIcon
        break;

      case 9:showImg = zipIcon
        break;

      case 10:showImg = otherIcon
        break;
    
      default:
        break;
    }
  }


  /**
   * 点击表格一列文字的操作，比如进入下一层文件夹或预览文件
   */
  const folderHandle = (record: DataType, showImg: string) =>{
    // 0 是文件
    if(record.folderType === 0){
      childPreviewRef.current?.openModel(record, showImg)
    }else{
      // 文件夹，获取这个文件夹的数据
      // 修改path路由方式，采用'/'来分割纪录路由而不是直接展示
      // path
      dispatch(changeFilePid(path + '/' + record.fileId))
      // 同时传递文件夹名字，在面包屑的地方使用
      dispatch(changeFileName(record.fileName))
    }  
  }
  
  return (
    <RenderNameStyle preview={String(preview)}>

      <div style={{display:'none'}}>
        <Preview ref={childPreviewRef}></Preview>
      </div>

      <div className='folderType'>
        <div className='showImg'>
          <img src={showImg}/>
        </div>
        <span onClick={()=>{ preview && folderHandle(record, showImg) }}>
          {record.fileName}
        </span>
      </div>
    </RenderNameStyle>
  )
})

export default index