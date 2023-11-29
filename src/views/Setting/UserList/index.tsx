import { getHeaderImg } from '@/service/modules/home'
import { getUserList } from '@/service/modules/setting'
import { setSize } from '@/utils'
import { Button, Input, Space, Table } from 'antd'
import React, { memo, useEffect, useMemo } from 'react'
import { UserListStyle } from './style'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { changeLoading } from '@/store/modules/common'

const index = memo(() => {

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
        }
      },
      {
        title: '昵称',
        dataIndex: 'nickName'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '空间使用',
        dataIndex: 'userId',
        render(_: any, item: any){
          console.log(item);
          const a = setSize(item.useSpace)
          const b = setSize(item.totalSpace)

          return `${a}/${b}`
        }
      },
      {
        title: '加入时间',
        dataIndex: 'joinTime'
      },
      {
        title: '最后登录时间',
        dataIndex: 'lastLoginTime'
      },
      {
        title: '状态',
        dataIndex: 'status',
        render(status: number){
          return <div style={{color:  status === 1 ? '#529B2E' : 'red'}}>{status === 1 ? '正常' : '禁用'}</div>
        }
      },
      {
        title: '操作',
        render: () => (
          <Space size="middle">
            <a>分配空间</a>
            <a>启用</a>
          </Space>
        ),
      },
    ];
  }, [])

  const [ userList, setUserList ] = React.useState([])

  // ----- useeffect -----
  useEffect(()=>{
    dispatch(changeLoading(true))
    getUserList().then(res =>{
      let { list } = res.data.data
  
      for (const item of list) {
        item.key = item.userId
      }
      console.log(list);
      setUserList(list)
      dispatch(changeLoading(false))
    })
  },[])

  return (
    <UserListStyle>
      <div className='search'>
        用户昵称：<Input style={{width:'200px'}} placeholder='请输入用户名称'></Input>
      </div>
      <Table columns={columns} dataSource={userList} loading={isLoading}></Table>
    </UserListStyle>
  )
})

export default index