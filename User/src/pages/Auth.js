import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from 'recoil'
import { loginState } from '../contexts/atom'
import logo from '../assets/white.png'

import {setCookie} from '../components/login/cookie'
//auth에서 정보를 뿌릴까?
const Auth = () => {
  const navigate = useNavigate();
  const [isLogined,setIsLogined] = useRecoilState(loginState);
  
  
  console.log("sdafafsadfsads");
  const id=useParams();
  const provider=id.provider;
  
  useEffect(() => {
    (async () => {
      
      const pathname = window.location.search;
      const code = pathname.split('=')[1];
      
      console.log(code);
      //url의 인가코드
      try {
        console.log(`/api/oauth/token?code=${code}&provider=${provider}`)
        const res = await axios.post(`/api/oauth/token?code=${code}&provider=${provider}`);
        //인가코드를 백엔드로 보내고 헤더에서 엑세스 토큰 받아옴
        const token = res.headers.authorization;
        
        //로컬스토리지에 저장
        setCookie('token',token,{
          path:"/",
          sameSite: "strict",

        });

        

        setIsLogined((prev) => {
          return {
          state : true,
          img: logo,
          name: "테스트",
          email: "1223ndj@gachon.ac.kr",
          info: "",
          token: String(token)
          };
        });

          navigate('/');
          try {
                axios.get('/api/me',{
                  headers: {
                    Authorization: token,
                  },
                }).then((response) => {//api의 응답을 제대로 받은경우 
                  console.log(response);
                  console.log(response.data);
                  setIsLogined((prev) => {
                    return {
                    state : true,
                    img: response.data.profileImg,
                    name: response.data.nickname,
                    email: response.data.email,
                    info: "",
                    token: String(token)
                    };
                  });
                  
              });
              } catch (e) {
                console.log('여기')
                console.error(e);
              }
  }

       catch (e) {
        console.log('실패 ㅠㅜ')
        console.error(e);
        navigate('/');
      }
    })();
  }, []);
  // const token = window.localStorage.getItem('token');
  // function onClickButton(){
  //   try {
  //     axios.get('/api/me',{
  //       headers: {
  //         Authorization: token,
  //       },
  //     }).then((response) => {//api의 응답을 제대로 받은경우 
  //       console.log('dr');
  //   });
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   // try {
  //   //   axios.post('/api/post',data,{
  //   //     headers: {
  //   //       Authorization: token,
  //   //     },
  //   //   }).then((response) => {//api의 응답을 제대로 받은경우 
  //   //     console.log('dr');
  //   // });
  //   // } catch (e) {
  //   //   console.error(e);
  //   // }
  // }

};

export default Auth;