/*
 * @Author: XJN
 * @Date: 2023-11-17 15:04:57
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-05 17:54:31
 * @FilePath: \easy_pan\src\components\Table\Preview\style.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
import styled from "styled-components";

export const PreviewStyled = styled.div`
    height: 100%;

    .video{
        object-fit: fill;
        height: 100%;
        width: 100%;
    }

    .img{
        height: 75vh;
        display: flex;
        align-items: center;
        justify-content: center;

        img{
            margin-top: 10px;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .other{
        height: 100%;
        display: flex;
        justify-content:center;
        align-items: center;
        

        div{
            text-align: center;

            .name{
                font-weight: 700;
                font-size:18px;
                color: #636D7E;
            }

            .info{
                font-size: 12px;
                color: #9FA09E;
                margin: 10px 0 15px 0;
            }
        }
    }

    .code-block{
        background-color: #F5F5F5;
        padding: 10px 20px;
    }

    .react-pdf__Page__textContent, .react-pdf__Page__annotations{
        display: none !important;
    }
    /* react-pdf__Page__textContent textLayer */
`