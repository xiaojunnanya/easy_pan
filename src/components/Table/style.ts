/*
 * @Author: XJN
 * @Date: 2023-11-13 11:24:06
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-04 15:42:54
 * @FilePath: \easy_pan\src\components\Table\style.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
import styled from "styled-components";


interface propsType{
    height?: number;
}

export const TableStyled = styled.div<propsType>`
    .ant-table-pagination{
        margin-right: 40px !important;
        position: relative;
        bottom: 10px;
    }

    .allHandle{
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        .handle{
            color: #06A7FF;
            margin: 0 5px;
            cursor: pointer;

            img{
                width: 22px;
                height: 22px;
                vertical-align: bottom
            }
        }
    }


    .ant-table{
        height: ${ props => props.height + 'px' }
    }
`

