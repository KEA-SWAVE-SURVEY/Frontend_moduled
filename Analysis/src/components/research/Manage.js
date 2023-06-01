import { React, useState } from 'react'
import '../../styles/SurveyStyle.css';


import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';


import { useParams } from 'react-router-dom'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { encode as base64_encode} from 'base-64';

import QRCode from 'qrcode.react';

import CsvDownloadButton from 'react-json-to-csv'


export default function Manage() {


  const { documentId } = useParams();
  const [block, setBlock] = useState(false); //TODO: 서버로부터 받아온걸로 미리 체크설정해두기, toggleBlock에 block 넣기 등

  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const toggleBlock = () => {
    setBlock(!block);
    console.log(block);
  }
  let encoded = base64_encode(documentId)

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

    } catch (error) {
    }
  };

  //TODO : 백과 연동해서 CSV 받아오는 api 설정 후, csv 받아오기

  const csvdata =
  [
    {
      "ID": "1",
      "First Name": "Sarajane",
      "Last Name": "Wheatman",
      "Email": "swheatman0@google.nl",
      "Language": "Zulu",
      "IP Address": "40.98.252.240"
    },
    {
      "ID": "2",
      "First Name": "Linell",
      "Last Name": "Humpherston",
      "Email": "lhumpherston1@google.com.br",
      "Language": "Czech",
      "IP Address": "82.225.151.150"
    },
    {
      "ID": "3",
      "First Name": "Gabie",
      "Last Name": "Casella",
      "Email": "gcasella2@un.org",
      "Language": "Greek",
      "IP Address": "228.48.116.99"
    },
    {
      "ID": "4",
      "First Name": "Chelsie",
      "Last Name": "Shout",
      "Email": "cshout3@php.net",
      "Language": "Persian",
      "IP Address": "81.121.60.176"
    },
    {
      "ID": "5",
      "First Name": "Marlow",
      "Last Name": "Janzen",
      "Email": "mjanzen4@auda.org.au",
      "Language": "New Zealand Sign Language",
      "IP Address": "205.25.250.114"
    },
    {
      "ID": "6",
      "First Name": "Candra",
      "Last Name": "Chelsom",
      "Email": "cchelsom5@cargocollective.com",
      "Language": "Icelandic",
      "IP Address": "158.238.138.112"
    },
    {
      "ID": "7",
      "First Name": "Hal",
      "Last Name": "Elcum",
      "Email": "helcum6@cyberchimps.com",
      "Language": "Quechua",
      "IP Address": "75.95.150.75"
    },
    {
      "ID": "8",
      "First Name": "Fanya",
      "Last Name": "Yateman",
      "Email": "fyateman7@blogs.com",
      "Language": "Georgian",
      "IP Address": "20.159.169.4"
    },
    {
      "ID": "9",
      "First Name": "Regen",
      "Last Name": "Ismirnioglou",
      "Email": "rismirnioglou8@samsung.com",
      "Language": "Bengali",
      "IP Address": "69.221.94.212"
    },
    {
      "ID": "10",
      "First Name": "Veronika",
      "Last Name": "Gaither",
      "Email": "vgaither9@trellian.com",
      "Language": "Persian",
      "IP Address": "200.55.200.251"
    }
  ]
  
;



  return (
    <div >
      <>
        <div className={'box'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0', width: '70vw', height: '10vh', marginTop: '10px' }}>
          <p className={'manageFont'}>공개 여부 설정</p>

          {<ToggleSwitch checked={block} onChange={toggleBlock} />}


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
              <button style={{margin: '20px'}}> 설정 저장하기 </button>
            </div>
          </div>

        </div>
      </>
      <>
        <div className={'box'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0', width: '70vw', height: '10vh', marginTop: '10px' }}>
          <p className={'manageFont'}>설문 결과 내보내기</p>

          <CsvDownloadButton
    data={csvdata}
    filename="good_data.csv"
    style={{ //pass other props, like styles
      boxShadow:"inset 0px 1px 0px 0px #e184f3",
      background:"linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
      backgroundColor:"#c123de",
      borderRadius:"6px",
      border:"1px solid #a511c0",
      display:"inline-block",
      cursor:"pointer","color":"#ffffff",
      fontSize:"15px",
      fontWeight:"bold",
      padding:"6px 24px",
      textDecoration:"none",
      textShadow:"0px 1px 0px #9b14b3"
      }}
      delimiter = ","
  >
    Good Data ✨
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

                  <p className={'manageFont'}>응답 페이지QR 코드</p>
                  <QRCode value={`http://localhost:3000/survey/answer/${encoded}`} size={'256'} style={{ width: '60%', height: '60%', margin: '2.5%' }} />
                </div>
              </div>
              <div style={{ width: '50%' }}>
                <p className={'manageMinorFont'}>URL 복사</p>
                <button onClick={() => handleCopyClipBoard(`http://172.16.210.22:3000/survey/answer/${encoded}`)}>
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

