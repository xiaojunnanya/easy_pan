import { getHeaderImg } from '@/service/modules/home'
import { getUserList, updateUserStatus, setAdmin, cancelAdmin, distributeSpace } from '@/service/modules/setting'
import { setSize } from '@/utils'
import { Button, ConfigProvider, Form, Input, Modal, Select, Space, Table } from 'antd'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { SetSpaceStyle, UserListStyle } from './style'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { changeLoading, changeMessageApi } from '@/store/modules/common'
import zh_CN from 'antd/es/locale/zh_CN'

const index = memo(() => {
  const [ isSpaceModalOpen, setIsPwdModalOpen ] = useState(false)
  const [ userItem, setUserItem ] = useState({
    nickName:"",
    userId:""
  })
  const [form] = Form.useForm()
  const { isLoading } = useAppSelector((state)=>{
    return {
      isLoading: state.common.isLoading
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()

  const columns: any = useMemo(()=>{
    return [
      {
        title: '头像',
        dataIndex: 'userId',
        render:(userId: string)=>{
          const img = getHeaderImg(userId)
          return <img src={img} width='40px' style={{borderRadius:"50%"}}/>
        },
        width: 70,
      },
      {
        title: '昵称',
        dataIndex: 'nickName',
        width: 130,
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '空间使用',
        dataIndex: 'userId',
        render(_: any, item: any){
          const a = setSize(item.useSpace)
          const b = setSize(item.totalSpace)
          return `${a}/${b}`
        },
        width: 160,
      },
      {
        title: '加入时间',
        dataIndex: 'joinTime',
        width: 170,
      },
      {
        title: '最后登录时间',
        dataIndex: 'lastLoginTime',
        width: 170,
      },
      {
        title: '状态',
        dataIndex: 'status',
        render(status: number){
          return <div style={{color:  status === 1 ? '#529B2E' : 'red'}}>{status === 1 ? '正常' : '禁用'}</div>
        },
        width: 60,
      },
      {
        title: '操作',
        render: (item: any) => {
          let a = item.status === 1 ? '0' : '1'
          return (
            <Space size="middle">
              <a onClick={()=>{setSpace(item)}}>分配空间</a>
              <a onClick={()=>{handle(item.userId, a)}}>{item.status === 1 ? '禁用' : '启用'}</a>
              <a onClick={()=>{setAdminMethod(item.userId, item.admin)}}>
                {
                  item.admin ? '取消管理员' : '设为管理员'
                }
              </a>
            </Space>
          )
        },
        width: 170
      },
    ];
  }, [])

  const [ userList, setUserList ] = React.useState([])
  const [ search, setSearch ] = React.useState({
    nickNameFuzzy:"",
    status: "",
  })
  // 获取当前可视区高度
  const [ newHeight, setNewHeight ]  = useState(window.innerHeight - 240)

  // ----- useeffect -----
  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{
    window.addEventListener('resize', handleResize)

    return () =>{
      return window.removeEventListener('resize', handleResize)
    }
  }, [window.innerHeight])

  // ----- method -----

  // 分配空间
  const setSpace = (item: any) =>{
    setIsPwdModalOpen(true)
    setUserItem(item)
  }
  
  // 设置管理员
  const setAdminMethod = async (userId: string, status: Boolean) =>{
    // 是管理员，取消
    if(status){
      const res = await cancelAdmin(userId)
      if(res.data.code === 200){
        getData()
      }
    }else{
      const res = await setAdmin(userId)
      if(res.data.code === 200){
        getData()
      }
    }
  }

  const handleResize = () =>{
    setNewHeight(window.innerHeight - 240)
  }

  const getData = (data?:{nickNameFuzzy?: string, status?: string}) =>{
    dispatch(changeLoading(true))
    getUserList({
      ...data
    }).then(res =>{
      let { list } = res.data.data
  
      for (const item of list) {
        item.key = item.userId
      }
      setUserList(list)
      dispatch(changeLoading(false))
    })
  }

  const handle = async (userId: string, status: string) =>{
    const res = await updateUserStatus(userId, status)
    if(res.data.code === 200){
      getData()
    }
  }

  const selectChange = (e: string) =>{
    setSearch({
      ...search,
      status:e,
    })
  }
  
  const inputChange = (e: any) =>{
    setSearch({
      ...search,
      nickNameFuzzy:e.target.value
    })
  }

  const handleOk = async () =>{
    const changeSpace = await form.getFieldValue('changeSpace')
    console.log(changeSpace);
    const res = await distributeSpace(userItem.userId, changeSpace)
    if(res.data.code === 200){
      dispatch(changeMessageApi({
        info: '操作成功',
        type: 'success'
      }))
    }else{
      dispatch(changeMessageApi({
        info: res?.data.info || '服务器异常，请稍后重试',
        type: 'error'
      }))
    }

    setIsPwdModalOpen(false)
  }

  return (
    <UserListStyle height={newHeight + 57}>

      <Modal title="分配空间" 
        open={isSpaceModalOpen} 
        onOk={handleOk}
        onCancel={()=>{setIsPwdModalOpen(false)}}>
            <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600,marginTop:50 }} 
              // onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <SetSpaceStyle>
                <span>用户：</span>
                <span>{ userItem.nickName }</span>
              </SetSpaceStyle>
              <Form.Item
                label="空间大小"
                name="changeSpace"
                rules={[
                  { required: true, message: '请输入空间大小' },
                ]}
              >
                <Input addonAfter="MB" type='number'/>
              </Form.Item>
            </Form>
      </Modal>

      <div className='search'>
        用户昵称：<Input style={{width:'200px'}} placeholder='请输入用户名称' allowClear onChange={(e)=>{inputChange(e)}}/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        状态：<Select style={{ width: 120 }} allowClear placeholder="请选择状态"
        options={[{ value: '1', label: '启用' }, { value: '0', label: '禁用' }]} onChange={selectChange}/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type='primary' onClick={()=>{getData(search)}}>查询</Button>
      </div>
      <ConfigProvider locale={zh_CN}>
        <Table columns={columns} dataSource={userList} loading={isLoading}
        sticky={{ offsetHeader: 0 }} scroll={{y: newHeight, x:1000}} pagination={{
          position:['bottomRight'],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (count) => `共 ${count} 条数据`
        }}
        ></Table>
      </ConfigProvider>
    </UserListStyle>
  )
})

export default index