import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import type { FC } from 'react'
import { CheckSquareTwoTone, CloseSquareTwoTone, DeleteOutlined, DownloadOutlined, FormOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Table, ConfigProvider, Popconfirm, Form, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableStyled } from './style';
import zh_CN from 'antd/es/locale/zh_CN';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';

import { downLoadFile, setSize } from '@/utils'

import type { DataType, propsType } from './type';
import { changeBtnDisabled } from '@/store/modules/home';
import { changeSelectKeys } from '@/store/modules/common';
import { delFileToRecycle, renameApi } from '@/service/modules/home';
import Share from './Handle/Share';
import RenderName from './Handle/RenderName';
import Remove from './Handle/Remove';


export interface ChildShareMethods {
  openModel: (record: DataType) => void;
}

export interface ChildRemoveMethods {
  showModal: () => void;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: DataType;
  index: number;
  children: React.ReactNode;
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
  const [form] = Form.useForm();

  // ----- useState -----
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 获取当前可视区高度
  const [ newHeight, setNewHeight ]  = useState(window.innerHeight - 240 - 32)

  
  // 展示操作部分
  const [ showHandleIndex, setShowHandleIndex ] = useState<number>(-1)

  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: DataType) => record.key === editingKey;

  // ----- stats -----
  const columns: ColumnsType<DataType> = useMemo(()=>{
    return [
      {
        title: '文件名',
        dataIndex: 'name',
        render: (text, record) => {
          return <RenderName record={record} preview></RenderName>
        },
        editable: true,
      },
      {
        dataIndex: 'handle',
        width: 310,
        render:(text, record, index)=>{
          return (
            // record.status === 2 代表转码成功
            showHandleIndex === index &&  record.status === 2 && (
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
                {/* <div className='handle' onClick={(e)=>{handleClick(e, record, 5)}}>
                  <DragOutlined /><span>移动</span>
                </div> */}
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
        edit(record)
        
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

  // 重命名
  const edit = (record: DataType) => {
    const { fileName, folderType } = record

    let name = fileName

    // 文件去后缀名
    if( folderType === 0 ){
      const a = fileName.split('.')
      a.pop()
      name = a.join('.')
    }
    
    form.setFieldsValue({
      name,
      ...record,
    });
    setEditingKey(record.key as string);
  };

  // 取消重命名
  const cancel = () => {
    setEditingKey('');
  };

  // 确定重命名
  const save = async (key: string) => {
    try {
      // 重命名的数据
      const row = await form.validateFields();

      const newData = [...showData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        const { fileName, folderType } = item
        const { name } = row
        let newName = name

        // 文件加入后缀名
        if( folderType === 0 ){
          const a = fileName.split('.')
          const c = a.pop()
          newName = name + '.' + c
        }
        
        const res = await renameApi(item.fileId, name)

        if(res.data.code === 200){
          newData.splice(index, 1, {
            ...item,
            fileName:newName,
          });
          setShowData(newData);
        }else{
          message.error(res.data.message)
        }
        
        setEditingKey('');
      } else {
        newData.push(row);
        setShowData(newData);
        setEditingKey('');
      }
      
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

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


  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
              <Input addonAfter={
                <>
                  <CheckSquareTwoTone onClick={()=>{save(record.key as string)}}/>
                  <CloseSquareTwoTone onClick={cancel}/> 
                </>
              }/>
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  

  const mergedColumns = columns.map((col) => {
    // @ts-ignore
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        // @ts-ignore
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <div style={{display:'none'}}>
        <Share ref={childShareRef}></Share>
        <Remove ref={childRemoveRef}></Remove>
      </div>

      <TableStyled height={newHeight + 57}>
        <ConfigProvider locale={zh_CN}>
          <Form form={form} component={false}>
            {/* @ts-ignore */}
            <Table rowSelection={rowSelection} columns={mergedColumns} dataSource={showData} summary={()=>{
              return (
                  <>
                    <Table.Summary fixed='top'></Table.Summary>
                  </>
              )
            }} sticky={{ offsetHeader: 0 }} scroll={{y: newHeight, x:900}} pagination={{
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
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            >
            </Table>
          </Form>
        </ConfigProvider>
      </TableStyled>
    </>
  )
})

export default index