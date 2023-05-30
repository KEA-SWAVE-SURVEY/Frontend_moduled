import { Button, Grid } from '@mui/material'
import React from 'react'
import { signin, SocialLogin } from "../utils/socialLogin"
import { useNavigate } from 'react-router-dom'
import AuthWrapper from "../components/login/AuthWrapper"
import kakao from '../assets/kakao2.png'
import google2 from '../assets/google3.png'
import github from '../assets/github.png'
import '../styles/LoginStyle.css'
import { useSetRecoilState } from 'recoil'
import { loginState } from '../contexts/atom'
import logo from '../assets/black.jpg'

export default function Login() {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_HOST;
  const setIsLogined = useSetRecoilState(loginState);
  const REACT_APP_REST_API_KEY="4646a32b25c060e42407ceb8c13ef14a";
  const KAKAO_REST_API_KEY = "4646a32b25c060e42407ceb8c13ef14a";
  const KAKAO_REDIRECT_URI = host + "/oauth/callback/kakao";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const goolge_client_id = "278703087355-limdvm0almc07ldn934on122iorpfdv5.apps.googleusercontent.com"; // Google API Console에서 발급한 클라이언트 ID를 입력
  const goolge_redirect_uri = host + "/oauth/callback/google"; // 등록한 리다이렉트 URI를 입력
  const goolge_response_type = "code";
  const goolge_scope = "openid profile email";
  const GOOGLE_AUTH_URI=`https://accounts.google.com/o/oauth2/auth?client_id=${goolge_client_id}&redirect_uri=${goolge_redirect_uri}&response_type=${goolge_response_type}&scope=${goolge_scope}`;

  const git_provider = "git"; // 로그인한 플랫폼에 따라 변경
  const git_client_id = "Iv1.986aaa4d78140fb7"; // Git API Console에서 발급한 클라이언트 ID를 입력
  const git_redirect_uri = host + "/oauth/callback/git"; // 등록한 리다이렉트 URI를 입력
  const git_response_type = "code";
  const git_scope = "openid profile email";
  const GIT_AUTH_URI=`https://github.com/login/oauth/authorize?client_id=${git_client_id}&redirect_uri=${git_redirect_uri}&response_type=${git_response_type}&scope=${git_scope}`;
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
  return (
    <div style={{width:"100%", height:"100%"}}>
      <AuthWrapper className='login_content'>
        <div className='login_content'>
          <Grid item xs={12}>
            <Button href={KAKAO_AUTH_URI} className='login_button' variant="contained" style={{ backgroundColor: '#fee500' }} size='large'>
              <img src={kakao} alt='kakao' />
              <div className='logosb'>Login with Kakao</div>
            </Button>
          </Grid>
        </div>
        <div className='login_content'>
          <Grid item xs={12}>
            <Button href={GOOGLE_AUTH_URI} className='login_button' variant="contained" style={{ backgroundColor: '#ffffff' }} size='large'>
              <img src={google2} alt='google' />
              <div className='logosb'> Login with Google</div>
            </Button>
          </Grid>
        </div>
        <div className='login_content'>
          <Grid item xs={12}>
            <Button href={GIT_AUTH_URI} className='login_button' variant="contained" style={{ backgroundColor: '#000000' }} size='large'>
              <img src={github} alt='naver' />
              <div className='logos'> Login with Github</div>
            </Button>
          </Grid>
        </div>
      </AuthWrapper>
    </div>
  )
}