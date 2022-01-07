import { Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import InputMask from "react-input-mask";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Form() {
  const {state, todoid} = useSelector((state) => { return {state: state.reducer, todoid: state.reducer2} });
  const dispatch = useDispatch();
  const inputsInit = {id: '', start: '', end: '', subject: ''};
  const {month, day} = useParams();
  const [inputs, setInputs] = useState(inputsInit);
  const todos = Object.keys(state).length === 0 ? undefined : state.find((v) => v.date == month+day );

  useEffect(() => {
    if (parseInt(todoid) > 1) {
      const values = todos.todo.find((v, i) => v.id == todoid);
      setInputs({
        id: values.id,
        start: values.period[0],
        end: values.period[1],
        subject: values.subject
      });
    }
  }, [todoid]);

  const changeInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  // input, popup 초기화
  const init = () => {
    dispatch({type: 'init'});
    setInputs(inputsInit);
  };

  // 업데이트 함수
  const updateData = () => {
    if (inputs.start === '') { alert('시작시간을 입력하셈.'); return; }
    if (inputs.end === '') { alert('종료시간을 입력하셈.'); return; }
    if (inputs.subject === '') { alert('할 일을 입력하셈.'); return; }
    if (inputs.id !== '') { // 수정
      dispatch({type: 'modify', date: month+day, inputs: inputs});
    } else if (todos === undefined) { // 신규 
      dispatch({type: 'create', date: month+day, inputs: inputs});
    } else { // 추가
      dispatch({type: 'add', date: month+day, inputs: inputs});
    } 
    init();
  };

  return (
    <>
      <button type="button" className="popup_close" onClick={init}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2>{format(new Date(month.substr(0, 4), month.substr(4, 2)-1, day), 'yyyy년 MM월 dd일')} 할일 입력</h2>
      <hr /> 
      <InputMask mask="99:99" className="mb-2 form-control" name="start" value={inputs.start} onChange={changeInputs} placeholder="시작시간" /> 
      <InputMask mask="99:99" className="mb-2 form-control" name="end" value={inputs.end} onChange={changeInputs} placeholder="종료시간" /> 
      <FormControl as="textarea" rows={5} className="mb-2" name="subject" value={inputs.subject} onChange={changeInputs} placeholder="할 일을 입력해 주세요." />
      <div className="d-grid">
        <Button variant="outline-success" onClick={() => updateData()}>저장</Button>
      </div>
    </>
  )
}

export default Form;