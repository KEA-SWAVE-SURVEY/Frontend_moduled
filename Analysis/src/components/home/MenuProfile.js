import React from 'react'
import '../../styles/NavbarStyles.css';
 
import {removeCookie} from '../login/cookie'

const MenuProfile = () => { 
    function onClickLogout() {
        removeCookie('token') 
        
        window.location.href = `http://172.16.210.22/`; 
    }
    function onClickMypage(e){
        e.preventDefault(); 
        
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
