import { useRecoilState, useRecoilValue } from "recoil";

import "../styles/NavbarStyles.css"
import { useNavigate } from "react-router-dom";
import { navbarItemState, navbarSelectedState } from "../contexts/selector";
import { loginState } from "../contexts/atom";

import logo from "../assets/logo.png"


function Navbar(props) {
    const [selected, setSelected] = useRecoilState(navbarSelectedState);
    const [navItem, setNavItem] = useRecoilState(navbarItemState);
    const isLogined = useRecoilValue(loginState);

    const navigate = useNavigate();
    const scrollTo = props.scrollTo;

    function onClickMenu(e, index) {
        e.preventDefault();
        setSelected(index);
        scrollTo(index);
    }

    function onClickTitle(e) {
        e.preventDefault();
        navigate('/');
    }

    function onClickLogin(e){
        e.preventDefault();
        setNavItem((prev)=> []);
        navigate('/login');
    }

    function onClickMypage(e){
        e.preventDefault();
        navigate('/mypage');
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
            {isLogined.state ?(
                <img className="navbar_img" onClick={(e) => onClickMypage(e)} src={isLogined.img} alt='img'/>
            ):(
                <button className="navbar_login" onClick={(e) => onClickLogin(e)}>Login</button>
            )}
        </nav>
    )

}

export default Navbar;