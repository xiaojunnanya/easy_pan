import React, { FC, memo } from 'react'
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

interface IProps {
    record: DataType,
    folderHandle?: (record: DataType, showImg: string) => void
}

const index: FC<IProps> = memo((props) => {

    const { record, folderHandle } = props

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
  return (
    <div className='folderType'>
      <div className='showImg'>
        <img src={showImg}/>
      </div>
      <span onClick={()=>{ folderHandle && folderHandle(record, showImg) }}>
        {record.fileName}
      </span>
    </div>
  )
})

export default index