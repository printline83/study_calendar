import { Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import InputMask from "react-input-mask";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useState } from 'react';

function Form({data, setData, setPop, pop}) {
  const {month, day} = useParams();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [subject, setSubject] = useState('');
  const [todoId, setTodoId] = useState('');
  const todos = Object.keys(data).length === 0 ? undefined : data.find((v) => v.date == month+day );

  if (parseInt(pop) > 1) {
    const values = todos.todo.find((v, i) => v.id == pop);

    // 무한 랜더링 방지
    if (todoId === '') {
      setStart(values.period[0]);
      setEnd(values.period[1]);
      setSubject(values.subject);
      setTodoId(values.id);
    }
  }

  // input, popup 초기화
  const init = () => {
    setPop('');
    setStart('');
    setEnd('');
    setSubject('');
    setTodoId('');
  };

  // 업데이트 함수
  const updateData = () => {
    let newData = [];
    if (start === '') {
      alert('시작시간을 입력하셈.');
      return;
    }
    if (end === '') {
      alert('종료시간을 입력하셈.');
      return;
    }
    if (subject === '') {
      alert('할 일을 입력하셈.');
      return;
    }
    if (todoId !== '') {

      // 수정
      newData = data.map(v => {
        if (v.date == month+day) {
          return {
            ...v,
            todo: v.todo.map(vv => {  
              return vv.id !== todoId ? vv 
              : {
                ...vv,
                period: [start, end],
                subject: subject,
              }
            }) 
          }
        } else {
          return v;
        }
      });

    } else if (todos === undefined) {

      // 신규 
      newData = [
        ...data, 
        {
          date: month+day,
          todo: [
            {
              id: month+day+'1',
              period: [start, end],
              subject: subject,
            }
          ]
        }
      ];
    } else {

      // 추가
      newData = data.map(v => {
        if (v.date == month+day) {
          return {
            ...v,
            todo: [
              ...v.todo,
              {
                id: month+day+(v.todo.length+1),
                period: [start, end],
                subject: subject,
              }
            ]
          }
        } else {
          return v;
        }
      });
    } 
    
    setData(newData);
    init();
  };

  return (
    <>
      <button type="button" className="popup_close" onClick={init}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2>{format(new Date(month.substr(0, 4), month.substr(4, 2)-1, day), 'yyyy년 MM월 dd일')} 할일 입력</h2>
      <hr /> 
      <InputMask mask="99:99" className="mb-2 form-control" value={start} onChange={(e) => setStart(e.target.value)} placeholder="시작시간" /> 
      <InputMask mask="99:99" className="mb-2 form-control" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="종료시간" /> 
      <FormControl as="textarea" rows={5} className="mb-2" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="할 일을 입력해 주세요." />
      <div className="d-grid">
        <Button variant="outline-success" onClick={() => updateData()}>저장</Button>
      </div>
    </>
  )
}

export default Form;