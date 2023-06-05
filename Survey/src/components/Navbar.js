import { useRecoilState, useRecoilValue } from "recoil";
import axios from 'axios';
import "../styles/NavbarStyles.css" 
import { navbarItemState, navbarSelectedState } from "../contexts/selector";
import { loginState } from "../contexts/atom";

import {getCookie} from './login/cookie' //쿠키 가져옴 1/3

import logo from "../assets/logo.png"
import { useEffect,useState } from "react";


import MenuProfile from "./home/MenuProfile";
//넵바에서 나의 정보를 db에서 읽을 수 있게하기

function Navbar(props) {
    
    const [selected, setSelected] = useRecoilState(navbarSelectedState);
    const [navItem, setNavItem] = useRecoilState(navbarItemState);
    const [isOpen,setIsOpen] = useState(false);
    
    const [isLogined,setIsLogined] = useRecoilState(loginState);
    //const cookie = getCookie("token");//쿠키 가져옴 2/3
    const cookie = sessionStorage.getItem('token')
    const scrollTo = props.scrollTo;

    const handleMouseOver = () => {
        setIsOpen(true);
      };
    
      const handleMouseOut = () => {
        setTimeout(function(){setIsOpen(false)},3000);
      };

    function onClickMenu(e, index) {
        e.preventDefault();
        setSelected(index);
        scrollTo(index);
    }

    function onClickTitle(e) {
        e.preventDefault(); 
        window.location.href = `http://172.16.210.22/`; 
    }

    function onClickLogin(e){
        e.preventDefault();
        setNavItem((prev)=> []); 
        
        window.location.href = `http://172.16.210.22/login`; 
    }

    function onClickMypage(e){
        e.preventDefault(); 
        
        window.location.href = `http://172.16.210.22/mypage`; 
    }
    useEffect(()=>{
        if(cookie){
            GetMe()
            console.log("여기11")
        }
    },[])
    
    function GetMe(){
        axios.get('/user/external/me',{
            headers: {
            Authorization: cookie,
            },
        }).then((response) => {//api의 응답을 제대로 받은경우 
            //console.log(response);
            //console.log(response.data);
            setIsLogined((prev) => {
            return {
            state : true,
            img: response.data.profileImg,
            name: response.data.nickname,
            email: response.data.email,
            info: "",
            token: cookie
            };})});
        }
    
       

    return (
        <nav className="NavbarItems">
            
            <img src={logo} alt="logo" className="Navbar-logo" onClick={(e) => onClickTitle(e)}/>

            <ul className={selected ? "nav-menu active" : "nav-menu"}>
                {navItem.map((item, index) => {
                    return (
                        <li key={index} className={selected === index ? 'nav-links-active' : item.cName} onClick={(e) => onClickMenu(e, index)}>
                            {item.title}
                        </li>
                    )
                })}

            </ul>
            {cookie ?(
            
                <img className="navbar_img" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} src={isLogined.img} alt='img' />
                  
            ):(
                <button className="navbar_login" onClick={(e) => onClickLogin(e)}>Login</button>
            )}
            {
                isOpen && (
                    <MenuProfile/>
                )
            }
        </nav>
    )

}

export default Navbar;