import styled from "styled-components";

export const HomeStyled = styled.div`

    .header{
        box-shadow: 0px 3px 10px 0 rgb(0 0 0 / 6%);
        height: 56px;
        padding:0 24px;
        position: relative;
        z-index: 200;

        display: flex;
        align-items: center;
        justify-content: space-between;


        .logo{
            display: flex;
            align-items: center;
            cursor: pointer;

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

        .right-panel{
            display: flex;
            align-items: center;

            .icon-transfer{
                cursor: pointer;
            }

            .user-info{
                margin: 0 10px;
                display: flex;
                align-items: center;
                cursor: pointer;

                .avatar{
                    margin:0px 5px 0px 15px;

                    img{
                        width:45px;
                        height: 45px;
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                }

                .nick-name{
                    color: #05a1f5;
                    font-size: 14px;
                }
            }
        }
    }

    .body {
        display: flex;

        .left-sider {
            border-right: 1px solid #f1f2f4;
            display: flex;

            .menu-list {
                height: calc(100vh - 56px);
                width: 80px;
                box-shadow: 0 3px 10px 0 rgb(0 0 0 /6%);
                border-right: 1px solid #f1f2f4;

                .menu-item {
                    text-align: center;
                    font-size: 14px;
                    font-weight: bold;
                    padding: 20px 0px;
                    cursor: pointer;

                    &:hover {
                        background: #f3f3f3;
                    }

                    .iconfont {
                        font-weight: normal;
                        font-size: 28px;
                    }
                }

                .active {

                    .iconfont {
                        color: #06A7FF;
                    }

                    .text {
                        color: #06A7FF;
                    }
                }
            }

            .menu-sub-list {
                width: 200px;
                padding: 20px 10px 0px;
                position: relative;

                .menu-item-sub {
                    text-align: center;
                    line-height: 40px;
                    border-radius: 5px;
                    cursor: pointer;

                    &:hover {
                        background: #f3f3f3;
                    }

                    .iconfont {
                        font-size: 14px;
                        margin-right: 20px;
                    }

                    .text {
                        font-size: 13px;
                    }
                }

                .active {
                    background: #eef9fe;

                    .iconfont {
                        color: #06A7FF;
                    }

                    .text {
                        color: #06A7FF;
                    }
                }

                .tips {
                    margin-top: 10px;
                    color: #888888;
                    font-size: 13px;
                }

                .space-info {
                    position: absolute;
                    bottom: 10px;
                    width: 100%;
                    padding: 0px 5px;

                    .percent {
                        padding-right: 10px;
                    }

                    .space-use {
                        margin-top: 5px;
                        color: #7e7e7e;
                        display: flex;
                        justify-content: space-around;
                        
                        .use {
                            flex: 1;
                        }
                        .iconfont {
                            cursor: pointer;
                            margin-right: 20px;
                            color: #06A7FF;
                        }
                    }
                }
            }
        }
        .body-content {
            flex: 1;
            width: 0;
            padding-left: 20px;
        }
    }
`