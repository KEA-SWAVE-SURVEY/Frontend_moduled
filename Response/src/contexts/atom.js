import { atom } from "recoil";

export const loginState = atom({
    key: "loginState",
    default: {
        state :false,
        img: null,
        name: null,
        info: null,
        email: null,
        token: null
    }
});
//수정 아톰 수정 필요!!
export const surveyListState = atom({
    key: "surveyListState",
    default: {  
                id:0,
                title:"",
                description:"",
                type:0,
                reliability:1,
                design:{
                    font:`"Calibri", "Roboto", sans-serif`,
                    fontSize:3,
                    backColor:'#ffffff'
                },
                questionRequest:[   
                            {
                                id : 0,
                                type : 0,
                                title:"",
                                choiceList:""/*[
                                    id:0;
                                    choiceName:null;
                                ]*/
                            }
                        ]
            }
});

export const answerListState = atom({
    key: "answerListState",
    default: {  
                id:0,
                title: null,
                description: null,
                type: null,
                responseId:0,
                questionResponse:[/*
                            {
                                title:null,
                                type:null,
                                answer:null,
                                answerId:null,
                            }*/
                        ]
            }
});

export const modifyState = atom({
    key: "modifyState",
    default: false
});

export const navbarState = atom({
    key: "navbarState",
    default: {  
                item : [],
                selected : 0
            }
});

export const relState = atom({
    key: "relState",
    default: 1
});

export const fontState = atom({
    key: "fontState",
    default: `"Calibri", "Roboto", sans-serif`
});

export const fontSizeState = atom({
    key: "fontSizeState",
    default: 3
});

export const backColorState = atom({
    key: "backColorState",
    default: '#ffffff'
});


export const designState = atom({
    key: "designState",
    default: {
        font : "",
        fontSize : "",
        layout:""
    }
});