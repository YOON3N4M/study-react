import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
button{
    cursor: pointer;
}

body{
    margin: 0 0;
}
ul{
    padding: 0 0;
    margin: 0 0;
}
h2{
    color: #f8f8f8;
    text-align:center ;
}
.fadeup {
  animation: fadeup 0.5s ease-in-out;
  -moz-animation: fadeup 0.5s ease-in-out;
  /* Firefox */
  -webkit-animation: fadeup 0.5s ease-in-out;
  /* Safari and Chrome */
  -o-animation: fadeup 0.5s ease-in-out;
}


.fadein {
  animation: fadein 0.3s ease;
  -moz-animation: fadein 0.3s ease;
  /* Firefox */
  -webkit-animation: fadein 0.3s ease;
  /* Safari and Chrome */
  -o-animation: fadein 0.3s ease;
}

.fadedown {
    animation: fadedown 0.3s ease;
  -moz-animation: fadedown 0.3s ease;
  /* Firefox */
  -webkit-animation: fadedown 0.3s ease;
  /* Safari and Chrome */
  -o-animation: fadedown 0.3s ease;
}

@keyframes fadeup {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 100%;
    transform: none;
  }
}

@-moz-keyframes fadeup {
  /* Firefox */
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 100%;
    transform: none;
  }
}

@-webkit-keyframes fadeup {
  /* Safari and Chrome */
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 100%;
    transform: none;
  }
}

@-o-keyframes fadeup {
  /* Opera */
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 100%;
    transform: none;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
}

@-moz-keyframes fadein {
  /* Firefox */
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
}

@-webkit-keyframes fadein {
  /* Safari and Chrome */
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
}

@-o-keyframes fadein {
  /* Opera */
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
}

@keyframes fadedown {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 100%;
    transform: none;
  }
}

@-moz-keyframes fadedown {
  /* Firefox */
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 100%;
    transform: none;
  }
}

@-webkit-keyframes fadedown {
  /* Safari and Chrome */
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 100%;
    transform: none;
  }
}

@-o-keyframes fadedown {
  /* Opera */
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 100%;
    transform: none;
  }
}
`;

export default GlobalStyle;
