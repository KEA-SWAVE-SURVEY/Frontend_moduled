import{Swiper,SwiperSlide} from "swiper/react";
import '../../styles/Swiper.css'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import black from "../../assets/black.jpg"

import chatbot from '../../assets/ChatGPT.png'
import graph from '../../assets/graph.gif'
import chat22 from '../../assets/chat22.jpg'
import { EffectCoverflow, Pagination, Navigation,EffectFade,Autoplay } from 'swiper';



export default function Swipers() {
  return (
    <div>
    

        <div className="swipe">
            <h1 className="heading">Features</h1>
            <Swiper
                effect={'coverflow'}
                fade={true}
                grapCursor={true}
                centeredSlides={true}
                autoplay={{
                    delay: 1300,
                    disableOnInteraction: false,
                  }}
                
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation,EffectFade,Autoplay]}
                
                className='swiper_container'
                
                >
                <SwiperSlide>
                    <img src={chatbot} alt="black"/>
                    <br/>
                    ChatGPT
                    <br/>
                    <div className="hi">
                    질문 추천으로 질문생성을 빠르게
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={graph} alt="black"/>
                    <br/>
                    알고리즘 분석
                    <br/>
                    <div className="hi">
                    알고리즘 분석을 활용한 다양하고 정확한 분석!
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={chat22} alt="black"/>
                    <br/>
                    대화형 설문
                    <br/>
                    <div className="hi">
                    응답자의 답변을 분석하여 설문 결과 저장!
                    </div>
                    
                </SwiperSlide>
                <SwiperSlide>
                    <img src={black} alt="black"/>
                    <br/>
                    QR
                </SwiperSlide>
                <SwiperSlide>
                    <img src={black} alt="black"/>
                    <br/>
                    로그인
                </SwiperSlide>
                <SwiperSlide>
                    <img src={black} alt="black"/>
                    <br/>
                    비로그인 응답
                </SwiperSlide>
                <SwiperSlide>
                    <img src={black} alt="black"/>
                    <br/>
                    글자 확대
                </SwiperSlide>
                <div className="slider-controller">
                    <div className="swiper-button-prev slider-arrow">
                       <ion-icon name="arrow-back-outline"></ion-icon> 
                    </div>
                    <div className="swiper-button-next slider-arrow">
                       <ion-icon name="arrow-forward-outline"></ion-icon> 
                    </div>
                    <div className="swiper-pagination"></div>
                </div>



            </Swiper>
        </div>
        </div>
  )
}

