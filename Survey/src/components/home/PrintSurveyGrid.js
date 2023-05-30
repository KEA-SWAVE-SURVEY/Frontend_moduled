import { useState } from 'react';
import '../../styles/HomeStyles.css'
import setting from '../../assets/setting.png'
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { surveyListState, modifyState } from '../../contexts/atom';
import axios from 'axios';

function PrintSurveyGrid(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const setSurveyList = useSetRecoilState(surveyListState)
    const setIsModify = useSetRecoilState(modifyState);
    const navigate = useNavigate();

    const survey = props.survey;

    function onClickGrid(e, id) {
        e.preventDefault();
        const loadSurveys = async()=>{
            const result = await axios.get(`/api/load-survey/${id}`);
            console.log(result)
            setSurveyList((prev) => {
                return {
                    id: result.data.id,
                    title: result.data.title,
                    description: result.data.description,
                    //design : result.data.design,
                    type: result.data.type,
                    questionRequest: result.data.questionList.map((questionList) => {
                        return {
                            id: questionList.id,
                            title: questionList.title,
                            type: questionList.questionType,
                            choiceList: questionList.choiceList.map((choice) => {
                                return {
                                    id: choice.id,
                                    choiceName: choice.title
                                }
                            })
                        }
                    })
                }
            });
            setIsModify((prev) => true);
            navigate('/survey');
        }
        loadSurveys();
    }

    function onClickSettingButton(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen((prev) => { return !prev })
    }

    return (
        <>
            <div className='grid_box' style={{ backgroundImage: `url(${survey.image})` }} onClick={(e) => onClickGrid(e, survey.id)}>
                <ul className='dropdown' style={isDropdownOpen ? { maxHeight: "100vh" } : { maxHeight: "1.5vw" }}>
                    <img className='setting_icon' src={setting} alt="img" onClick={(e) => onClickSettingButton(e)} />
                    {isDropdownOpen && <Dropdown id={survey.id} />}
                </ul>
                <div className='line'>
                    <span style={{ textAlign: "center" }}>{survey.title}</span>
                </div>
            </div>
        </>
    );
}

export default PrintSurveyGrid;