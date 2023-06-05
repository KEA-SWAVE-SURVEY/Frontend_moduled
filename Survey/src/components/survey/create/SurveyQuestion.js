import { useRecoilState,useRecoilValue } from 'recoil';
import { surveyListState,relState,fontState,fontSizeState } from '../../../contexts/atom';
import { updateSurveyContent } from '../../../utils/updateJSON';
import {setCookie,getCookie} from '../../../components/login/cookie'

import '../../../styles/SurveyStyle.css';
import { fontFamily } from '@mui/system';

function SurveyQuestion(props) {
    const [surveyList, setSurveyList] = useRecoilState(surveyListState);
    const Rel = useRecoilValue(relState);
    const font = useRecoilValue(fontState);
    const fontSize = useRecoilValue(fontSizeState);
    const surveyId = props.id;
    const surveyIndex = props.index;
    const expireDate = new Date()

    
//수정필요 문항 부분이라 삭제해야함 삭제 완!
    function onChangeInput(e) {
        e.preventDefault();
        setSurveyList((prev) => {
            let newContent = {
                id : surveyId,
                type : prev.questionRequest[surveyIndex].type,
                title : e.target.value,
                
                choiceList : []
            };
            return updateSurveyContent(prev, newContent, surveyIndex);
        });
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);
        setCookie('survey',surveyList,{
            path:"/",
            sameSite: "strict",
            expires: expirationTime
    
          }); 
        console.log('쿠키 굽는중 주관식')
        console.log(Rel)
        console.log(font)
        console.log(surveyList);
    }

    return (
        <div className="problem_container">
            
            
            
            <input placeholder="제목을 입력해 주세요" value={surveyList.questionRequest[surveyIndex].title} className='survey_input' style={{fontSize:fontSize+'vw' ,fontFamily:font}}onChange={(e) => onChangeInput(e)}></input>
        </div>
    );
}

export default SurveyQuestion;