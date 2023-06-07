import React from 'react';
import '../../styles/SurveyStyle.css';
import { PieChartComponent } from './chart'
import randomColor from 'randomcolor';

// {
//   "id": 1,
//   "title": "설문 테스트",
//   "description": "설문 설명",
//   "questionList": [
//       {
//           "id": 1,
//           "title": "찬부식",
//           "questionType": 1,
//           "choiceList": [
//               {
//                   "id": 1,
//                   "title": "true",
//                   "count": 19
//               },
//               {
//                   "id": 2,
//                   "title": "false",
//                   "count": 1
//               }
//           ]
//       },
//       {
//           "id": 2,
//           "title": "객관식",
//           "questionType": 2,
//           "choiceList": [
//               {
//                   "id": 3,
//                   "title": "짜장",
//                   "count": 19
//               },
//               {
//                   "id": 4,
//                   "title": "짬뽕",
//                   "count": 1
//               }
//           ]
//       },
//       {
//           "id": 3,
//           "title": "주관식",
//           "questionType": 0,
//           "choiceList": [
//               {
//                   "id": 3,
//                   "title": "11111111",
//                   "count": 0
//               },
//               {
//                   "id": 6,
//                   "title": "22222",
//                   "count": 0
//               },
//               {
//                   "id": 9,
//                   "title": "22222",
//                   "count": 0
//               }            ]
//       }
//   ]
// }
export default function Cross({ data }) {
console.log(JSON.stringify(data))


  return (
    <div className={'analyzeBox'} style={{ padding: '0', width: '100%', height: '100%', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', margin: '10' }}>
      {data.questionAnalyzeList.map((question) => (

        <div className={'questionContainer'} style={{ background: 'rgb(255,255,255)', margin: '20px' }}>
          <div className={'questionBox'}><p style={{ margin: '1px' }}>{question.questionTitle}</p></div>
         
          <div  className = {'chartBox'} style={{height:'15vh' , overflowY : 'scroll' , marginTop : '20px'}} > 
            {question.chiAnalyzeList.map((chi) => (
              <div    > 
                  {chi.pvalue < 0.05 ?
                    (
                      <div>
                        <p style={{ fontSize: '25px', color: '#1b0278' }}> <b>{chi.questionTitle}</b> 문항과 교차분석 시 {chi.pvalue.toFixed(3)} 의 Pvalue로 연관성이 어느정도 있습니다.</p>


                      </div>
                    )
                    :
                    (
                      <div>

                        <p style={{ fontSize: '25px', color: '#1b0278' }}> <b>{chi.questionTitle}</b> 문항과 교차분석 시 {chi.pvalue.toFixed(3)} 의 Pvalue로 연관성이 없습니다.</p>


                      </div>
                    )

                  }


 
              </div>


            ))
            }
            </div>
          </div> 
      ))}

    </div>
  );
}
