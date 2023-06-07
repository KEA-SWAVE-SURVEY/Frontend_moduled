import { useState } from 'react';
import '../../styles/HomeStyles.css'
import setting from '../../assets/setting.png'
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { surveyListState, modifyState } from '../../contexts/atom';
import axios from 'axios';


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";
import html2canvas from 'html2canvas';
// Import the functions you need from the SDKs you need 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = { 
};

try {
    firebase.initializeApp(firebaseConfig)
    } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack)
    }}
const storage = firebase.storage();
function PrintSurveyGrid(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const setSurveyList = useSetRecoilState(surveyListState)
    const setIsModify = useSetRecoilState(modifyState);
    const navigate = useNavigate();

    const survey = props.survey;

    const [downloadUrl, setDownloadUrl] = useState(''); 
    const imageName ='15.jpg${survey.id}.jpg'; // Replace with the name of the specific image you want to retrieve

    storage
      .ref(`tumbnail/${imageName}`)
      .getDownloadURL()
      .then((url) => {
        setDownloadUrl(url);
      })
      .catch((error) => {
        console.error(error);
      }); 
    function onClickGrid(e, id) {
        e.preventDefault();
        const loadSurveys = async()=>{
            const result = await axios.get(`/api/load-survey/${id}`);
            console.log(result)
            setSurveyList((prev) => {
                //수정 리스트 모르겠어
                return {
                    id: result.data.id,
                    title: result.data.title,
                    description: result.data.description,
                    reliability: result.data.reliability,
                    font:result.data.font,
                    fontSize:result.data.fontSize,
                    backColor:result.data.backColor,
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
            <div className='grid_box' style={{ backgroundImage: `url(${downloadUrl})`,backgroundRepeat:'no-repeat', backgroundSize:'cover'}} onClick={(e) => onClickGrid(e, survey.id)}>
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