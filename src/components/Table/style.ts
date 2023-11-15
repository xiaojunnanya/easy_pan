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

    .folderType{
        
        user-select: none;
        display: flex;
        align-items: center;

        span, img{
            cursor: pointer;

            &:hover{
                color: #06A7FF;
            }
        }

        img{
            width: 30px;
            height: 30px;
            margin-right: 10px;
        }
    }

    /* ant-table ant-table-ping-right ant-table-fixed-header ant-table-scroll-horizontal */
    .ant-table{
        height: ${ props => props.height + 'px' }
    }
`

