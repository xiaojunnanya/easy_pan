/*
 * @Author: XJN
 * @Date: 2023-12-08 17:37:51
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-11 15:02:27
 * @FilePath: \easy_pan\src\views\ShareModule\Share\style.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
import styled from "styled-components";

export const ShareStyle = styled.div`

    .lo{
        background-color: #0C95F7;
        height: 50px;
        line-height: 50px;


        .logo{
            display: flex;
            align-items: center;
            width: 70%;
            margin: 0 auto;
            color: #fff;

            .icon-pan{
                font-size: 40px;
            }

            .name{
                font-weight: bold;
                margin-left: 5px;
                font-size: 25px;
                user-select: none;
            }
        }
    }

    .middle{
        width: 70%;
        margin: 0 auto;
        margin-top: 20px;

        .info{
            display: flex;
            justify-content:space-between
        }

        .file-info{
            padding: 10px 20px;
            color: #000;
            display: flex;
            align-items: center;

            .avatar {
                margin-right: 10px;

                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
            }

            .share-info {
                color: #000;

                .user-info {
                    display: flex;
                    align-items: center;
                    .nick-name {
                        font-size: 15px;
                        
                    }
                    .share-time {
                        margin-left: 20px;
                        font-size: 12px;
                    }
                }
                .file-name {
                    margin-top: 10px;
                    font-size: 12px;
                }
            }

        }
    }

`