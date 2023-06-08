import './App.css';
import { useRef } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Survey from './pages/Survey'; 
import MyPage from './pages/MyPage'; 
import Footer from './components/Footer'; 
import TemplateSurvey from './pages/TemplateSurvey'; 
import Research from './pages/Research';  
import AnswerSurvey from './pages/AnswerSurvey';
import BeforeAnswer from './pages/BeforeAnswer';
import AfterAnswer from './pages/AfterAnswer';
import ErrorSurvey from './pages/ErrorSurvey';
import Login from './pages/Login';  
import Auth from './pages/Auth';  
//논의 사항 : 응답관련 페이지들은 넵바와 푸터가 필요없지 않나? 로그인 불필요 + 바들 제거


function App() {

  const scrollRef = useRef([]);

  function scrollTo(index) {
    scrollRef.current[index].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar scrollTo={scrollTo} scrollRef={scrollRef} />
        <div style={{width:"100%",minHeight:"100vh",height:"auto"}}>
          <Routes>
            <Route path="/" element={<Home scrollRef={scrollRef} />} />
            <Route path="/survey" element={<Survey />} /> 
            <Route path='/mypage' element={<MyPage />} /> 
            <Route path="/template/Survey/:Id" element={<TemplateSurvey/>}/>
            <Route path="/Research/:documentId" element={<Research />} />  
            <Route path="/Response/:documentId" element={<AnswerSurvey />} />
            <Route path="/Response/beforeanswer/" element={<BeforeAnswer />} />
            <Route path="/Response/afteranswer/" element={<AfterAnswer />} />
            <Route path="/Response/error" element={<ErrorSurvey/>}/>
            <Route path="/login" element={<Login />} /> 
            <Route path="/oauth/callback/:provider" element={<Auth />} /> 

            </Routes>
        </div>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;