import React from 'react'
import '../../styles/NavbarStyles.css';

import { useNavigate } from "react-router-dom";
import {removeCookie} from '../login/cookie'

const MenuProfile = () => {
    const navigate = useNavigate();
    function onClickLogout() {
        removeCookie('token')
        // navigate('/');
        
        window.location.href = `http://172.16.210.22/`; 
    }
    function onClickMypage(e){
        e.preventDefault();
        // navigate('/mypage');
        
        window.location.href = `http://172.16.210.22/mypage`; 
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
