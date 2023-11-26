import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import type { FC } from 'react'
import { LinkOutlined,  StopOutlined } from '@ant-design/icons'
import { Table, ConfigProvider, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RecyclePreStyled } from './style';
import zh_CN from 'antd/es/locale/zh_CN';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';

import Preview from '../Preview';
import type { DataType, propsType } from '../type';
import { changeBtnDisabled } from '@/store/modules/home';
import { deleteFile, restore } from '@/service/modules/recycle';
import { changeSelectKeys } from '@/store/modules/recycle';
import RenderName from '../Handle/RenderName';
import { cancelShare } from '@/service/modules/share';



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
          return <RenderName record={record}></RenderName>
        },
      },
      {
        dataIndex: 'handle',
        width: 200,
        render:(text, record, index)=>{
          return (
            showHandleIndex === index && (
              <div className='allHandle'>
                <div className='handle'>
                  <Popconfirm title="提示" description={`你确定要取消分享【${record.fileName}】吗`}
                    onConfirm={(e)=>{handleClick(e, record, 1)}}
                    okText="确定" cancelText="取消">
                    <LinkOutlined /><span>取消分享</span>
                  </Popconfirm>
                </div>

                <div className='handle'>
                  <Popconfirm title="提示" description={`你确定要删除【${record.fileName}】吗`}
                    onConfirm={(e)=>{handleClick(e, record, 2)}}
                    okText="确定" cancelText="取消">
                    <StopOutlined /><span>复制链接</span>
                  </Popconfirm>
                </div>
              </div>
            )
          )
        }
      },
      {
        title: '分享时间',
        dataIndex: 'shareTime',
        width: 170,
      },
      {
        title: '失效时间',
        dataIndex: 'expireTime',
        width: 170,
      },
      {
        title: '浏览次数',
        dataIndex: 'showCount',
        width: 110
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
      // 取消分享
      case 1:
        const res1 = await cancelShare(record.shareId)
        if(res1.data.status === 'success'){
          // 不走接口，删除这一行
          handleDelete(record.key)
        }
        
        break;
      // 复制链接
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
      </RecyclePreStyled>
    </>
  )
})

export default index