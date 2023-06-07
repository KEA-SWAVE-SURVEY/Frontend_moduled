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
const result = {"id":0,"title":"2313","description":"412112","type":0,"reliability":false,"startDate":"2023-06-01T14:25:54.000Z","endDate":"2023-06-21T14:25:54.000Z","enable":false,"design":{"font":"","fontSize":3,"backColor":"#ffffff"},"questionRequest":[{"id":0,"type":2,"title":"12342141412","choiceList":[{"id":0,"choiceName":""}]}]}

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
const result  = await axios.get(`/api/analyze/external/research/analyze/${documentId}`, { timeout: 10000 });
// survey/external/response/{id}
//06092200 수정완료 설문 응답 csv
const resultCSV  = await axios.get(`/api/answer/external/response/${documentId}`, { timeout: 10000 });


setSurveyList(result);
setCsvList(resultCSV);
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
  setSurveyList(dataToTransport);
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
    id : surveyList.id,
    startDate:firstDate,
    endDate: lastDate,
}

console.log(dataToTransport.startDate <  new Date());
setBlock(dataToTransport.startDate < new Date() ?  true:false);
setCheck(dataToTransport.startDate < new Date()?'공개 중':'비공개 중')
console.log(dataToTransport.startDate < new Date() ?  true:false);
console.log(dataToTransport.startDate < new Date()?'공개 중':'비공개 중')
console.log(dataToTransport);
console.log(new Date());
setSurveyList(dataToTransport);
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
    setProcessData(result)
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

          <button style={{width:'12vw', margin:'10px'}} onClick={toggleBlock}> {check} </button>



        </div>
      </>
      <>
        <div className={'box'} style={{ padding: '0', width: '70vw', height: '25vh', marginTop: '10px' }}>


          <div style={{ height: '100%', margin:'10px'}} >
            <div className={'manageBox'} >
              <p className={'manageFont'} style={{margin:'30px 0px 10px 0px'}}>응답 기간 설정</p>
            </div>
            <div style={{ height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
              <div style={{ width: '50%' }}>
                <p className={'manageMinorFont'} style={{fontSize:'20px'}}> 설문 시작 기간 설정 </p>
                <p></p>
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
                <p className={'manageMinorFont'} style={{fontSize:'20px'}}> 설문 종료 기간 설정</p>
                <p></p>
                <DatePicker
                  selected={lastDate}
                  onChange={date => setLastDate(date)}
                  dateFormat='dd/MM/yyyy'
                  minDate={firstDate}
                  isClearable={false}
                  className={'date'}
                />
              </div>
              <button style={{margin: '10px'}} onClick={() =>  saveDate()}> 설정 저장하기 </button>
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
              style={{ //pass other props, like styles
                // boxShadow:"inset 0px 1px 0px 0px",
                // background:"linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
                // backgroundColor:"#1b0278",
                borderRadius:"6px",
                // border:"1px solid",
                display:"inline-block",
                // cursor:"pointer","color":"#ffffff",
                fontSize:"15px",
                fontWeight:"bold",
                padding:"10px 24px",
                textDecoration:"none",
                // textShadow:"0px 1px 0px #9b14b3",
                margin:"20px"
                }}
                delimiter = ","
            >
              CSV로 저장하기
          </CsvDownloadButton>

        </div>
      </>  <>
        <div className={'box'} style={{ padding: '0', width: '70vw', height: '40vh', marginTop: '10px', marginBottom: '20px', paddingBottom: '20px' }}>


          <div style={{ height: '100%' }} >
            <div className={'manageBox'} style={{ height: '20%' }}>
              <p className={'manageFont'}>설문 공유하기</p>
            </div>
            <div className={'manageBox'} style={{ height: '70%' }}>
              <div style={{ width: '50%' }}>
                <div className={'box'} style={{ width: '50%', height: '50%', margin: '50%', padding: '5px' }} >

                  <p className={'manageFont'} style={{ margin: '20px 20px 20px 20px' }}>응답 페이지 QR</p>
                  <QRCode value={`http://172.16.210.22/Response/${encoded}`} size={'256'} style={{ width: '60%', height: '60%', margin: '2.5% 2.5% 10% 2.5%' }} />
                </div>
              </div>
              <div style={{ width: '50%' }}>
                <p className={'manageMinorFont'}>URL 복사</p>
                <p></p>
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

/*
const ToggleSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));
 */
