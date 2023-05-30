import '../../styles/CardStyles.css'
import CardData from './CardData';
import white from '../../assets/trans.png'
import black from '../../assets/black.jpg'
import chatbot from '../../assets/ChatGPT.png'
import graph from '../../assets/graph.gif'
import chat22 from '../../assets/chat22.jpg'


function Card(){
    return(
        <div className="card">
            <h1>Features</h1>
            <p>Choose, What you want</p>
            <div className='cardcards'>
                <CardData
                    img={chatbot}
                    heading="Chat GPT"
                    text="질문추천으로 질문생성을 빠르게!"
                />
                <CardData
                    img={graph}
                    heading="알고리즘 분석"
                    text="알고리즘 분석을 활용한 다양하고 정확한 분석!"
                />
                <CardData
                    img={chat22}
                    heading="대화형 설문"
                    text="응답자의 답변을 분석하여 설문 결과 저장!"
                />
            </div>
        </div>

    )
}

export default Card;