import styled from "styled-components";

import backimg from '@/assets/images/share_bg.png'

export const ShareCheckStyle = styled.div`
    width: 100vw;
    height: 100vh;

    background-image: url(${backimg});
    background-repeat: repeat-x;
    background-position: 0 bottom;
    background-color: #eef2f6;

    display: flex;
    justify-content: center;
    /* align-items: center; */
    
    .logo{
        color:#409EFF;
        font-size: 50px;
        text-align: center;
        margin-top: 15vh;
        
        .icon-pan{
            vertical-align: middle;
        }
        

        .name{
            font-size: 30px;
        }
    }

    .share{
        width: 500px;
        height: 240px;
        /* border: 1px solid red; */
        margin-top: 20px;

        background: #fff;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 7px 1px #5757574f;


        .file-info{
            padding: 10px 20px;
            background: #409EFF;
            color: #fff;
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
                color: #fff;

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

        .code-body {
            padding: 30px 20px 60px 20px;
            
            .tips {
                font-weight: bold;
            }

            .input-area {
                margin-top: 15px;
                
                .code{
                    display: flex;

                    .ant-form-item{
                        flex: 1;
                    }

                    button{
                        margin-left: 20px;
                    }
                }
            }
        }
    }
`