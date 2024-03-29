import styled from "styled-components";

interface IProps {
    preview: string;
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

        .fileName{
            white-space: nowrap;
        }

        .status{
            margin-left: 10px;
            white-space: nowrap;
            color: #F0A239;
            font-size: 12px;
        }

        span, img{
            cursor: ${ props => props.preview === 'true' ? 'pointer' : '' };

            &:hover{
                color: ${ props => props.preview === 'true' ? '#06A7FF' : '' };
            }
        }

        img{
            height: 30px;
            width: 30px;
            object-fit: cover;
        }
    }
`