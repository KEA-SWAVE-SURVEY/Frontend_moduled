import { React, useState } from 'react'
import '../../styles/SurveyStyle.css';

import { useRecoilState, useRecoilValue } from 'recoil';
import { surveyListState, answerListState, loginState, modifyState,fontState, fontSizeState,backColorState } from '../../contexts/atom';



import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { encode as base64_encode} from 'base-64';

import QRCode from 'qrcode.react';

import CsvDownloadButton from 'react-json-to-csv'


import { useEffect } from "react";
import axios from 'axios';
export default function Manage() {

  const [surveyList, setSurveyList] = useState(null);
  const [csvList, setCsvList] = useState(null);
  const [answerList, setAnswerList] = useState(null);


  const { documentId } = useParams();
  const [block, setBlock] = useState(0); //TO완료DO: 서버로부터 받아온걸로 미리 체크설정해두기, toggleBlock에 block 넣기 등
  const [check,setCheck] = useState('비공개 중')



const [firstDate, setFirstDate] = useState(null);
const [lastDate, setLastDate] = useState(null);
 
const isLogined = useRecoilValue(loginState);


//로드가 몇개가 있어야할까 서베이로 싹다 긁어올 수 있나?
//코드는 서베이로만
//http://localhost:8080/api/ survey-participate/${id}

useEffect(() => {
  if (surveyList !== null) {
    console.log(surveyList);
    console.log(JSON.stringify(surveyList));
    console.log(new Date(surveyList.endDate));
    console.log(surveyList.startDate);
    setFirstDate(new Date(surveyList.startDate));
    setLastDate(new Date(surveyList.endDate));
    setBlock(surveyList.enable);
    console.log(surveyList.enable);
    console.log(block);

    setCheck(block===true?'공개 중':'비공개 중')
  }
}, [surveyList]);
const loadSurveyData = async () => {
  // const result = {

  //     id: 10,
  //     startDate: "2023-06-01T14:25:54.000Z",
  //     endDate: "2023-06-21T14:25:54.000Z",
  //     enable: false,

  // };
  //06092200 수정완료 설문상세분석 조회
const result  = await axios.get(`/api/document/external/manage/${documentId}`, { timeout: 10000 });
// survey/external/response/{id}
//06092200 수정완료 설문 응답 csv
const resultCSV  = await axios.get(`/api/answer/external/response/${documentId}`, { timeout: 10000 });


setSurveyList(result.data); 
setCsvList(resultCSV.data);
}; 
 
useEffect(() => {
  loadSurveyData();
}, []);


 
// 블록버튼 누르기
const toggleBlock = () => {

  const cblock = block===true? false:true;
  console.log(cblock);
  setCheck(prev=>prev==='비공개 중'?'공개 중':'비공개 중');
    setBlock(cblock);
    const dataToTransport = {
      // id : surveyList.id,
      enable : cblock,
  }
  
  const dataToSync = {
    // id : surveyList.id,
    ...surveyList,
    enable : cblock,
}
  setSurveyList(dataToSync);
  axios.patch(`/api/document/external/manage/enable/${documentId}`, dataToTransport,
    {
        headers: {
            'Application-Type': 'application/json',
            'Authorization': isLogined.token
        }
    }
)

console.log(block);
  }



// 날짜 설정버튼 누르기
const saveDate = () => {

  const dataToTransport = { 
    startDate:firstDate,
    endDate: lastDate,
}

const dataToSync = {
  // id : surveyList.id,
  ...surveyList,
  startDate:firstDate,
  endDate: lastDate,
  enable: dataToTransport.startDate < new Date() ?  true:false 
} 
console.log(dataToTransport.startDate <  new Date());
setBlock(dataToTransport.startDate < new Date() ?  true:false);
setCheck(dataToTransport.startDate < new Date()?'공개 중':'비공개 중')
console.log(dataToTransport.startDate < new Date() ?  true:false);
console.log(dataToTransport.startDate < new Date()?'공개 중':'비공개 중')
console.log(dataToTransport);
console.log(new Date());
setSurveyList(dataToSync);
axios.patch(`/api/document/external/manage/date/${documentId}`, dataToTransport,
{
    headers: {
        'Application-Type': 'application/json',
        'Authorization': isLogined.token
    }
}
)
}


  let encoded = base64_encode(documentId)

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      function myFunction() {
        var copyText = document.getElementById("myInput");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard
          .writeText(copyText.value)
          .then(() => {
            alert("successfully copied");
          })
          .catch(() => {
            alert("something went wrong");
          });
    }
    } catch (error) {
    }
  };


  const tempdata =[
    {
        "id":"1",
        "type":0,
        "title":"설문제목",
        "description":"설문설명",
        "questionAnswersList":[
            {
                "id":"1",
                "title":"객관식",
                "questionType":2,
                "CheckAnswer":"짜장",
                "checkAnswerId":1
            },
            {
                "id":"2",
                "title":"찬부식",
                "questionType":1,
                "CheckAnswer":"false",
                "checkAnswerId":1
            },
        ]
    },
    {
        "id":"2",
        "type":0,
        "title":"설문제목",
        "description":"설문설명",
        "questionAnswersList":[
            {
                "id":"1",
                "title":"객관식",
                "questionType":2,
                "CheckAnswer":"짜장",
                "checkAnswerId":1
            },
            {
                "id":"2",
                "title":"찬부식",
                "questionType":1,
                "CheckAnswer":"true",
                "checkAnswerId":1
            },
        ]
    }
];


// const csvdata = tata.map((item) => {
//   const question = item.questionAnswersList.map((temp) => ({
//     [temp.title]: temp.CheckAnswer
//   }));

  // return {
  //   ...Object.assign({}, ...question),
  //   id: item.id
  // };
// });
  const [processData,setProcessData] = useState(tempdata);
//수정 여기 머지? //06092200 수정완료
  const loadSurveys = async()=>{
    const result = await axios.get(`/api/answer/external/response/${documentId}`);
    setProcessData(result.data);
  }

const csvdata = processData.map((item) => {
  const question = item.questionAnswersList.map((temp) => ({
    [temp.title]: temp.CheckAnswer
  }));

  return {
    ...Object.assign({}, ...question),
    id: item.id
  };
});



console.log(csvdata)
  //TO완료DO 백과 연동해서 CSV 받아오는 api 설정 후, csv 받아오기



  return (
    <div >
      <>
      {/* <p> s </p>
      {block}
            {JSON.stringify(surveyList)} */}
        <div className={'box'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0', width: '70vw', height: '10vh', marginTop: '10px' }}>
          <p className={'manageFont'}>공개 여부 설정</p>

          <button style={{width:'12vw'}} onClick={toggleBlock}> {check} </button>



        </div>
      </>
      <>
        <div className={'box'} style={{ padding: '0', width: '70vw', height: '20vh', marginTop: '10px' }}>


          <div style={{ height: '100%' }} >
            <div className={'manageBox'} >
              <p className={'manageFont'}>응답 기간 설정</p>
            </div>
            <div style={{ height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
              <div style={{ width: '50%' }}>
                <p className={'manageMinorFont'}> 설문 시작 기간 설정 </p>
                <DatePicker
                  selected={firstDate}
                  onChange={date => setFirstDate(date)}
                  dateFormat='dd/MM/yyyy'
                  maxDate={lastDate}
                  isClearable={false}
                  className={'date'}
                />
              </div>
              <div style={{ width: '50%' }}>
                <p className={'manageMinorFont'}> 설문 종료 기간 설정</p>
                <DatePicker
                  selected={lastDate}
                  onChange={date => setLastDate(date)}
                  dateFormat='dd/MM/yyyy'
                  minDate={firstDate}
                  isClearable={false}
                  className={'date'}
                />
              </div>
              <button style={{margin: '20px'}} onClick={() =>  saveDate()}> 설정 저장하기 </button>
            </div>
          </div>

        </div>
      </>
      <>
        <div className={'box'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0', width: '70vw', height: '10vh', marginTop: '10px' }}>
          <p className={'manageFont'}>설문 결과 내보내기</p>

          <CsvDownloadButton
    data={csvList}
    filename="good_data.csv" 
      delimiter = ","
  >
    CSV로 저장하기
  </CsvDownloadButton>

        </div>
      </>  <>
        <div className={'box'} style={{ padding: '0', width: '70vw', height: '40vh', marginTop: '10px' }}>


          <div style={{ height: '100%' }} >
            <div className={'manageBox'} style={{ height: '20%' }}>
              <p className={'manageFont'}>설문 공유하기</p>
            </div>
            <div className={'manageBox'} style={{ height: '70%' }}>
              <div style={{ width: '50%' }}>
                <div className={'box'} style={{ width: '50%', height: '50%', margin: '30%' }} >

                  <p className={'manageFont'}>응답 페이지 QR</p>
                  <QRCode value={`http://172.16.210.22/Response/${encoded}`} size={'256'} style={{ width: '60%', height: '60%', margin: '2.5%' }} />
                </div>
              </div>
              <div style={{ width: '50%' }}>
                <p className={'manageMinorFont'}>URL 복사</p>
                <button onClick={() => handleCopyClipBoard(`http://172.16.210.22/Response/${encoded}`)}>
                  URL 복사하기
                </button>
                <div style={{ width: '100%', height: '4vh' }} />
              </div>
            </div>
          </div>

        </div>
      </>

    </div>
  )
}