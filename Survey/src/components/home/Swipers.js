import{Swiper,SwiperSlide} from "swiper/react";
import '../../styles/Swiper.css'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import black from "../../assets/black.jpg"
import qr from '../../assets/qr.jpg'
import template from '../../assets/template.gif'
import font from '../../assets/font.gif'
import chatbot from '../../assets/ChatGPT.png'
import graph from '../../assets/graph.gif'
import lock from '../../assets/lock.jpg'
import answer from '../../assets/answer.gif'
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
                loop={true}
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
                    <div className="swiperFont">
                    ChatGPT
                    <br/>
                    질문 추천으로 질문생성을 빠르게
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={graph} alt="black"/>
                    <div className="swiperFont">
                    알고리즘 분석
                    <br/>
                    알고리즘 분석을 활용한 정확한 분석!
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={font} alt="black"/>
                    <div className="swiperFont">
                    다양한 꾸미기
                    <br/>
                    폰트, 배경색을 내 맘대로 
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={template} alt="black"/>
                    <div className="swiperFont">
                    템플릿 제공
                    <br/>
                    미리 적용된 디자인으로 빠르게
                    </div>
                    
                </SwiperSlide>
                <SwiperSlide>
                    <img src={qr} alt="black"/>
                    <div className="swiperFont">
                    QR
                    <br/>
                    QR로 간편한 접근
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={lock} alt="black"/>
                    <div className="swiperFont">
                    로그인
                    <br/>
                    Auth로 안전한 로그인
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={answer} alt="black"/>
                    <div className="swiperFont">
                    비로그인 응답
                    <br/>
                    응답자는 응답만 빠르게!
                    </div>
                </SwiperSlide>
                
                <div className="slider-controller">
                    <div className="swiper-button-prev slider-arrow">
                       <ion-icon name="arrow-back-outline"></ion-icon> 
                    </div>
                    <div className="swiper-button-next slider-arrow">
                       <ion-icon name="arrow-forward-outline"></ion-icon> 
                    </div>
                    <br/>
                    <div className="swiper-pagination"></div>
                </div>



            </Swiper>
        </div>
        </div>
  )
}

