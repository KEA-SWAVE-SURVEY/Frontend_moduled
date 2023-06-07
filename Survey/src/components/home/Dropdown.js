 
import '../../styles/DropdownStyles.css';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { encode as base64_encode} from 'base-64'; 
  
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState, modifyState } from '../../contexts/atom'; 

import { useRecoilState } from 'recoil';
import { surveyListState , answerListState} from '../../contexts/atom';


function Dropdown(props) {
  /* 현재 기능 아예 없음 */  
 
  const id = props.id;
  let encoded = base64_encode(id);



  const scrollRef = useRef();

  const divRef = useRef(null);
  
  const topRef = useRef(null);
  const today = new Date().toLocaleDateString(); 
 
  const setIsModify = useSetRecoilState(modifyState);
  const [surveyList, setSurveyList] = useRecoilState(surveyListState);

//todo 복사 미구현?
  function onClickCreateDuplicatedSurvey(e,index) {
    e.preventDefault();
    window.location.href = `http://172.16.210.80/template/Survey/${index+1}`
    //window.location.href =`http://172.16.210.80/api/external/template-load/${index+1}`
    setIsModify((prev) => true);
    loadSurveys();
        const loadSurveys = async()=>{
          //수정06072100
            const result = await axios.get(`/api/document/external/survey-list/${id}`);
            
            console.log(result)
            setSurveyList((prev) => {
                return {
                    id: result.data.id,
                    title: result.data.title,
                    description: result.data.description,
                    reliability: result.data.reliability,
                    design:result.data.design,
                    type: result.data.type,
                    questionRequest: result.data.questionList.map((questionList) => {
                        return {
                            id: questionList.id,
                            title: questionList.title,
                            type: questionList.questionType,
                            choiceList: questionList.choiceList.map((choice) => {
                                return {
                                    id: choice.id,
                                    choiceName: choice.title
                                }
                            })
                        }
                    })
                }
            });
       
    }
} 
 
  //todo확인완료 navigater??
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

    } catch (error) {
    }
  }; 
   
  function onClickResearch(e){
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `http://172.16.210.80/research/${id}`; 
  }
  //삭제 구현 복사 제거 수정 -> ip있어야 하나?
  //todo 확인완료 수정 22->80 싹다 수정 해야함 delete patch로 수정
  
  function onClickDelete(e){
    e.preventDefault();
    e.stopPropagation();
    axios.patch(`/api/user/external/delete/${id}`);
    window.location.reload()
  }
  return (
    <>
    <ul className='drop_ui'>
      <li className="dropdown_item" style={{borderRadius: "5px 5px 0 0"}} onClick={(e)=>onClickResearch(e)}>설문 분석</li>
      <li className="dropdown_item" onclick={() => handleCopyClipBoard(`http://172.16.210.80/Response/${encoded}`)} >URL 복사</li>
      <li className="dropdown_item" style={{borderRadius: "0 0 5px 5px"}} onClick={(e)=>onClickDelete(e)}>삭제</li>
      </ul>
    </>
  );
}

export default Dropdown;