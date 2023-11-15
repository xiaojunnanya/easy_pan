/*
 * @Author: XJN
 * @Date: 2023-10-06 15:44:38
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-14 02:02:18
 * @FilePath: \easy_pan\src\views\Home\index.tsx
 * @Description: 首页
 * @前端实习生: 鲸落
 */
import React, { memo, useState, useEffect, useMemo } from 'react'
import { HomeStyled } from './style'
import { AppstoreAddOutlined, CloudUploadOutlined, CustomerServiceOutlined, 
  DeleteOutlined, EllipsisOutlined, FileImageOutlined, 
  FileWordOutlined, HomeOutlined, PlayCircleOutlined, SettingOutlined, 
  ShareAltOutlined, SwapOutlined, SyncOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { Dropdown, MenuProps, Modal, Popover, Progress } from 'antd'

import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getHeaderImg, space, logout } from '@/service/modules/home'
import setSize from '@/utils/setSize'
import { useAppDispatch } from '@/store'
import { changeLoading } from '@/store/modules/home'

// 定义：
const { confirm } = Modal;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (<span> 修改头像 </span>),
  },
  {
    key: '2',
    label: (<span> 修改账户 </span>),
  },
  {
    key: '3',
    label: (<span> 修改密码 </span>),
  },
  {
    key: '4',
    label: (<span> 退出登录 </span>),
  },
];

interface menuType{
  name: string,
  icon: any;
  menuCode: string,
  path: string,
  allShow: boolean,
  tips?:string,
  children: {
    name: string,
    path: string,
    icon?: any;
    category: string,
  }[],
}

type menuTypes = menuType[]

const menus: menuTypes = [
  {
      name: "首页",
      icon: <HomeOutlined className='iconfont'/>,
      menuCode: "main",
      path: "/main/home/all",
      allShow: true,
      children: [
          {
              icon: <AppstoreAddOutlined className='iconfont'/>,
              name: "全部",
              category: "all",
              path: "/main/home/all",
          },
          {
              icon: <PlayCircleOutlined className='iconfont'/>,
              name: "视频",
              category: "video",
              path: "/main/home/video",
          },
          {
              icon: <CustomerServiceOutlined className='iconfont'/>,
              name: "音频",
              category: "music",
              path: "/main/home/music",
          },
          {
              icon: <FileImageOutlined className='iconfont'/>,
              name: "图片",
              category: "image",
              path: "/main/home/image",
          },
          {
              icon: <FileWordOutlined className='iconfont'/>,
              name: "文档",
              category: "doc",
              path: "/main/home/doc",
          },
          {
              icon: <EllipsisOutlined className='iconfont'/>,
              name: "其他",
              category: "others",
              path: "/main/home/others",
          },
      ],
  },
  {
      path: "/main/share",
      icon: <ShareAltOutlined className='iconfont'/>,
      name: "分享",
      menuCode: "share",
      allShow: true,
      children: [
          {
              name: "分享记录",
              path: "/main/share",
              category: "share",
          },
      ],
  },
  {
      path: "/main/recycle",
      icon: <DeleteOutlined className='iconfont'/>,
      name: "回收站",
      menuCode: "recycle",
      tips: "回收站为你保存10天内删除的文件",
      allShow: true,
      children: [
          {
              name: "删除的文件",
              path: "/main/recycle",
              category: "recycle",
          },
      ],
  },
  {
      path: "/main/settings/fileList",
      icon: <SettingOutlined className='iconfont'/>,
      name: "设置",
      menuCode: "settings",
      allShow: false,
      children: [
          {
              name: "用户文件",
              path: "/main/settings/fileList",
              category: "fileList",
          },
          {
              name: "用户管理",
              path: "/main/settings/userList",
              category: "userList",
          },
          {
              name: "系统设置",
              path: "/main/settings/sysSetting",
              category: "sysSetting",
          },
      ],
  },
];

const { nickName, userId } = JSON.parse(sessionStorage.getItem('userInfo') || JSON.stringify({nickName:'', userId:''}))

const Home = memo(() => {

  const dispatch = useAppDispatch()

  // 定义：
  // 跳转
  const naviage = useNavigate()
  // 路径
  let { pathname } = useLocation()
  // 动态路由
  const { category } = useParams()
  
  const [ showSecondaryMenu, setShowSecondaryMenu  ] = useState<menuType>()
  const [ userSpace, setUserSpace ] = useState<{
    useSpace: number,
    totalSpace: number
  }>({
    useSpace: 0,
    totalSpace: 0,
  }) 
  const [ isSpin, setIsSpin ] = useState<boolean>(false)
  // Popover 是否展示
  const [ isPopoverShow, setIsPopoverShow ] = useState<boolean>(false)

  let pathnameSplit = pathname.split('/').slice(0,3).join('/')



  // useEffect：
  useEffect(()=>{

    getSpace()

    for (const item of menus) {
      if( item.path.includes(pathnameSplit) ){
        setShowSecondaryMenu( item )
        // 不是很好的方案使用return，路由需要继续优化
        return
      }
    }
  }, [])



  // 方法：
  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1': break;
      case '2': break;
      case '3': break;
      case '4': 
        showConfirm()
        break;
    
      default:
        break;
    }
  };

  const showConfirm = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleFilled />,
      content: '你确定要退出登录吗',
      cancelText:"取消",
      okText:"确定",
      onOk() {
        logout()
        sessionStorage.removeItem('userInfo')
        naviage('/login')
      },
    });
  };

  const oneMenu = (item: menuType) =>{
    setShowSecondaryMenu(item)
    naviage(item.path)
  }

  const twoMenu = (item: any) =>{ 
    naviage(item.path)
    // 开启表格加载
    dispatch(changeLoading(true))
   }

  /**
   * 获取空间
   */
  const getSpace = () =>{
    setIsSpin(true)
    space().then(res =>{
      setUserSpace(res.data.data)
      setIsSpin(false)
    })
  }



  // 展示区域：

  // 一级菜单
  const firstLevelMenu = menus.map((item ,index) =>{
    return (
      <div className={ `menu-item ${ item.path.includes(pathnameSplit) ? 'active' : '' }  ` } key={item.path} onClick={()=>{oneMenu(item)}}>
        { item.icon }
        <div className="text"> { item.name } </div>
      </div>
    )
  })

  
  // 二级菜单
  const SecondaryMenu = showSecondaryMenu?.children.map((item, index) =>{
    return (
      <div className={ `menu-item-sub ${ category === item.category || !category ? 'active' : '' }  ` } key={index} onClick={()=>{twoMenu(item)}}>
        {
          !!item.icon && item.icon
        }
        <span> { item.name } </span>
      </div>
    )
  })

  // 上传区域展示
  const showContent = () =>{
    return (
      <div className="content">
        <div>
          <span>11</span>
          <Progress percent={30} status="active" />
        </div>
        <Progress percent={70} status="exception" />
        <Progress percent={100} />
      </div>
    )
  }


  const a = useMemo(()=>{
    return setSize(userSpace.useSpace)
  }, [ userSpace.useSpace ])
  const b = useMemo(()=>{
    return setSize(userSpace.totalSpace)
  }, [ userSpace.totalSpace ])
  
  return (
    <HomeStyled>
      <div className="framework">
        <div className="header">
          <div className="logo">
            {/* <span className='icon-pan iconfont'> </span> */}
            <CloudUploadOutlined className='icon-pan'/>
            <div className="name">Easy 云盘</div>
          </div>
          <div className="right-panel">
            
            <Popover content={showContent} title="上传任务（仅展示本次上传任务）" trigger="click" overlayInnerStyle={{
              width: '500px',
              marginRight: '10px'
            }} open={isPopoverShow} onOpenChange={()=>{setIsPopoverShow(!isPopoverShow)}}>
              <SwapOutlined className='icon-transfer'/>
            </Popover>

            <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
              <div className="user-info">
                <div className="avatar">
                  <img src={getHeaderImg(userId)} alt="" />
                </div>
                <div className="nick-name">{ nickName }</div>
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="body">
          <div className="left-sider">
            <div className="menu-list"> { firstLevelMenu } </div>
            <div className="menu-sub-list">

              <>
                {
                  SecondaryMenu
                }
              </>
              
              <div className="tips">
                {
                  !!showSecondaryMenu?.tips && showSecondaryMenu.tips
                }
              </div>

              <div className="space-info">
                <div>空间使用</div>
                <div className="percent">
                  <Progress percent={Number(Math.ceil(userSpace.useSpace / userSpace.totalSpace))} size="small" />
                </div>
                <div className="space-use">
                  <div className="use">
                    { a } / { b }
                  </div>
                  
                  <SyncOutlined className="iconfont icon-refresh" onClick={getSpace} spin={isSpin}/>
                </div>
              </div>
            </div>

          </div>
          <div className="body-content">
             <Outlet></Outlet>
          </div>
        </div>
      </div>
    </HomeStyled>
  )
})

export default Home