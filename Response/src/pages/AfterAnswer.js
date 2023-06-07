import React from 'react' 

export default function AfterAnswer() { 

function onClickMovetoMain(e) {
    e.preventDefault(); 
    
    window.location.href = `http://172.16.210.80/`; 
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
    설문에 참여해주셔서 감사합니다.
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
