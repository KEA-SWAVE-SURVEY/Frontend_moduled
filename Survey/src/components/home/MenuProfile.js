import React from 'react'
import '../../styles/NavbarStyles.css';
 
import {removeCookie} from '../login/cookie'

import { useNavigate } from "react-router-dom";
const MenuProfile = () => { 
    const navigate = useNavigate();
    const cookie = sessionStorage.getItem('token')
    function onClickLogout() { 
        if(window.confirm("로그아웃 하시겠습니까?")){
            
            sessionStorage.removeItem('token')
            removeCookie('survey')
            //06072300 수정
            
        navigate('/');
            // windo w.location.reload()
            console.log(cookie)
        }
        
    }
    function onClickMypage(e){
        e.preventDefault(); 
        
        navigate('/mypage');
        // wind ow.location.href = `http://172.16.210.80/mypage`; 
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
