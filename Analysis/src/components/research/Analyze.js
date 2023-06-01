
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
              "id": 31,
              "questionTitle": "찬부식",
              "chiAnalyzeList": [
                  {
                      "id": 11,
                      "questionTitle": "저녁추천",
                      "pvalue": 0.01
                  },
                  {
                    "id": 11,
                    "questionTitle": "점심추천",
                    "pvalue": 0.10247043485974942
                }
                ,  {
                  "id": 11,
                  "questionTitle": "아침추천",
                  "pvalue": 0.10247043485974942
              },  {
                "id": 11,
                "questionTitle": "운동 여부",
                "pvalue": 0.10247043485974942
            },  {
              "id": 11,
              "questionTitle": "객관식",
              "pvalue": 0.10247043485974942
          }
              ],
              "compareAnalyzeList": [
                  {
                      "id": 41,
                      "questionTitle": "객관식",
                      "pvalue": 1.0
                  }
              ],
              "aprioriAnalyzeList": [
                  {
                      "id": 105,
                      "questionTitle": "찬부식",
                      "choiceTitle": "true",
                      "choiceAnalyzeList": [
                          {
                              "id": 209,
                              "support": 0.667,
                              "questionTitle": "객관식",
                              "choiceTitle": "짜장"
                          },
                          {
                              "id": 210,
                              "support": 0.333,
                              "questionTitle": "객관식",
                              "choiceTitle": "짬뽕"
                          }
                      ]
                  },
                  {
                      "id": 106,
                      "questionTitle": "찬부식",
                      "choiceTitle": "false",
                      "choiceAnalyzeList": [
                          {
                              "id": 211,
                              "support": 0.667,
                              "questionTitle": "객관식",
                              "choiceTitle": "짬뽕"
                          },
                          {
                              "id": 212,
                              "support": 0.333,
                              "questionTitle": "객관식",
                              "choiceTitle": "짜장"
                          }
                      ]
                  },
                  {
                      "id": 107,
                      "questionTitle": "객관식",
                      "choiceTitle": "짜장",
                      "choiceAnalyzeList": [
                          {
                              "id": 213,
                              "support": 0.667,
                              "questionTitle": "찬부식",
                              "choiceTitle": "true"
                          },
                          {
                              "id": 214,
                              "support": 0.333,
                              "questionTitle": "찬부식",
                              "choiceTitle": "false"
                          }
                      ]
                  },
                  {
                      "id": 108,
                      "questionTitle": "객관식",
                      "choiceTitle": "짬뽕",
                      "choiceAnalyzeList": [
                          {
                              "id": 215,
                              "support": 0.667,
                              "questionTitle": "찬부식",
                              "choiceTitle": "false"
                          },
                          {
                              "id": 216,
                              "support": 0.333,
                              "questionTitle": "찬부식",
                              "choiceTitle": "true"
                          }
                      ]
                  }
              ]
          },
          {
              "id": 32,
              "questionTitle": "객관식",
              "chiAnalyzeList": [
                  {
                      "id": 12,
                      "questionTitle": "찬부식",
                      "pvalue": 1.0
                  }
              ],
              "compareAnalyzeList": [
                  {
                      "id": 42,
                      "questionTitle": "찬부식",
                      "pvalue": 1.0
                  }
              ],
              "aprioriAnalyzeList": [
                  {
                      "id": 109,
                      "questionTitle": "찬부식",
                      "choiceTitle": "true",
                      "choiceAnalyzeList": [
                          {
                              "id": 217,
                              "support": 0.667,
                              "questionTitle": "객관식",
                              "choiceTitle": "짜장"
                          },
                          {
                              "id": 218,
                              "support": 0.333,
                              "questionTitle": "객관식",
                              "choiceTitle": "짬뽕"
                          }
                      ]
                  },
                  {
                      "id": 110,
                      "questionTitle": "찬부식",
                      "choiceTitle": "false",
                      "choiceAnalyzeList": [
                          {
                              "id": 219,
                              "support": 0.667,
                              "questionTitle": "객관식",
                              "choiceTitle": "짬뽕"
                          },
                          {
                              "id": 220,
                              "support": 0.333,
                              "questionTitle": "객관식",
                              "choiceTitle": "짜장"
                          }
                      ]
                  },
                  {
                      "id": 111,
                      "questionTitle": "객관식",
                      "choiceTitle": "짜장",
                      "choiceAnalyzeList": [
                          {
                              "id": 221,
                              "support": 0.667,
                              "questionTitle": "찬부식",
                              "choiceTitle": "true"
                          },
                          {
                              "id": 222,
                              "support": 0.333,
                              "questionTitle": "찬부식",
                              "choiceTitle": "false"
                          }
                      ]
                  },
                  {
                      "id": 112,
                      "questionTitle": "객관식",
                      "choiceTitle": "짬뽕",
                      "choiceAnalyzeList": [
                          {
                              "id": 223,
                              "support": 0.667,
                              "questionTitle": "찬부식",
                              "choiceTitle": "false"
                          },
                          {
                              "id": 224,
                              "support": 0.333,
                              "questionTitle": "찬부식",
                              "choiceTitle": "true"
                          }
                      ]
                  }
              ]
          }
      ]
  }
  );   
  const [aprioriData , setAprioriData] = useState(
    {
      "data":{
      "id":1,
      "questionAnalyzeList":[
      {
      "id":183,
      "questionTitle":"성별은?",
      "choiceTitle":"여성",
      "choiceAnalyzeList":[
      {
      "id":462,
      "support":0.8142857142857143,
      "questionTitle":"좋아하는 음식은?",
      "choiceTitle":"짜장"
      },
      {
      "id":463,
      "support":0.7142857142857143,
      "questionTitle":"좋나요? 싫나요?",
      "choiceTitle":"싫음"
      },
      {
      "id":464,
      "support":0.2857142857142857,
      "questionTitle":"좋나요? 싫나요?",
      "choiceTitle":"좋음"
      }
      ]
      },
      {
      "id":184,
      "questionTitle":"성별은?",
      "choiceTitle":"남성",
      "choiceAnalyzeList":[
      {
      "id":465,
      "support":0.9411764705882353,
      "questionTitle":"좋아하는 음식은?",
      "choiceTitle":"짬뽕"
      },
      {
      "id":466,
      "support":0.6470588235294118,
      "questionTitle":"싫나요?",
      "choiceTitle":"좋음"
      },
      {
      "id":467,
      "support":0.35294117647058826,
      "questionTitle":"좋나요?",
      "choiceTitle":"싫음"
      }
      ]
      },
      {
      "id":185,
      "questionTitle":"좋아하는 음식은?",
      "choiceTitle":"짜장",
      "choiceAnalyzeList":[
      {
      "id":468,
      "support":0.9827586206896551,
      "questionTitle":"성별은?",
      "choiceTitle":"여성"
      },
      {
      "id":469,
      "support":0.8275862068965517,
      "questionTitle":" 싫나요?",
      "choiceTitle":"싫음"
      }
      ]
      },
      {
      "id":186,
      "questionTitle":"좋아하는 음식은?",
      "choiceTitle":"짬뽕",
      "choiceAnalyzeList":[
      {
      "id":470,
      "support":0.7241379310344828,
      "questionTitle":" 싫나요?",
      "choiceTitle":"좋음"
      },
      {
      "id":471,
      "support":0.5517241379310345,
      "questionTitle":"성별은?",
      "choiceTitle":"남성"
      },
      {
      "id":472,
      "support":0.4482758620689655,
      "questionTitle":"성별은?",
      "choiceTitle":"여성"
      }
      ]
      },
      {
      "id":187,
      "questionTitle":" 싫나요?",
      "choiceTitle":"좋음",
      "choiceAnalyzeList":[
      {
      "id":473,
      "support":0.6774193548387096,
      "questionTitle":"좋아하는 음식은?",
      "choiceTitle":"짬뽕"
      },
      {
      "id":474,
      "support":0.6451612903225806,
      "questionTitle":"성별은?",
      "choiceTitle":"여성"
      },
      {
      "id":475,
      "support":0.3548387096774194,
      "questionTitle":"성별은?",
      "choiceTitle":"남성"
      }
      ]
      },
      {
      "id":188,
      "questionTitle":"좋나요?",
      "choiceTitle":"싫음",
      "choiceAnalyzeList":[
      {
      "id":476,
      "support":0.8928571428571429,
      "questionTitle":"성별은?",
      "choiceTitle":"여성"
      },
      {
      "id":477,
      "support":0.8571428571428571,
      "questionTitle":"좋아하는 음식은?",
      "choiceTitle":"짜장"
      }
      ]
      }
      ]
      }
      }
  );
  // sample  data for no connection 

  const [data, setData] = useState({
    "id": 1,
    "title": "설문 테스트",
    "description": "테스트 입니다.",
    "questionList": [
      {
        "id": 1,
        "title": "성별은?",
        "questionType": 2,
        "choiceList": [
          {
            "id": 1,
            "title": "남성",
            "count": 1555
          },
          {
            "id": 2,
            "title": "여성",
            "count": 10
          }
        ]
      }
    ]
  });


  // useEffect(() => {
  //   async function fetchTestData() {
  //     console.log(`TEST : /api/research/4/${documentId}`)
  //     const response = await axios.get(`/api/research/4/${documentId}/`);
  //     console.log('Response here 4!' + JSON.stringify(response));
  //     console.log(`TEST END : /api/research/4/${documentId}`)
  //     setAprioriData(response);
  //   }
  //   fetchTestData();
  // }, []);


  useEffect(() => {
    async function fetchTestData() {
      try {
        const response = await axios.get(`/api/research/2/${documentId}`, { timeout: 10000 });
        setData(response.data);
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
  const selectComponent = [<Cross data={selectedData} />, <AprioriAnalyze data={aprioriData.data} />,<Compare data={selectedData} />  ];

  const [content, setContent] = useState(0);
  function onClickAnalyzeIcon(e, id) {
    e.preventDefault();
    setContent((prev) => id);
  }

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
