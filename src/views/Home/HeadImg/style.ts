import styled from "styled-components";

export const HeadImgStyle = styled.div`
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

`