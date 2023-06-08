import React, { useState } from "react";
import styles from "../../../styles/sidebar.module.css";
import { useRecoilState, useRecoilValue } from 'recoil';

import { surveyListState, relState, enableState, enableViewState } from '../../../contexts/atom';
import SideFont from "./SideFont";
import SideSize from "./SideSize";
import SideColor from "./SideColor";
import SideDate from "./SideDate";

import '../../../styles/SurveyStyle.css';


//각 토글키 만들기
//템플릿 찍어내기

function SidebarSetting(props){
  
  const [surveyList, setSurveyList] = useRecoilState(surveyListState);
  const [isTheme, setIsTheme] = useState(true);
  const [viewRel, setViewRel] = useState('진정성 검사 사용중'); 
  const [fontOpen,setFontOpen] = useState(false)
  const [sizeOpen,setSizeOpen] = useState(false)
  const [colorOpen,setColorOpen] = useState(false)
  const [dateOpen,setDateOpen] = useState(false)
  const [Rel, setRel] = useRecoilState(relState)
  const [enable, setEnable] = useRecoilState(enableState)
  const [viewEnable, setEnableView] = useRecoilState(enableViewState)
 
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
    console.log(JSON.stringify(surveyList))
    setViewRel(Rel===1?'진정성 검사 미사용중':'진정성 검사 사용중 ')
    const prel = Rel;
    setRel (prev=>prev===1?0:1);
    
    setSurveyList((prev) => {
      return {
          id: prev.id,
          title: prev.title,
          description: prev.description,
          type: prev.type,
          reliability: !prel,
          startDate:prev.startDate,
          endDate: prev.endDate,
          enable: prev.enable,
          design:prev.design,
          questionRequest: prev.questionRequest
      }
  })
  }

  const toggleEnable = (e) => {
    console.log(enable)
    setEnableView(!enable?'설문 응답 받는 중':'설문 응답 받지 않는 중 ')
    const prevEnable = enable;
    setEnable(prev=>prev===true?false:true);
    
    setSurveyList((prev) => {
      return {
          id: prev.id,
          title: prev.title,
          description: prev.description,
          type: prev.type,
          reliability: prev.reliability,
          
          startDate:prev.startDate,
          endDate: prev.endDate,
          enable: !prevEnable,
          design:prev.design,
         
          questionRequest: prev.questionRequest
      }
  })
  console.log(surveyList)
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
          <div  className={styles.sidebarList} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5%'}}>
            {isTheme ?
              <div className = {styles.sidebarList} style={{overflowY:'auto',overflowX:'hidden',width:"100%",height:"60vh"}}>
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
                <div style={{display:'flex', width:'100%',alignItems:'center', justifyContent:'center' }}>
                {
                colorOpen && (
                    <SideColor/>
                )
                  }

                </div> 
              </div>
              :
              <div  >
                <button className={styles.setBtn} >템플릿 설정</button>
                
                <button className={styles.setBtn} onClick={toggleEnable}>
                  {viewEnable}
                  </button>

                <button className={styles.setBtn} onClick={toggleRel}>
                  {viewRel}
                  </button>

                  
                <button className={styles.setBtn} onClick={(e)=>setDateOpen(!dateOpen)}>설문 기간 설정</button>
                <div>
                {
                dateOpen && (
                  
                <div style={{display:'flex', width:'100%',alignItems:'center', justifyContent:'center' }}>


<SideDate/>
                  </div> 
                )
                  }

                </div> 
              </div>
              
            }
           
            
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSetting;
