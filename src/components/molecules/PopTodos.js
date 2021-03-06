import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useParams, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

function Todos() {
  const state = useSelector(state => state.reducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const {month, day} = useParams();
  const todos = Object.keys(state).length === 0 ? undefined : state.find((v) => v.date == month+day );

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
                <InputGroup.Checkbox checked={v.status} onChange={() => dispatch({type: 'status', id: v.id, 'date': month+day})} />
                <FormControl disabled={true} value={v.period[0] + '~' + v.period[1] + ' ' + v.subject} />
                <Button variant="outline-secondary" onClick={() => dispatch({type: 'setid', id: v.id})}><FontAwesomeIcon icon={faPen} /></Button>
                <Button variant="outline-secondary" onClick={() => dispatch({type: 'remove', id: v.id, 'date': month+day})}><FontAwesomeIcon icon={faTimes} /></Button>
              </InputGroup>
            </li>
          )
        })}
      </ul>}
      <div className="d-grid">
        <Button variant="outline-secondary" onClick={() => dispatch({type: 'setid', id: 1})}>추가</Button>
      </div>
    </>
  )
}

export default Todos;