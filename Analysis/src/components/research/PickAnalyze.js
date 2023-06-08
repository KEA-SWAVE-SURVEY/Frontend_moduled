import React , {useState, useEffect} from 'react';
import '../../styles/SurveyStyle.css';
import { PieChartComponent } from './chart'
import randomColor from 'randomcolor';  

 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage"; 
// Import the functions you need from the SDKs you need 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvoih7Ruz_SNLaVdtpvtlD1I_yrfNpfWo",
authDomain: "swave-ba582.firebaseapp.com",
projectId: "swave-ba582",
storageBucket: "swave-ba582.appspot.com",
messagingSenderId: "196469817614",
appId: "1:196469817614:web:531d20200d12e6953a175f"
};
try {
    firebase.initializeApp(firebaseConfig)
    } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack)
  }}
  

const storage = firebase.storage();

export default function PickAnalyze({ data }) { 
  console.log(data) 

  
  const [transformedData, setTransformedData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const transformedData = await Promise.all(
      data.questionList.map(async (question) => {
        let temp = '';
        if (question.questionType === 0) {
          try {
            const url = await storage
              .ref(`wordcloud/1/3.jpg`)
              .getDownloadURL();
            temp = url;
            console.log(url);
            console.log(temp);
          } catch (error) {
            console.error(error);
          }
        }
        console.log(temp);
        return {
          isOpen: true,
          question: question.title,
          questionType: question.questionType,
          lists: question.choiceList.map((choice) => ({
            name: choice.title,
            value: choice.count,
            fill: randomColor({ luminosity: 'light', hue: 'random' })
          })),
          test: temp // "test" 속성 추가
        };
      })
    );
    setTransformedData(transformedData);
  };

  fetchData();
}, []);
 
  console.log(JSON.stringify(transformedData))
  console.log(transformedData)
  const toggleQuestion = (index) => {
    setTransformedData((prevData) => {
      const newData = [...prevData];
      newData[index].isOpen = !newData[index].isOpen;
      return newData;
    });
  };
     return (
    <div className={'analyzeBox'} style={{ padding: '0', width: '100%', height: '100%', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', margin: '10' }}>
     <div className={'questionBox'} style={{height:'10vh',  margin: '10px'}}>
      <p style={{ margin: '5px'}}> {data.countAnswer} 명이 응답함 </p>
    </div>
     
     
      {transformedData.map((question, index) => (

        <div className={'questionContainer'} onClick={() => toggleQuestion(index)} style={{ background: 'rgb(255,255,255)', margin: '20px' }}>
          <div className={'questionBox'} style={{height:'11vh'}}>


            {
              question.isOpen === true? (

<div> 
            <p style={{ margin: '10px' }}>{question.question} (열림) 
            
            </p>
            
            </div>

              ) : (


<div> 
            <p style={{ margin: '10px' }}>{question.question} (닫힘) 
            
            </p>
            
            </div>


              )
            } 
 
          </div>  
          <div> 
{question.isOpen === true ? (  <div> {question.questionType === 0 ?
              (

                <div className={'chartBox'} style={{width: '100%', height: '700px' }}>
 <div  style={{ width:'400px', height:'400px', backgroundImage: `url(${question.test})`,backgroundRepeat:'no-repeat', backgroundSize:'cover' ,margin:'auto'} }>


        {/* <ReactWordcloud callbacks ={callbacks} words={question.wordCloudDTOs} options = {{   fontSizes: [25, 50],}}/> */}
      </div>
                  {
                    question.lists.map((answers) => (
                      
                      (<div className={'chartBox'}  style={{ width: '100%', fontSize:'25px', height:'25%' , overflowY:'scroll'}}>

                      <p>{answers.name} </p> 

                    </div>)))

                  }

                </div>
                
              )


              :
              (

                <div style={{ display: "flex", justifyContent: "center", margin: '10px', alignItems: "center" }}>

                  <PieChartComponent data={question.lists} />

                </div>)


            }</div>
  




) : ( <div> </div>) }
 
          </div>

        </div>
      ))}

    </div>
  );
}