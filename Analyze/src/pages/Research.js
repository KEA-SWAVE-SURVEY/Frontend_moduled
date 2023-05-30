

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Question from '../components/research//Question';
import Answer from '../components/research/Answer';
import Manage from '../components/research//Manage';
import Analyze from '../components/research/Analyze'; 
import research from '../assets/research.png'
import setting from '../assets/settings.png'
import survey from '../assets/survey.png'
import answer from '../assets/answer.png'

import '../styles/ResearchStyles.css' 

import { useNavigate } from 'react-router-dom';

import html2canvas from "html2canvas";
import saveAs from "file-saver";

 
export default function Research() { 
  const { documentId } = useParams();
  const [content, setContent] = useState(0);
  function onClickResearchIcon(e, id){
    e.preventDefault();
    setContent((prev) => id);
  }
  
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
  
console.log(documentId)
  //문항 응답 관리 분석
  const selectComponent = [<Question documentId = {documentId}/>,<Answer documentId = {documentId}/>,<Manage documentId = {documentId}/>,<Analyze documentId={documentId} />];

  const MAIN_DATA = [
    {
      id: 0,
      text: "문항",
      img: survey,
    },
    {
      id: 1,
      text: "응답",
      img: answer
    },
    {
      id: 2,
      text: "관리",
      img: setting
    },
    {
      id: 3,
      text: "분석",
      img: research,
    }
  ]
  return (
    <div
    ref={divRef}>
      <div className='box-wrap'>
        <div className='button-box'>
          {MAIN_DATA.map(data => {
            return (
              <li>
                <button className={(content===data.id)? "active" : {} } onClick={(e)=>onClickResearchIcon(e,data.id)} key={data.id} >
                  <img className='icon' src={data.img} alt='research' /><br />
                  {data.text}
                </button>
              </li>
            )
          })}

           
        </div>
        <div class='main-box'>
          {selectComponent[content]}
        </div>
      </div>
      <div style={{height:'110vh'}}/>
    </div>
  )
}