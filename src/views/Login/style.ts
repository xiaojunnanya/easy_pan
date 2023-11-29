import styled from "styled-components";

import login_bg from '@/assets/images/login_bg.jpg'
import login_img from '@/assets/images/login_img.png'

export const LoginStyled = styled.div`
    .login-body{
        height: 100vh;
        background-size: cover;
        background-image: url(${login_bg});
        display: flex;
        
        .bg{
            flex: 1;
            background-size: cover;
            background-position: center;
            background-size: 800px;
            background-repeat: no-repeat;
            background-image: url(${login_img});
        }

        .login-panel{
            width: 430px;
            margin-right: 10%;
            margin-top: calc( (100vh - 500px)/2 );
            
            .checkCode{
                display: flex;

                .ant-form-item{
                    width: 230px;
                }

                img{
                    height: 44px;
                    margin-left: 9px;
                    /* width: 151px; */
                    flex: 1;
                }
            }

            .emailCode{
                display: flex;

                .ant-form-item{
                    width: 250px;
                }

                button{
                    flex: 1;
                    height: 44px;
                    margin-left: 10px;
                }
            }

            .qqimg{
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                
                span{
                    margin-right: 6px;
                    color:#636D7E;
                }
                img{
                    width: 20px;
                }
            }
        }


        /* antd样式 */
        .login-form{
            background-color: #fff;
            padding: 20px;
            border-radius: 20px;
        }

        .ant-input-affix-wrapper{
            padding: 10px;
        }

        .login-form-button{
            width: 100%;
            height: 40px;
        }
    }
`