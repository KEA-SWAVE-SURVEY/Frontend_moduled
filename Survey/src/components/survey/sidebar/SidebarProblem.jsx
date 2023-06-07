import React from 'react';
import { useRecoilState } from "recoil";
import { surveyListState } from "../../../contexts/atom";
import { updateSurveyContent } from '../../../utils/updateJSON';

import styles from "../../../styles/sidebar.module.css";


function SidebarProblem(props) {
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);

    const setOpen = props.setOpen;
    const index = props.index;

    const problem = surveyList?.questionRequest[index];

    const list = ['주관식', '찬부식', '객관식'];

    function onClickTypeButton(e, typeId) {
        e.preventDefault();
        setSurveyList((prev) => {
            let newContent = {
                id: prev.questionRequest[index].id,
                type: typeId,
                title: prev.questionRequest[index].title,
                choiceList: []
            };
            if (typeId === 1) newContent.choiceList = [{ id: 0, choiceName: true },{ id: 1, choiceName: false}];
            else if (typeId === 2) newContent.choiceList = [{ id: 0, choiceName: "" }];
            return updateSurveyContent(prev, newContent, index);
        });
    }

    function onClickCopyButton(e) {
        e.preventDefault();
        const lastIndex = surveyList.questionRequest.length - 1;
        var id;
        if(lastIndex !== -1) id = surveyList.questionRequest[lastIndex].id + 1;
        setSurveyList((prev) => {
            const duplicatedProblem = {
                id: id,
                type: prev.questionRequest[index].type,
                title: prev.questionRequest[index].title,
                choiceList: prev.questionRequest[index].choiceList
            };

            const newContent = [
                ...prev.questionRequest.slice(0, index),
                duplicatedProblem,
                ...prev.questionRequest.slice(index)
            ];
//수정필요 일단 넣긴함
            return {
                id: prev.id,
                title: prev.title,
                type: prev.type,
                reliability: prev.reliability,
                startDate:prev.startDate,
                endDate: prev.endDate,
                enable: prev.enable,
                design:prev.design,
                questionRequest: newContent
            };
        });
    }

    function onClickDeleteButton(e) {
        e.preventDefault();
        setSurveyList((prev) => {
            const deletedContent = [
                ...prev.questionRequest.slice(0, index),
                ...prev.questionRequest.slice(index + 1)
            ];
            return {
                id: prev.id,
                title: prev.title,
                type: prev.type,
                reliability: prev.reliability,
                startDate:prev.startDate,
                endDate: prev.endDate,
                enable: prev.enable,
                design:prev.design,
                questionRequest: deletedContent
            };
        });
        setOpen({open: false, isSetting: false, isGPT: false});
    }


    return (
        <div className={styles.container} >
            <div className={styles.sidebar} >
                <div className={styles.content}>
                    <h1>문항 제작</h1>
                    <hr style={{ border: "solid 0.5px #1b0278" }} />
                    <h4>질문 종류 선택</h4>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {list.map((name, index) => {
                            return <button key={index} className={problem && index === problem.type ? styles.setBtn_selected : styles.setBtn} style={{ width: "30%" }} onClick={(e) => { onClickTypeButton(e, index) }}>{name}</button>
                        })}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <button className={styles.setBtn} style={{ width: "100%" }} onClick={(e) => { onClickCopyButton(e) }}>질문 복사</button>
                        <button className={styles.setBtn} style={{ width: "100%" }} onClick={(e) => { onClickDeleteButton(e) }}>질문 삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarProblem;