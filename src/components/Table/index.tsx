import React, { memo, useEffect, useMemo, useState } from 'react'
import type { FC } from 'react'
import { DeleteOutlined, DownloadOutlined, DragOutlined, FormOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Table, ConfigProvider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableStyled } from './style';
import zh_CN from 'antd/es/locale/zh_CN';
import { useAppSelector } from '@/store';
import MainHeader from '../HeaderBtn';

import setSize from '@/utils/setSize'

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


export interface DataType {
  key: React.Key
  fileCategory:number | null, // 文件类型 1 视频 2 音频 3 图片 4 文档 5 其他
  fileCover: string | null // 文件封面
  fileId: string // 文件ID
  fileName: string // 文件名称
  filePid: string // 父级ID
  fileSize: string | null // 文件大小
  fileType: number | null // 1:视频 2:音频  3:图片 4:pdf 5:doc 6:excel 7:txt 8:code 9:zip 10:其他
  folderType: number // 0:文件 1:目录
  lastUpdateTime: string // 最后更新时间
  recoveryTime: string | null // 回收站时间
  status: number // 0:转码中 1转码失败 2:转码成功
}

// isShowFolder为ture显示文件夹按钮
interface propsType{
    data: any,
    isShowFolder?: boolean,
    totalCount: number
}
// 封装表格
// 行点击、行选中
const index: FC<propsType> = memo((props) => {
  const { data, isShowFolder, totalCount } = props
  const { isLoading } = useAppSelector(state =>{
    return {
      isLoading: state.home.isLoading
    }
  })

  // ----- useState -----
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 获取当前可视区高度
  const [ newHeight, setNewHeight ]  = useState(window.innerHeight - 240)
  // console.log(newHeight);
  
  // 按钮是否允许点击
  const [ buttonDisabled, setButtonDisabled ]  = useState<boolean>(true)
  // 展示操作部分
  const [ showHandleIndex, setShowHandleIndex ] = useState<number>(-1)
  // 用state对当前数据进行一层处理，方便过滤修改
  // const [ propsData, setPropsData ] = useState<DataType[]>(props.data);


  // ----- stats -----
  const columns: ColumnsType<DataType> = useMemo(()=>{
    return [
      {
        title: '文件名',
        dataIndex: 'name',
        render: (text, record) => {
          return renderNameAndImg(record)
        },
      },
      {
        dataIndex: 'handle',
        width: 310,
        render:(text, record, index)=>{
          return (
            showHandleIndex === index && (
              <div className='allHandle'>
                <div className='handle' onClick={(e)=>{handleClick(e, record, 1)}}>
                  <ShareAltOutlined /><span>分享</span>
                </div>
                <div className='handle' onClick={(e)=>{handleClick(e, record, 2)}}>
                  <DownloadOutlined /><span>下载</span>
                </div>
                <div className='handle' onClick={(e)=>{handleClick(e, record, 3)}}>
                  <DeleteOutlined /><span>删除</span>
                </div>
                <div className='handle' onClick={(e)=>{handleClick(e, record, 4)}}>
                  <FormOutlined /><span>重命名</span>
                </div>
                <div className='handle' onClick={(e)=>{handleClick(e, record, 5)}}>
                  <DragOutlined /><span>移动</span>
                </div>
              </div>
            )
          )
        }
      },
      {
        title: '修改时间',
        dataIndex: 'lastUpdateTime',
        width: 170,
      },
      {
        title: '大小',
        dataIndex: 'fileSize',
        width: 110,
        render:(text, record)=>{
          return record.fileSize && setSize(Number(record.fileSize))
        }
      }
    ];
  }, [data, showHandleIndex])

  
  // ----- useEffect -----

  useEffect(()=>{
    window.addEventListener('resize', handleResize)

    return () =>{
      return window.removeEventListener('resize', handleResize)
    }
  })


  // ----- function -----

  /**
   * 监听屏幕大小变化（添加防抖会看到滚动条）
   */
  const handleResize = () =>{
    setNewHeight(window.innerHeight - 240)
  }

  /**
   * 点击多选框的时候触发
   * @param newSelectedRowKeys 
   */
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    newSelectedRowKeys.length ? setButtonDisabled(false) : setButtonDisabled(true)
    setSelectedRowKeys(newSelectedRowKeys);
  };

  /**
   * 获取分页值与数
   * @param page 当前页
   * @param pageSize 页数
   */
  const pagiChange = (page: any, pageSize: any) =>{
    console.log(page, pageSize);
  }

  /**
   * 表格中的五个操作
   * @param e 
   * @param record 
   * @param index 
   */
  const handleClick = (e: any, record: DataType, index: number) =>{
    e.stopPropagation()
    console.log(record);
  }

  /**
   * 点击表格一列文字的操作，比如进入下一层文件夹或预览文件
   */
  const folderHandle = () =>{
    console.log('1');
    
  }

  // ----- view -----

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 文字图标渲染
  const renderNameAndImg = (record: DataType) =>{
    // 默认是文件夹
    let showImg = folderIcon

    // 是文件
    if( record.folderType === 0 ){

      switch (record.fileType) {
        case 1:showImg = videoIcon
          break;

        case 2:showImg = musicIcon
          break;

        case 3:showImg = record.fileCover ? record.fileCover : folderIcon
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
        <img src={showImg} onClick={folderHandle}/>
        <span onClick={folderHandle}>{record.fileName}</span>
      </div>
    )
  }

  return (
    <>
      <MainHeader isShowFolder={isShowFolder} btnDisabled={buttonDisabled}></MainHeader>

      {/* <Breadcrumb separator=">" style={{marginBottom:'15px'}} items={[
          {
            title: '全部文件',
          },
          // {
          //   title: 'Application Center',
          //   href: '',
          // }
        ]}
      ></Breadcrumb> */}

      <TableStyled height={newHeight + 57}>
        <ConfigProvider locale={zh_CN}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} summary={()=>{
            return (
                <>
                  <Table.Summary fixed='top'></Table.Summary>
                </>
            )
          }} sticky={{ offsetHeader: 0 }} scroll={{y: newHeight, x:1000}} pagination={{
            position:['bottomRight'],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共 ${totalCount} 条数据`,
            onChange:pagiChange
          }} onRow={(record, index)=>{
            return {
              onMouseEnter: () => {
                index !== void 0 && setShowHandleIndex(index)
              },
              onMouseLeave: () => setShowHandleIndex(-1)
            }
          }} loading = { isLoading }
          >
          </Table>
        </ConfigProvider>
      </TableStyled>
    </>
  )
})

export default index