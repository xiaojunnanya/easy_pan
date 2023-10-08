/*
 * @Author: XJN
 * @Date: 2023-10-06 15:44:38
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-10-08 20:39:54
 * @FilePath: \easy_pan\src\views\Home\index.tsx
 * @Description: 首页
 * @前端实习生: 鲸落
 */
import React, { memo, useState, useEffect } from 'react'
import { HomeStyled } from './style'
import { AppstoreAddOutlined, CloudUploadOutlined, CustomerServiceOutlined, 
  DeleteOutlined, EllipsisOutlined, FileImageOutlined, 
  FileWordOutlined, HomeOutlined, PlayCircleOutlined, SettingOutlined, 
  ShareAltOutlined, SwapOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Popover } from 'antd'

import headerImg from '@/assets/images/1.jpg'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'


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

const Home = memo(() => {
  // 跳转
  const naviage = useNavigate()
  // 路径
  let { pathname } = useLocation()
  // 动态路由
  const { category } = useParams()
  
  const [ showSecondaryMenu, setShowSecondaryMenu  ] = useState<menuType>()

  let pathnameSplit = pathname.split('/').slice(0,3).join('/')

  useEffect(()=>{
    for (const item of menus) {
      if( item.path.includes(pathnameSplit) ){
        setShowSecondaryMenu( item )
      }
    }
  }, [])


  const oneMenu = (item: menuType) =>{
    setShowSecondaryMenu(item)
    naviage(item.path)
  }

  const twoMenu = (item: any) =>{
    // setShowSecondaryMenu(item)
    naviage(item.path)
  }

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

            <Popover content='上传区域' title="上传任务（仅展示本次上传任务）" trigger="click">
              <SwapOutlined className='icon-transfer'/>
            </Popover>

            <Dropdown menu={{ items }} placement="bottom" arrow>
              <div className="user-info">
                <div className="avatar">
                  <img src={headerImg} alt="" />
                </div>
                <div className="nick-name">
                  鲸落
                </div>
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
                <div className="percent"></div>
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