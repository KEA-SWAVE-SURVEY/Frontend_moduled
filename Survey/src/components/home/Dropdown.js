import { useNavigate } from "react-router-dom";
import '../../styles/DropdownStyles.css';


function Dropdown(props) {
  /* 현재 기능 아예 없음 */
  const navigate = useNavigate();

  const id = props.id;

  function onClickResearch(e){
    e.preventDefault();
    e.stopPropagation();
    navigate('/survey/research/'+id);
  }
  return (
    <>
      <li className="dropdown_item" style={{borderRadius: "5px 5px 0 0"}} onClick={(e)=>onClickResearch(e)}>설문 분석</li>
      <li className="dropdown_item">내보내기</li>
      <li className="dropdown_item">복사</li>
      <li className="dropdown_item" style={{borderRadius: "0 0 5px 5px"}}>삭제</li>
    </>
  );
}

export default Dropdown;