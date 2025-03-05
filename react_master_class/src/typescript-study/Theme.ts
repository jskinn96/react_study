import { DefaultTheme } from "styled-components"

//g styled-components의 DefaultTheme 인터페이스를 가져와서 사용함...styled.d.ts파일 참고 
export const darkMode:DefaultTheme = {
    bgColor : "#111",
    color : "whitesmoke",
    btnColor : "tomato",
}

export const lightMode:DefaultTheme = {
    bgColor : "whitesmoke",
    color : "#111",
    btnColor : "teal",
}