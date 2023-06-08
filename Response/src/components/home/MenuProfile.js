import React from 'react'
import '../../styles/NavbarStyles.css';
 
import {removeCookie} from '../login/cookie'

import { useNavigate } from "react-router-dom";
const MenuProfile = () => { 
    
    const navigate = useNavigate();
   
    const cookie = sessionStorage.getItem('token')
    async function onClickLogout() {
        if(window.confirm("로그아웃 하시겠습니까?")){
            
            sessionStorage.removeItem('token')
            removeCookie('survey')
            //06072300 수정
            
        navigate(`/`); 
            window.location.reload()
            console.log(cookie)
        }
        
    }
    //여기맞나? 확인해줘용 mypage인데 80?
    function onClickMypage(e){
        e.preventDefault(); 
        
        navigate(`/mypage`); 
    }
  return (
    <div className='menuProfile'>
        <ui className='menuProfile1'>
            <li onClick={onClickMypage} style={{cursor:'pointer'}}>마이페이지</li>
            <li onClick={onClickLogout} style={{cursor:'pointer'}}>Log Out</li>
        </ui>
    </div>
  )
}

export default MenuProfile
