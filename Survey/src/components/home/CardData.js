import '../../styles/CardStyles.css';

function CardData(props){
    return(
        <div className='c-card'>
            <div className='c-image'>
                <img src={props.img} alt="image"/>
            </div>
            <h4>{props.heading}</h4>
            <p>{props.text}</p>
        </div>
    )
}

export default CardData;
