
import React, { useState, useRef, useEffect } from 'react';
import '../../styles/SurveyStyle.css';
import randomColor from 'randomcolor';
import PickAnalyze from './PickAnalyze'
import AprioriAnalyze from './AprioriAnalyze'
import Compare from './Compare'
import Cross from './Cross'

import axios from 'axios';


export default function Analyze({ documentId }) {
  console.log(documentId)

  //sample data for no connection

  const [selectedData, setSelectedData] = useState( 

    {
      "id": 1,
      "questionAnalyzeList": [
          {
              "id": 9,
              "questionTitle": "찬부식",
              "chiAnalyzeList": [
                  {
                      "id": 9,
                      "questionTitle": "객관식",
                      "pvalue": 0.10247043485974942
                  }
              ],
              "compareAnalyzeList": [
                  {
                      "id": 9,
                      "questionTitle": "객관식",
                      "pvalue": 1.0
                  }
              ]
          },
          {
              "id": 10,
              "questionTitle": "객관식",
              "chiAnalyzeList": [
                  {
                      "id": 10,
                      "questionTitle": "찬부식",
                      "pvalue": 1.0
                  }
              ],
              "compareAnalyzeList": [
                  {
                      "id": 10,
                      "questionTitle": "찬부식",
                      "pvalue": 1.0
                  }
              ]
          }
      ],
      "aprioriAnalyzeList": [
          {
              "id": 33,
              "questionTitle": "찬부식",
              "choiceTitle": "true",
              "choiceAnalyzeList": [
                  {
                      "id": 65,
                      "support": 0.667,
                      "questionTitle": "찬부식",
                      "choiceTitle": "짜장"
                  },
                  {
                      "id": 66,
                      "support": 0.333,
                      "questionTitle": "찬부식",
                      "choiceTitle": "짬뽕"
                  }
              ]
          },
          {
              "id": 34,
              "questionTitle": "찬부식",
              "choiceTitle": "false",
              "choiceAnalyzeList": [
                  {
                      "id": 67,
                      "support": 0.667,
                      "questionTitle": "찬부식",
                      "choiceTitle": "짬뽕"
                  },
                  {
                      "id": 68,
                      "support": 0.333,
                      "questionTitle": "찬부식",
                      "choiceTitle": "짜장"
                  }
              ]
          },
          {
              "id": 35,
              "questionTitle": "객관식",
              "choiceTitle": "짜장",
              "choiceAnalyzeList": [
                  {
                      "id": 69,
                      "support": 0.667,
                      "questionTitle": "객관식",
                      "choiceTitle": "true"
                  },
                  {
                      "id": 70,
                      "support": 0.333,
                      "questionTitle": "객관식",
                      "choiceTitle": "false"
                  }
              ]
          },
          {
              "id": 36,
              "questionTitle": "객관식",
              "choiceTitle": "짬뽕",
              "choiceAnalyzeList": [
                  {
                      "id": 71,
                      "support": 0.667,
                      "questionTitle": "객관식",
                      "choiceTitle": "false"
                  },
                  {
                      "id": 72,
                      "support": 0.333,
                      "questionTitle": "객관식",
                      "choiceTitle": "true"
                  }
              ]
          },
          {
              "id": 37,
              "questionTitle": "찬부식",
              "choiceTitle": "true",
              "choiceAnalyzeList": [
                  {
                      "id": 73,
                      "support": 0.667,
                      "questionTitle": "찬부식",
                      "choiceTitle": "짜장"
                  },
                  {
                      "id": 74,
                      "support": 0.333,
                      "questionTitle": "찬부식",
                      "choiceTitle": "짬뽕"
                  }
              ]
          },
          {
              "id": 38,
              "questionTitle": "찬부식",
              "choiceTitle": "false",
              "choiceAnalyzeList": [
                  {
                      "id": 75,
                      "support": 0.667,
                      "questionTitle": "찬부식",
                      "choiceTitle": "짬뽕"
                  },
                  {
                      "id": 76,
                      "support": 0.333,
                      "questionTitle": "찬부식",
                      "choiceTitle": "짜장"
                  }
              ]
          },
          {
              "id": 39,
              "questionTitle": "객관식",
              "choiceTitle": "짜장",
              "choiceAnalyzeList": [
                  {
                      "id": 77,
                      "support": 0.667,
                      "questionTitle": "객관식",
                      "choiceTitle": "true"
                  },
                  {
                      "id": 78,
                      "support": 0.333,
                      "questionTitle": "객관식",
                      "choiceTitle": "false"
                  }
              ]
          },
          {
              "id": 40,
              "questionTitle": "객관식",
              "choiceTitle": "짬뽕",
              "choiceAnalyzeList": [
                  {
                      "id": 79,
                      "support": 0.667,
                      "questionTitle": "객관식",
                      "choiceTitle": "false"
                  },
                  {
                      "id": 80,
                      "support": 0.333,
                      "questionTitle": "객관식",
                      "choiceTitle": "true"
                  }
              ]
          }
      ]
  }
  );   
 
  // function getMe(){
  //   axios.get(`/api/analyze/external/analyze/${documentId}`,{
  //       headers: {
  //       Authorization: cookie,
  //       },
  //   }).then((response) => {//api의 응답을 제대로 받은경우 
  //       //console.log(response);
  //       //console.log(response.data);
  //       setIsLogined((prev) => {
  //       return {
  //       state : true,
  //       img: response.data.profileImg,
  //       name: response.data.nickname,
  //       email: response.data.email,
  //       info: "",
  //       token: cookie
  //       };})});
  //   }



  // useEffect(() => {
  //   async function fetchTestData() {
  //     console.log(`TEST : /api /research/4/${documentId}`)
  //     const response = await axios.get(`/api /research/4/${documentId}/`);
  //     console.log('Response here 4!' + JSON.stringify(response));
  //     console.log(`TEST END : /api /research/4/${documentId}`)
  //     setAprioriData(response);
  //   }
  //   fetchTestData();
  // }, []);

  //document param 없어도 되는지 param
  useEffect(() => {
    async function fetchTestData() {
      try {
        // const response = await axios.get(`/api /research/2/${documentId}`, { timeout: 10000 });
        const response = await axios.get(`/analyze/external/research/analyze/${documentId}`, { timeout: 10000 });
        setSelectedData(response.data);
      } catch (error) {
      }
    }
    fetchTestData();
  }, []);

  // console.log("aprioriData");
  // console.log(aprioriData);
  // console.log(JSON.stringify(aprioriData));

  const button_data = [
    {
      id: 0,
      text: "교차분석",
    },
    {
      id: 1,
      text: "연관분석",
    },
    {
      id: 2,
      text: "비교분석",
    },
  ]
  const selectComponent = [<Cross data={selectedData} />, <AprioriAnalyze data={selectedData} />,<Compare data={selectedData} />  ];
  
  const [content, setContent] = useState(0);
  function onClickAnalyzeIcon(e, id) {
    e.preventDefault();
    setContent((prev) => id);
  }

  console.log(JSON.stringify(selectedData))
  return (
    <div className={'analyzeBox'} >
      <div style={{ height: '20%' }}>
        {button_data.map(data => {
          return (
            <button className={'analyze_button'} onClick={(e) => onClickAnalyzeIcon(e, data.id)} key={data.id} >
              {data.text}
            </button>
          )
        })}
      </div>

      <div className={'analyzeBox'}>
        {selectComponent[content]}
      </div>
    </div>
  );
}
