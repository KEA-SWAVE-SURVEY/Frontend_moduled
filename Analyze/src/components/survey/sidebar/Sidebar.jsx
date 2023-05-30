import React, { useEffect, useState } from "react";

import styles from "../../../styles/sidebar.module.css";
import arrowRight from '../../../assets/arrow_right.png';
import arrowLeft from '../../../assets/arrow_left.png';
import SidebarProblem from "./SidebarProblem";
import SidebarSetting from "./SidebarSetting";
import SidebarGPT from "./SidebarGPT";
import chatbot from "../../../assets/chatbot.png"


function Sidebar(props) {
  const [xPosition, setXPosition] = useState(85);

  const isOpen = props.isOpen;
  const setOpen = props.setOpen;

  useEffect(() => {
    if (isOpen.open) {
      setXPosition(0);
    }
    else {
      setXPosition(85);
    }
  }, [isOpen.open]);

  function onClickSettingButton(e) {
    e.preventDefault();
    setOpen({ open: true, isSetting: true, isGPT: false });
  }

  function onClickChatBotButton(e) {
    e.preventDefault();
    setOpen((prev) => { return { open: true, isSetting: false, isGPT: true } });
  }

  function onClickBackButton(e) {
    e.preventDefault();
    setOpen((prev) => { return { open: false, isSetting: prev.isSetting, isGPT: prev.isGPT } });
  }

  return (
    <div className={styles.area} style={{ transform: `translatex(${xPosition}%)` }}>
      <div className={styles.icon}>
        {isOpen.open ? <img className={styles.icon_img} src={arrowRight} alt="img" onClick={(e) => onClickBackButton(e)} /> : (
          <>
            <img className={styles.icon_img} src={arrowLeft} alt="img" onClick={(e) => onClickSettingButton(e)} />
            <img className={styles.icon_img} style={{padding:"0.3vw"}} src={chatbot} alt="img" onClick={(e) => onClickChatBotButton(e)} />
          </>
        )}
      </div>
      {isOpen.isSetting && <SidebarSetting />}
      {isOpen.isGPT && <SidebarGPT />}
      {!(isOpen.isSetting || isOpen.isGPT) && <SidebarProblem setOpen={setOpen} index={props.index} />}
    </div >
  );
};


export default Sidebar;