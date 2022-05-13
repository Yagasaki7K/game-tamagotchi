import styled from 'styled-components';

const TamaDetails = styled.div`
    .console {
        font-size: 18px;
    }

    .life {
        display: flex;
        
        p {
            margin-right: 50px;
            font-size: 25px;
        }
    }

    button {
        margin-right: 20px;
        font-size: 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        
        :hover {
            transition: 0.5s;
            background: #969696;
        }
    }
`

export default TamaDetails