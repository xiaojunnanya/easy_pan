import styled from "styled-components";


interface propsType{
    height?: number;
}

export const WaitStyled = styled.div<propsType>`
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

