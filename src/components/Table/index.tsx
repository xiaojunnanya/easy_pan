import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import type { FC } from 'react'
import { DeleteOutlined, DownloadOutlined, DragOutlined, FormOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Table, ConfigProvider, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableStyled } from './style';
import zh_CN from 'antd/es/locale/zh_CN';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';

import { downLoadFile, setSize } from '@/utils'

import type { DataType, propsType } from './type';
import { changeBtnDisabled } from '@/store/modules/home';
import { changeSelectKeys } from '@/store/modules/common';
import { delFileToRecycle } from '@/service/modules/home';
import Share from './Handle/Share';
import RenderName from './Handle/RenderName';
import Remove from './Handle/Remove';


export interface ChildShareMethods {
  openModel: (record: DataType) => void;
}

export interface ChildRemoveMethods {
  showModal: () => void;
}


// 封装表格
// 行点击、行选中
const index: FC<propsType> = memo((props) => {
  const { data } = props
  const { isLoading } = useAppSelector(state =>{
    return {
      isLoading: state.common.isLoading
    }
  },useAppShallowEqual)
  const childShareRef = useRef<ChildShareMethods>(null)
  const childRemoveRef = useRef<ChildRemoveMethods>(null)
  const dispatch = useAppDispatch()
  // props data
  const [ showData, setShowData ] = useState<DataType[]>(data)

  // ----- useState -----
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 获取当前可视区高度
  const [ newHeight, setNewHeight ]  = useState(window.innerHeight - 240)
  
  // 展示操作部分
  const [ showHandleIndex, setShowHandleIndex ] = useState<number>(-1)

  // ----- stats -----
  const columns: ColumnsType<DataType> = useMemo(()=>{
    return [
      {
        title: '文件名',
        dataIndex: 'name',
        render: (text, record) => {
          return <RenderName record={record} preview></RenderName>
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
                {/* 文件夹没有下载 */}
                {
                  record.folderType === 0 && (
                    <div className='handle' onClick={(e)=>{handleClick(e, record, 2)}}>
                      <DownloadOutlined /><span>下载</span>
                    </div>
                  )
                }
                <div className='handle'>
                  <Popconfirm title="提示" description={`你确定要删除【${record.fileName}】吗`}
                    onConfirm={(e)=>{handleClick(e, record, 3)}}
                    okText="确定" cancelText="取消">
                    <DeleteOutlined /><span>删除</span>
                  </Popconfirm>
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
    newSelectedRowKeys.length ? dispatch(changeBtnDisabled(false)) : dispatch(changeBtnDisabled(true))
    setSelectedRowKeys(newSelectedRowKeys);
    dispatch(changeSelectKeys(newSelectedRowKeys))
  };

  /**
   * 获取分页值与数
   * @param page 当前页
   * @param pageSize 页数
   */
  const pagiChange = (page: any, pageSize: any) =>{}


  /**
   * 表格中的五个操作
   * @param e 
   * @param record 
   * @param index 
   */
  const handleClick = async (e: any, record: DataType, index: number) =>{
    e.stopPropagation()
    switch (index) {
      // 分享
      case 1:
        childShareRef.current?.openModel(record)
        
        break;
      // 下载
      case 2:downLoadFile(record.fileId)
        
        break;
      // 删除
      case 3:
        const res2 = await delFileToRecycle(record.fileId)
        if(res2.data.status === 'success'){
          // 不走接口，删除这一行
          handleDelete(record.key)
        }
        
        break;
      // 重命名
      case 4:
      
        
        break;
      // 移动
      case 5:
        // 移动文件这部分接口有点问题，先暂时停止
        // childRemoveRef.current?.showModal()
        break;
    
      default:
        break;
    }
  }

  /**
   * 删除操作
   * @param key 
   */
  const handleDelete = (key: React.Key) => {
    const newData = showData.filter((item: any) => item.key !== key);
    setShowData(newData);
  };

  // ----- view -----

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <div style={{display:'none'}}>
        <Share ref={childShareRef}></Share>
        <Remove ref={childRemoveRef}></Remove>
      </div>

      <TableStyled height={newHeight + 57}>
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
            showTotal: (count) => `共 ${count} 条数据`,
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