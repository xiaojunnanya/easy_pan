import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import type { FC } from 'react'
import { DeleteOutlined,  UndoOutlined } from '@ant-design/icons'
import { Table, ConfigProvider, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RecyclePreStyled } from './style';
import zh_CN from 'antd/es/locale/zh_CN';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';

import { setSize } from '@/utils'


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
import Preview from '../Preview';
import type { DataType, propsType } from '../type';
import { changeBtnDisabled } from '@/store/modules/home';
import { getImage } from '@/service/modules/home';
import { deleteFile, restore } from '@/service/modules/recycle';
import { changeSelectKeys } from '@/store/modules/recycle';



interface ChildMethods {
  openModel: (record: DataType, img: string) => void;
}

// 封装表格
// 行点击、行选中
const index: FC<propsType> = memo((props) => {
  const { data, totalCount } = props
  const { isLoading } = useAppSelector(state =>{
    return {
      isLoading: state.home.isLoading
    }
  },useAppShallowEqual)
  const childRef = useRef<ChildMethods>(null)
  const dispatch = useAppDispatch()

  // ----- useState -----
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 获取当前可视区高度
  const [ newHeight, setNewHeight ]  = useState(window.innerHeight - 240)

  // props data
  const [ showData, setShowData ] = useState<DataType[]>(data)
  
  // 展示操作部分
  const [ showHandleIndex, setShowHandleIndex ] = useState<number>(-1)


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
        width: 170,
        render:(text, record, index)=>{
          return (
            showHandleIndex === index && (
              <div className='allHandle'>
                <div className='handle'>
                  <Popconfirm title="提示" description={`你确定要还原【${record.fileName}】吗`}
                    onConfirm={(e)=>{handleClick(e, record, 1)}}
                    okText="确定" cancelText="取消">
                    <UndoOutlined /><span>还原</span>
                  </Popconfirm>
                </div>

                <div className='handle'>
                  <Popconfirm title="提示" description={`你确定要删除【${record.fileName}】吗`}
                    onConfirm={(e)=>{handleClick(e, record, 2)}}
                    okText="确定" cancelText="取消">
                    <DeleteOutlined /><span>删除</span>
                  </Popconfirm>
                </div>
              </div>
            )
          )
        }
      },
      {
        title: '删除时间',
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
  }, [showData, showHandleIndex])


  
  
  // ----- useEffect -----

  useEffect(()=>{
    window.addEventListener('resize', handleResize)

    return () =>{
      return window.removeEventListener('resize', handleResize)
    }
  }, [window.innerHeight])

  useEffect(()=>{
    setShowData(data)
  },[data])


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
    console.log(newSelectedRowKeys);
    
    newSelectedRowKeys.length ? dispatch(changeBtnDisabled(false)) : dispatch(changeBtnDisabled(true))
    setSelectedRowKeys(newSelectedRowKeys);
    dispatch(changeSelectKeys(newSelectedRowKeys))
  };


  const handleDelete = (key: React.Key) => {
    const newData = showData.filter((item: any) => item.key !== key);
    setShowData(newData);
  };

  /**
   * 表格中的2个操作
   * @param e 
   * @param record 
   * @param index 
   */
  const handleClick = async (e: any, record: DataType, index: number) =>{
    e.stopPropagation()
    console.log(record);
    
    switch (index) {
      // 还原
      case 1:
        const res1 = await restore(record.fileId)
        if(res1.data.status === 'success'){
          // 不走接口，删除这一行
          handleDelete(record.key)
        }
        
        break;
      // 删除
      case 2:
        const res2 = await deleteFile(record.fileId)
        if(res2.data.status === 'success'){
          // 不走接口，删除这一行
          handleDelete(record.key)
        }
        break;
    
      default:
        break;
    }
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

    // 是文件,1是文件夹
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
        <span>
          {record.fileName}
        </span>
      </div>
    )
  }

  return (
    <>
      <div style={{display:'none'}}>
        <Preview ref={childRef}></Preview>
      </div>

      <RecyclePreStyled height={newHeight + 57}>
        <ConfigProvider locale={zh_CN}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={showData} summary={()=>{
            return (
                <>
                  <Table.Summary fixed='top'></Table.Summary>
                </>
            )
          }} sticky={{ offsetHeader: 0 }} scroll={{y: newHeight, x:1000}} pagination={{
            position:['bottomRight'],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共 ${totalCount} 条数据`
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
      </RecyclePreStyled>
    </>
  )
})

export default index