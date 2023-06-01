import React, { useState } from "react";
import styles from "../../../styles/sidebar.module.css";
import { useRecoilState, useRecoilValue } from 'recoil';

import { surveyListState, relState } from '../../../contexts/atom';
import SideFont from "./SideFont";
import SideSize from "./SideSize";
import SideColor from "./SideColor";

import '../../../styles/SurveyStyle.css';


//각 토글키 만들기
//템플릿 찍어내기

function SidebarSetting(props){
  
  const [surveyList, setSurveyList] = useRecoilState(surveyListState);
  const [isTheme, setIsTheme] = useState(true);
  const [viewRel, setViewRel] = useState('진정성 검사 미사용');
  const [fontOpen,setFontOpen] = useState(false)
  const [sizeOpen,setSizeOpen] = useState(false)
  const [colorOpen,setColorOpen] = useState(false)
  const [Rel, setRel] = useRecoilState(relState);
  const [font,setFont] = useState(false)

  function onClickThemeButton(e){
    e.preventDefault();
    setIsTheme(true);
  }
  
  function onClickManagementButton(e){
    e.preventDefault();
    setIsTheme(false);
  }
//remember

  const toggleRel = (e) => {
    console.log(Rel)
    setViewRel(prev=>prev==='진정성 검사 사용'?'진정성 검사 미사용':'진정성 검사 사용')
    const prel = Rel;
    setRel (prev=>prev===1?0:1);
    
    setSurveyList((prev) => {
      return {
          id: prev.id,
          title: prev.title,
          description: prev.description,
          type: prev.type,
          reliability: !prel,
          design:prev.design,
          font:prev.font,
          fontSize:prev.fontSize,
          backColor:prev.backColor,
          questionRequest: prev.questionRequest
      }
  })
  }

  return (
    <div className={styles.container}>

      <div className={styles.sidebar} >
        <div className={styles.content}>
          <h1>설문 관리</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h2 className={isTheme? styles.menu_selected : styles.menu} onClick={(e)=>{onClickThemeButton(e)}}>테마</h2>
            <h2 className={isTheme? styles.menu : styles.menu_selected}  onClick={(e)=>{onClickManagementButton(e)}}>관리</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5%'}}>
            {isTheme ?
              <div style={{overflowY:'scroll',overflowX:'hidden',width:"100%",height:"60vh"}}>
                <button className={styles.setBtn} onClick={(e)=>setFontOpen(!fontOpen)}>폰트</button>
                <div>
                {
                fontOpen && (
                    <SideFont/>
                )
                 }
                </div>
                <button className={styles.setBtn} onClick={(e)=>setSizeOpen(!sizeOpen)}>폰트 사이즈</button>
                <div>
                {
                sizeOpen && (
                    <SideSize/>
                )
                 }
                </div>
                <button className={styles.setBtn} onClick={(e)=>setColorOpen(!colorOpen)}>배경 색상</button>
                <div>
                {
                colorOpen && (
                    <SideColor/>
                )
                  }

                </div>
                <button className={styles.setBtn} >파일 내보내기</button>
                <button className={styles.setBtn} >설문 내보내기</button>
              </div>
              :
              <div>
                <button className={styles.setBtn} >템플릿 설정</button>
                
                <button className={styles.setBtn} >설문 기간 설정</button>
                <button className={styles.setBtn} onClick={toggleRel}>
                  {viewRel}
                  </button>
              </div>
              
            }
           
            
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSetting;
