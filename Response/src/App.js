import './App.css'; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
  
import Footer from './components/Footer';

import AnswerSurvey from './pages/AnswerSurvey';
import BeforeAnswer from './pages/BeforeAnswer';
import AfterAnswer from './pages/AfterAnswer';

//논의 사항 : 응답관련 페이지들은 넵바와 푸터가 필요없지 않나? 로그인 불필요 + 바들 제거


function App() {
 

  return (
    <div className="App">
      <BrowserRouter> 
        <div style={{width:"100%",minHeight:"100vh",height:"auto"}}>
          <Routes>  
            <Route path="/Response/:documentId" element={<AnswerSurvey />} />
            <Route path="/Response/beforeanswer/" element={<BeforeAnswer />} />
            <Route path="/Response/afteranswer/" element={<AfterAnswer />} />
            <Route path="/survey/error" element={<ErrorSurvey/>}/>

            </Routes>
        </div>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
