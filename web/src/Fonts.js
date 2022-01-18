/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/
//Realizar import de fontes por meio de Global.js, método que seria utilizado, mas resolvi fazer de forma padrão.

import { css } from "styled-components";

// FONT ICON'S
import {
  ModeratMedium,
  ModeratMonoRegular,
  ModeratRegular,
} from "assets/fonts";

export const MainFontFace = css`
    @font-face {
        font-family: 'moderat';
        font-weight: normal;
        font-style: normal;
        src: url('${ModeratRegular}?vvuwob') format('truetype');
    }
    @font-face {
        font-family: 'moderat-medium';
        font-weight: normal;
        font-style: normal;
        src: url('${ModeratMedium}?vvuwob') format('truetype');
    }
    @font-face {
        font-family: 'moderat-mono;
        font-weight: normal;
        font-style: normal;
        src: url('${ModeratMonoRegular}?vvuwob') format('truetype');
    }
`;