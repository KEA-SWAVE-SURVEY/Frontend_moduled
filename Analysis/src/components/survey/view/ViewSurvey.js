import { useRecoilValue } from 'recoil';
import { surveyListState } from '../../../contexts/atom';

import ViewSurveyChoice from './ViewSurveyChoice';
import ViewSureveyQuestion from './ViewSurveyQuestion';
import ViewSurveyMultipleChoice from './ViewSurveyMultipleChoice';

function ViewSurvey(props) {
    const surveyList = useRecoilValue(surveyListState);

    return (
        <>
            <div className="create_survey">
                {
                    surveyList.questionRequest[props.index].type === 0 ? <ViewSureveyQuestion key={props.index} id={props.id} index={props.index} /> :
                        surveyList.questionRequest[props.index].type === 1 ? <ViewSurveyChoice key={props.index} id={props.id} index={props.index} /> :
                            <ViewSurveyMultipleChoice key={props.index} id={props.id} index={props.index} />
                }
            </div>
        </>
    );
}

export default ViewSurvey;