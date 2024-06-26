/*
 * @Author: XJN
 * @Date: 2024-01-02 15:32:25
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2024-01-02 16:01:09
 * @FilePath: \easy_pan\src\components\Table\Wait\WSharedTable.tsx
 * @Description: 外部分享模块表格展示
 * @前端实习生: 鲸落
 */

import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import type { FC } from 'react'
import { DeliveredProcedureOutlined,  DownloadOutlined } from '@ant-design/icons'
import { Table, ConfigProvider, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { WaitStyled } from './style';
import zh_CN from 'antd/es/locale/zh_CN';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';

import { downLoadFile, setSize } from '@/utils'

import Preview from '../Preview';
import type { DataType, propsType } from '../type';
import { changeBtnDisabled } from '@/store/modules/home';
import { changeMessageApi, changeSelectKeys } from '@/store/modules/common';
import RenderName from '../Handle/RenderName';
import { useNavigate, useParams } from 'react-router-dom';
import { saveToMyDisk } from '@/service/modules/share';



interface ChildMethods {
  openModel: (record: DataType, img: string) => void;
}

// 封装表格
// 行点击、行选中
const index: FC<propsType> = memo((props) => {
  const { data, currentUser = true } = props
  const { id } = useParams()
  const navigate = useNavigate()
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
  const [ newHeight, setNewHeight ]  = useState(window.innerHeight - 210)

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
          return <RenderName record={record}></RenderName>
        },
      },
      {
        dataIndex: 'handle',
        width: 230,
        render:(text, record, index)=>{
          return (
            showHandleIndex === index && (
              <div className='allHandle'>
                {/* 文件夹没有下载 */}
                {
                  record.folderType === 0 && (
                    <div className='handle' onClick={(e)=>{handleClick(e, record, 1)}} style={ { display: currentUser ? 'block' : 'none' } }>
                      <DownloadOutlined /><span>下载</span>
                    </div>
                  )
                }

                <div className='handle' onClick={(e)=>{handleClick(e, record, 2)}} style={ { display: currentUser ? 'none' : 'block' } }>
                    <DeliveredProcedureOutlined /> <span>保存到我的网盘</span>
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
    
    switch (index) {
      // 下载
      case 1:
        downLoadFile(record.fileId)
        
        break;
      // 保存到我的网盘
      case 2:
        saveStorage(record.fileId)
        break;
    
      default:
        break;
    }
  }

  const saveStorage = async (fileId: string) =>{
    // 保存到我的网盘
    // 先检查是否登录
    if(!sessionStorage.getItem('userInfo')){
      navigate('/login?redirectUrl=' + id)
      return
    }

    // 登录了，保存到网盘中，这里我们默认保存到我的网盘根目录
    const res = await saveToMyDisk(id || '', fileId)
    if( res.data.code === 200){
      dispatch(changeMessageApi({
        type: 'success',
        info: '保存成功'
      }))
      changeSelectKeys([])
      changeBtnDisabled(false)
    }else{
      dispatch(changeMessageApi({
        type: 'error',
        info: res?.data.info || '服务器异常，请稍后重试'
      }))
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

      <WaitStyled height={newHeight}>
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