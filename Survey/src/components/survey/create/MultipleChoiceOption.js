
import { surveyListState,fontState,fontSizeState } from '../../../contexts/atom';
import { updateSurveyContent } from '../../../utils/updateJSON';
import { useRecoilState,useRecoilValue } from 'recoil';
import {setCookie,getCookie} from '../../../components/login/cookie'


import '../../../styles/SurveyStyle.css';

function MultipleChoiceOption(props) {
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    const font = useRecoilValue(fontState);
    const fontSize = useRecoilValue(fontSizeState);
    const surveyId = props.id;
    const surveyIndex = props.index;

    function onClickDeleteButton(e) {
        e.preventDefault();
        var deletedContent = surveyList.questionRequest[surveyIndex].choiceList.filter((choice) => choice.id !== props.choiceId);
        if (deletedContent.length === 0) deletedContent = "";
        setSurveyList((prev) => {
            let newContent = {
                id : surveyId,
                type : prev.questionRequest[surveyIndex].type,
                title : prev.questionRequest[surveyIndex].title,
                choiceList : deletedContent
            };
            return updateSurveyContent(prev, newContent, surveyIndex);
        });
        console.log(surveyList);
    }

    function onChangeOption(e) {
        e.preventDefault();
        const options = surveyList.questionRequest[surveyIndex].choiceList.map((option) =>{
            if(option.id === props.choiceId){
                return {
                    id : option.id,
                    choiceName : e.target.value
                }
            }else{
                return option;
            }
        });
        setSurveyList((prev) => {
            let newContent = {
                id : surveyId,
                type : prev.questionRequest[surveyIndex].type,
                title : prev.questionRequest[surveyIndex].title,
                choiceList : options
            };
            return updateSurveyContent(prev, newContent, surveyIndex);
        });
        console.log(surveyList);
    };
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
    setCookie('survey',surveyList,{
        path:"/",
        sameSite: "strict",
        expires: expirationTime

      });
    console.log('쿠키 굽는중 객관식')



    return (
        <div className="small_button_container">
            <div className="small_button" onClick={(e) => onClickDeleteButton(e)}>
                <h1>-</h1>
            </div>
            <input placeholder="선택지 내용을 입력해 주세요" value={surveyList.questionRequest[surveyIndex].choiceList[props.choiceIndex].choiceName} className="choice_input" style={{fontSize:fontSize+'vw' ,fontFamily:font}} onChange={(e) => onChangeOption(e)} />
        </div>
    );
};

export default MultipleChoiceOption;