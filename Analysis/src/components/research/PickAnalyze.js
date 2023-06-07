import React , {useState} from 'react';
import '../../styles/SurveyStyle.css';
import { PieChartComponent } from './chart'
import randomColor from 'randomcolor';  


//import ReactDOM from "react-dom";
//import ReactWordcloud from "react-wordcloud";
//import "d3-transition";
//import { select } from "d3-selection";

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
export default function PickAnalyze({ data }) { 
  console.log(data)
/* 
  function getCallback(callback) {
    return function (word, event) {
      const isActive = callback !== "onWordMouseOut";
      const element = event.target;
      const text = select(element);
      text
        .transition()
        .attr("background", "white") 
        .attr("text-decoration", isActive ? "underline" : "none");
    };
  }
  
  const callbacks = {
    getWordColor: (word) => (word.value > 2 ? "orange" : "purple"),
    getWordTooltip: (word) =>
      `단어 중, "${word.text}" 단어가 ${word.value} 번 보였습니다.`,
    onWordClick: getCallback("onWordClick"),
    onWordMouseOut: getCallback("onWordMouseOut"),
    onWordMouseOver: getCallback("onWordMouseOver")
  };
 */
  
  const [transformedData, setTransformedData] = useState(data.questionList.map((question) => ({
    
    isOpen : true,
    question: question.title,
    questionType: question.questionType,
    
    wordCloudDTOs :question.wordCloudDtos.map((words) => ({
    
text: words.title,
value:  words.count 

    })), 
    lists: question.choiceList.map((choice) => ({
      name: choice.title,
      value: choice.count,

      fill: randomColor({ luminosity: 'liight', hue: 'random' })
    })),

    
  }))
  );
  const toggleQuestion = (index) => {
    setTransformedData((prevData) => {
      const newData = [...prevData];
      newData[index].isOpen = !newData[index].isOpen;
      return newData;
    });
  };
  console.log(typeof(transformedData[2].wordCloudDTOs[0].value) + " " + transformedData[2].wordCloudDTOs[0].value+" " + (transformedData[2].wordCloudDTOs[0].value + transformedData[2].wordCloudDTOs[0].value))
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

                <div className={'chartBox'} style={{ height:'350px' , margin: '10px', overflowY:'scroll'}}>

<div style={{ height: 400, width: '60%', fontSize:'10px' }}>
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
