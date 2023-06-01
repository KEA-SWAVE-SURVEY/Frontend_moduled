import React, { useState } from "react";
import styles from "../../../styles/sidebar.module.css";

function SidebarSetting(props){
  const [isTheme, setIsTheme] = useState(true);

  function onClickThemeButton(e){
    e.preventDefault();
    setIsTheme(true);
  }
  
  function onClickManagementButton(e){
    e.preventDefault();
    setIsTheme(false);
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
              <div>
                <button className={styles.setBtn} >글꼴</button>
                <button className={styles.setBtn} >사이즈</button>
                <button className={styles.setBtn} >배경 화면</button>
                <button className={styles.setBtn} >파일 내보내기</button>
                <button className={styles.setBtn} >설문 내보내기</button>
              </div>
              :
              <div>
                <button className={styles.setBtn} >템플릿 설정</button>
                <button className={styles.setBtn} >설문 기간 설정</button>
                <button className={styles.setBtn} >설문 진정성 평가</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSetting;
