/*
 * @Author: XJN
 * @Date: 2023-12-04 11:26:31
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-04 15:48:57
 * @FilePath: \easy_pan\src\components\Table\Wait\SettingUserTable.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import type { FC } from 'react'
import { DeleteOutlined,  DownloadOutlined } from '@ant-design/icons'
import { Table, ConfigProvider, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { WaitStyled } from './style';
import zh_CN from 'antd/es/locale/zh_CN';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';

import { downLoadFile, setSize } from '@/utils'

import Preview from '../Preview';
import type { DataType, propsType } from '../type';
import { changeBtnDisabled } from '@/store/modules/home';
import { changeSelectKeys } from '@/store/modules/common';
import RenderName from '../Handle/RenderName';
import { adminDelFile } from '@/service/modules/setting';



interface ChildMethods {
  openModel: (record: DataType, img: string) => void;
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
          return <RenderName record={record}  preview></RenderName>
        },
      },
      {
        dataIndex: 'handle',
        width: 170,
        render:(text, record, index)=>{
          return (
            showHandleIndex === index && (
              <div className='allHandle'>
                {/* 文件夹没有下载 */}
                {
                  record.folderType === 0 && (
                    <div className='handle' onClick={(e)=>{handleClick(e, record, 1)}}>
                      <DownloadOutlined /><span>下载</span>
                    </div>
                  )
                }

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
        title: '发布人',
        dataIndex: 'nickName',
        width: 150,
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
    console.log(record.userId);
    
    switch (index) {
      // 下载
      case 1:downLoadFile(record.fileId)
        
        break;
      // 删除
      case 2:
        const res2 = await adminDelFile(record.userId + '_' + record.fileId)
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

  return (
    <>
      <div style={{display:'none'}}>
        <Preview ref={childRef}></Preview>
      </div>

      <WaitStyled height={newHeight + 57}>
        <ConfigProvider locale={zh_CN}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={showData} summary={()=>{
            return (
                <>
                  <Table.Summary fixed='top'></Table.Summary>
                </>
            )
          }} sticky={{ offsetHeader: 0 }} scroll={{y: newHeight, x:900}} pagination={{
            position:['bottomRight'],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (count) => `共 ${count} 条数据`
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
      </WaitStyled>
    </>
  )
})

export default index