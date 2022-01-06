import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Empty() {
  return (
    <div className="day empty">
      <div>
        <h2>&nbsp;</h2>
        <div className="content"></div>
      </div>
    </div>
  );
}
  
function Day({day, todos}) {
  const history = useHistory();
  return (
    <div className="day" onClick={() => { history.push(format(day, '/yyyyMM/dd')); }}>
      <div>
        <h2>
          {format(day, 'yyyyMMdd') == format(new Date(), 'yyyyMMdd') ? <span className="today">Today</span> : ''}
          {format(day, 'd')}
        </h2>
        <div className="content">
          <ul>
            {todos === undefined || todos.todo.length === 0
            ? ''
            : todos.todo.map(v => 
              <li key={v.id} className={v.status ? 'complete' : ''}>
                <FontAwesomeIcon icon={faCheck} />
                {v.subject}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
  
export {Day, Empty};
