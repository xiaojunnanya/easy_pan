/*
 * @Author: XJN
 * @Date: 2023-12-11 11:03:08
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-11 11:37:23
 * @FilePath: \easy_pan\src\views\ShareModule\InvalidSharing\style.tsx
 * @Description: 
 * @前端实习生: 鲸落
 */
import styled from "styled-components";

import rightBg from '@/assets/images/init-bg.png'

export const InvalidSharingStyle = styled.div`

    display: flex;
    height: 100vh;

    background-color: #DCEFFE;
    background-image: url(${rightBg});
    background-size: 620px 442px;
    background-repeat: no-repeat;
    background-position: 68% 40%;

    .left{
        width: 450px;
        background-color: #EAF5FE;

        .logo{
            display: flex;
            align-items: center;
            cursor: pointer;
            margin: 30px 0 0 30px;

            .icon-pan{
                font-size: 40px;
                color: #1296db;
            }

            .name{
                font-weight: bold;
                margin-left: 5px;
                font-size: 25px;
                color: #05a1f5;
                user-select: none;
            }
        }

        .info{
            text-align: center;
            margin-top: 120px;
            opacity: .6;
            
            img{
                width: 88px;
                height: 88px;
            }

            .txt{
                margin: 15px 0;
            }

        }
    }

    .right{
        flex:1;
        /* background-color: #DCEFFE;
        background-image: url(${rightBg});
        background-size: 620px 442px;
        background-repeat: no-repeat;
        background-position: 68% center; */
    }

`