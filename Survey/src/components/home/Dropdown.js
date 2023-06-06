 
import '../../styles/DropdownStyles.css';
import axios from 'axios';


function Dropdown(props) {
  /* 현재 기능 아예 없음 */ 

  const id = props.id;

  function onClickResearch(e){
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `http://172.16.210.22/research/${id}`; 
  }
  //삭제 구현 복사 제거 수정 -> ip있어야 하나?
  function onClickDelete(e){
    e.preventDefault();
    e.stopPropagation();
    axios.post(`http://172.16.210.22/api/external/delete/${id}`);
    window.location.reload()
  }
  return (
    <>
    <ul className='drop_ui'>
      <li className="dropdown_item" style={{borderRadius: "5px 5px 0 0"}} onClick={(e)=>onClickResearch(e)}>설문 분석</li>
      <li className="dropdown_item">내보내기</li>
      <li className="dropdown_item">복사</li>
      <li className="dropdown_item" style={{borderRadius: "0 0 5px 5px"}} onClick={(e)=>onClickDelete(e)}>삭제</li>
      </ul>
    </>
  );
}

export default Dropdown;