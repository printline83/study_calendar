import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useParams, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

function Todos({data, setData, setPop}) {
  const history = useHistory();
  const {month, day} = useParams();
  const todos = Object.keys(data).length === 0 ? undefined : data.find((v) => v.date == month+day );
  const removeTodo = (id) => {
    const newData = data.map(v => {
      if (v.date == month+day) {
        return {...v, todo: v.todo.filter(vv => vv.id !== id)};
      } else {
        return v;
      }
    });
    setData(newData);
  };
  const popForm = (id) => {
    setPop(id);
  };
  return (
    <>
      <button type="button" className="popup_close" onClick={() => { history.push(format(new Date(), `/${month}`)); }}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2>{format(new Date(month.substr(0, 4), month.substr(4, 2)-1, day), 'yyyy년 MM월 dd일')}</h2>
      <hr />
      {<ul className="todos">
        {todos === undefined || todos.todo.length === 0 
        ? <p className="empty_todos">할일이 음슴.</p>
        : todos.todo.map((v, i) => {
          return (
            <li key={i}>
              <InputGroup>
                <FormControl disabled={true} value={v.period[0] + '~' + v.period[1] + ' ' + v.subject} />
                <Button variant="outline-secondary" onClick={() => popForm(v.id)}><FontAwesomeIcon icon={faPen} /></Button>
                <Button variant="outline-secondary" onClick={() => removeTodo(v.id)}><FontAwesomeIcon icon={faTimes} /></Button>
              </InputGroup>
            </li>
          )
        })}
      </ul>}
      <div className="d-grid">
        <Button variant="outline-secondary" onClick={() => popForm(1) }>추가</Button>
      </div>
    </>
  )
}

export default Todos;