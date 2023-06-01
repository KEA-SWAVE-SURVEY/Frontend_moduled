import { useRecoilState, useRecoilValue } from 'recoil';
import { surveyListState } from '../../../contexts/atom';
import { answerListState } from '../../../contexts/atom';
import { updateAnswerContent } from '../../../utils/updateJSON';

function ViewSureveyQuestion(props) {
    const surveyList = useRecoilValue(surveyListState);
    const [answerList, setAnswerList] = useRecoilState(answerListState);

    function onChangeInput(e) {
        e.preventDefault();
        setAnswerList((prev) => {
            let newContent = {
                id : answerList.questionResponse[props.index].id,
                type: answerList.questionResponse[props.index].type,
                title: answerList.questionResponse[props.index].title,
                answer: e.target.value,
                answerId : answerList.questionResponse[props.index].id
            }
            return updateAnswerContent(prev, newContent, props.index);
        });
    }

    return (
        <div className="problem_container" style={{marginBottom: "30px" }}>
            <h1 style={{ textAlign: "left" }}>{surveyList.questionRequest[props.index].title} </h1>
            <div className="small_button_container" style={{ marginTop: "20px", fontSize: "20px" }}>
                <input placeholder="답변을 입력해 주세요" onChange={(e) => onChangeInput(e)} className='survey_input'></input>
            </div>
        </div>
    );
}

export default ViewSureveyQuestion;