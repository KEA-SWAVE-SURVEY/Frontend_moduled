import { useRecoilValue} from 'recoil'
import BeforeLogin from '../components/home/BeforeLogin'
import AfterLogin from '../components/home/AfterLogin'
import { loginState } from '../contexts/atom'


export default function Home(props) {
  const isLogined = useRecoilValue(loginState);

  return (
    <>
      {isLogined.state?<AfterLogin/>:<BeforeLogin scrollRef={props.scrollRef}/>}
    </>
  )
}