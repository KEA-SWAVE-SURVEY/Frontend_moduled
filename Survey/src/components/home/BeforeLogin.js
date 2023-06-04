
import BeforeLoginData from '../BeforeLoginData'

import BeforeLoginData2 from '../BeforeLoginData2'
import Card from './Card'
import '../../styles/BeforeLoginStyles.css'
import { useSetRecoilState } from 'recoil'
import surveyphoto from '../../assets/surveyphoto.jpg'
import white from '../../assets/trans.png'
import black from '../../assets/black.jpg'
import research from '../../assets/research.gif'
import gpt from '../../assets/gpt.gif' 
import React, { useEffect, useRef, useState } from "react";
import { navbarItemState, navbarSelectedState } from '../../contexts/selector'
import { HomeItems } from '../../constants/MenuItems'
import Swipers from './Swipers'


import Navbar from '../../components/Navbar';

import html2canvas from "html2canvas";
import saveAs from "file-saver";

const BeforeLogin = (props) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const setNavItem = useSetRecoilState(navbarItemState);
  const setSelected = useSetRecoilState(navbarSelectedState);
 
  const divRef = useRef(null);

  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  function onClickLogin(e) {
    e.preventDefault();
    console.log(process.env);
    window.location.href = `http://172.16.210.22/Login`; 
  }
  const [position, setPosition] = useState(0);

  function onScroll() {
    // console.log(window.scrollY)
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [])

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    setNavItem(HomeItems);

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, [setNavItem]);

  useEffect(() => {
    const middle = props.scrollRef.current[1].getBoundingClientRect().top;
    const bottom = props.scrollRef.current[2].getBoundingClientRect().top;
    if (middle - 1 <= 0 && bottom - 1 <= 0) setSelected(2);
    else if (middle - 1 <= 0) setSelected(1);
    else setSelected(0);
  }, [scrollPosition, props.scrollRef, setSelected]);

  //키우고 글꼴바꾸고

  return (
    <>


      <div className="beforelogin">

      <div ref={element => (props.scrollRef.current[0] = element)}></div>
        <br />
        <br />
        <br />
        <br />




        <div className='beforeMain' >
        <img src={surveyphoto} alt="survey"/>
        <div className='beforeMain-txt'>
        <h1>Wave form</h1>
        <p>Survey, What you want</p>
        <button type="button" onClick={(e) => onClickLogin(e)}>로그인하고 시작하기</button>

        </div>
        </div>
        <br />
        <br />
        <div ref={element => (props.scrollRef.current[0] = element)}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <div ref={element => (props.scrollRef.current[1] = element)}></div>
          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <div className='item-box'>
            <div className='letter-box' style={{ opacity: (position - 900) / 100, }}>
              <BeforeLoginData2
                className="first-bef"
                heading="설문 문항 추천"
                text="#Chat GPT #즉시 생성"
                img1={gpt}
              />


          </div>

        </div>

        <br />
        <br />
        <br />
        <br />
        <div className='letter-box' style={{ opacity: (position - 1700) / 100 }}>
          <div className='item-box'>
            <br />
            <br />
            <br />
            <br />
            <br />

            </div>
            <br />
            <br />
            <br />
            <br />
            <br />

            <br />
            <br />

            <BeforeLoginData2
              className="first-bef-reverse"
              heading="  머신러닝 분석 리포트"
              text="  #키워드를 #한눈에"
              img1={research} />

          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

        <br />
        <br />
        <br />
        <br />

        <div ref={element => (props.scrollRef.current[2] = element)}></div>
        <br />
        <br />
        <br />
        <br />

        <br/>
        <br/>
        <br/>
        <br/>
        <div className='letter-box' style={{ opacity: (position - 2450) / 100 }}>
          <div className='item-box'>
            <div className='card-box'>

              <Swipers/>

          </div>
        </div>

      <button onClick={handleDownload}>다운로드</button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

    </>
  )
}
export default BeforeLogin
