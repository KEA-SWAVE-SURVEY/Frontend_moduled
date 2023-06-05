import { useRecoilValue} from 'recoil'
import BeforeLogin from '../components/home/BeforeLogin'
import AfterLogin from '../components/home/AfterLogin'
import { loginState } from '../contexts/atom'
import {getCookie} from '../components/login/cookie'


export default function Home(props) {
  const isLogined = useRecoilValue(loginState);
  //const cookie = getCookie("token");
  
  const cookie = sessionStorage.getItem('token')
  console.log(cookie)
  return (
    <>
      {cookie?<AfterLogin/>:<BeforeLogin scrollRef={props.scrollRef}/>}
    </>
  )
}