import './App.css';
import { useRef } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
 
import Navbar from './components/Navbar';


 


import Research from './pages/Research'; 
import Footer from './components/Footer';
 

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
            <Route path="/Research/:documentId" element={<Research />} />  

            </Routes>
        </div>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
