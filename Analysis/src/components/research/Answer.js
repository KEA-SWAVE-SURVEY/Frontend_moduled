import React,  {useState, useEffect} from 'react';
import '../../styles/SurveyStyle.css';  
import randomColor from 'randomcolor';
import PickAnalyze from './PickAnalyze'
import axios from 'axios';
 


export default function Research2({ documentId }) {
 
  //sample data for no connection
  
const [data , setData] = useState({
  "id": 1,
  "title": "설문 테스트",
  "description": "설문 설명",
  "questionList": [
      {
          "id": 1,
          "title": "찬부식",
          "questionType": 1,
          "choiceList": [
              {
                  "id": 1,
                  "title": "true",
                  "count": 5
              },
              {
                  "id": 2,
                  "title": "false",
                  "count": 1
              }
          ],
          "wordCloudDtos": []
      },
      {
          "id": 2,
          "title": "객관식",
          "questionType": 2,
          "choiceList": [
              {
                  "id": 3,
                  "title": "짜장",
                  "count": 4
              },
              {
                  "id": 4,
                  "title": "짬뽕",
                  "count": 2
              }
          ],
          "wordCloudDtos": []
      },
      {
          "id": 3,
          "title": "주관식",
          "questionType": 0,
          "choiceList": [
              {
                  "id": 3,
                  "title": "주관식 답변입니다ㅏㅏㅏㅏ",
                  "count": 0
              },
              {
                  "id": 6,
                  "title": "11111111",
                  "count": 0
              },
              {
                  "id": 9,
                  "title": "11111111",
                  "count": 0
              },
              {
                  "id": 12,
                  "title": "11111111",
                  "count": 0
              },
              {
                  "id": 15,
                  "title": "11111111",
                  "count": 0
              },
              {
                  "id": 18,
                  "title": "11111111",
                  "count": 0
              }
          ],
          "wordCloudDtos": [
              {
                  "id": 1,
                  "title": "11111111",
                  "count": 5
              },
              {
                  "id": 2,
                  "title": "주관식",
                  "count": 1
              },
              {
                  "id": 3,
                  "title": "답변입니다ㅏㅏㅏㅏ",
                  "count": 1
              }
          ]
      }
  ]
}); 

  useEffect(() => {
    //answer에 useparam없어도 되는지
    async function fetchTestData() {
    //   console.log(`TEST : /api /research/2/${documentId}`)
      try {
        // const response = await axios.get(`/api/research/2/${documentId}`, { timeout: 10000 });
        const response = await axios.get(`/analyze/external/research/survey/load/${documentId}`, { timeout: 10000 });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTestData();
  }, []);
  
 
   
   
  return ( 
      <div  className={'analyzeBox'} style={{padding:'0',width:'70vw', height:'70vh', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <PickAnalyze data={data}/>      
      </div>  
  );
}
