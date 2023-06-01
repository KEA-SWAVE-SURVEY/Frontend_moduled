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

export const surveyListState = atom({
    key: "surveyListState",
    default: {  
                id:0,
                title:"",
                description:"",
                type:0,
                design :{
                    font : 0,
                    fontSize: 0,
                    layout : 0,
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