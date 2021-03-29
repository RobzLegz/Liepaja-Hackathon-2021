import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    button, 
    input{
        outline: none;
        border: 1px solid lightgray;
    }
    button{
        cursor: pointer;
    }
`;

export default GlobalStyles;
