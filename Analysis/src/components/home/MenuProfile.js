import React from 'react'
import '../../styles/NavbarStyles.css';
 
import {removeCookie} from '../login/cookie'

const MenuProfile = () => { 
    
   
    const cookie = sessionStorage.getItem('token')
    async function onClickLogout() {
        if(window.confirm("로그아웃 하시겠습니까?")){
            
            sessionStorage.removeItem('token')
            removeCookie('survey')
            window.location.reload()
            window.location.href = `http://172.16.210.22/`;
            console.log(cookie)
        }
        
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
