import styled from "styled-components";

interface IProps {
    preview: boolean;
}

export const RenderNameStyle = styled.div<IProps>`

    .folderType{
        
        user-select: none;
        display: flex;
        align-items: center;

        .showImg{
            margin-right: 10px;
            text-align: center;
        }

        span, img{
            cursor: ${ props => props.preview && 'pointer' };

            &:hover{
                color: ${ props => props.preview && '#06A7FF' };
            }
        }

        img{
            height: 30px;
            width: 30px;
            object-fit: cover;
        }
    }
`