import React from 'react'

import { useNavigate } from "react-router-dom";

export default function ErrorSurvey() {
const navigate = useNavigate();

function onClickMovetoMain(e) {
    e.preventDefault();
    //navigate('/');
    window.location.href = `http://172.16.210.80/`
  }

  return (
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className='div_title'>
    해당 설문의 응답기간이 아닙니다!
    <br/>
    <br/>
    </div>
    <div className='div_sub'>
    나도 한번 만들어볼까?
    </div>
    <br/>
    <br/>
    <button type="button" onClick={(e) => onClickMovetoMain(e)}>설문 만들러가기</button>
    

    </>
  )
}
