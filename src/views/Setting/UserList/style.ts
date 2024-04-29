import styled from "styled-components";

interface propsType{
    height?: number;
}

export const UserListStyle = styled.div<propsType>`

    .search{
        display: flex;
        /* justify-content: center; */
        align-items: center;
        margin: 15px 0;
    }

    .ant-table{
        height: ${ props => props.height + 'px' }
    }

    .setSpace{
        margin: 0 10px;
    }
`

export const SetSpaceStyle = styled.div`
    margin-left: 38px;
    margin-bottom: 10px;
`