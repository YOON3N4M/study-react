import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "S-CoreDream-3Light";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

button{
    cursor: pointer;
    border: 0;
    border-radius: 5px;
    padding: 0.3rem 0.4rem;
}

body{
    margin: 0 0;
    font-family: "S-CoreDream-3Light";
    background-color: #0584bb;
    //color: #666666
}
ul{
    padding: 0 0;
    margin: 0 0;
}
h2{
    color: #f8f8f8;
    text-align:center ;
}

`;

export default GlobalStyle;
