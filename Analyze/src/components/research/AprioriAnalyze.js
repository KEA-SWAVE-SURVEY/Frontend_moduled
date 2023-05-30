import React from 'react';
import '../../styles/SurveyStyle.css';
import { BarChartComponent } from './chart'
import randomColor from 'randomcolor';


export default function AprioriAnalyze({ data }) {

//     console.log(data)
//     return (
// <div>


// </div>

//     );

    const transformedData = data.questionAnalyzeList.reduce((acc, question) => {
        const existingQuestion = acc.find((q) => q.questionTitle === question.questionTitle);
        if (existingQuestion) {
            existingQuestion.answerList.push({
                answerTitle: question.choiceTitle,
                associationList:question.choiceAnalyzeList.map((choice) => ({
                    ...choice,
                    choiceTitle:   `문항 :${choice.questionTitle}  \n\n 응답: ${choice.choiceTitle}`
                })),
            });
        } else {
            acc.push({
                questionTitle: question.questionTitle,
                answerList: [
                    {
                        answerTitle: question.choiceTitle,
                        associationList:  question.choiceAnalyzeList.map((choice) => ({
                            ...choice,
                            choiceTitle: `문항 :${choice.questionTitle}  \n\n 응답: ${choice.choiceTitle}`
                        })),
                    },
                ],
            });
        }
        return acc;
    }, []);


    return (
        <div className={'analyzeBox'} style={{ padding: '0', width: '100%', height: '100%', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', margin: '0' }}>
            {transformedData.map((question) => (
 <div className={'questionContainer'} style={{background:'rgb(255,255,255)', margin:'20px'}}>
      
                        <div className={'questionBox'} >
                            <p style={{margin:'10px'}}> {question.questionTitle}</p>
                        </div>

                        {question.answerList.map((answer) => (
                           <div style={{margin:'10px' ,backgroundColor:'white'}}>
 
                                <p style={{ fontSize: '30px', color:'#1b0278' }}> <b>{answer.answerTitle }</b> 응답을 고른 사람들이 고른 다른 문항의 응답</p>
                             
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center"  }}>
                                    <BarChartComponent data={answer.associationList} />
                                </div>

                            </div>
                        ))}

                    </div>
 

            ))}

        </div>
    );
}
