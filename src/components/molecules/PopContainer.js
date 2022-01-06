import { useSelector } from 'react-redux';
import Form from './PopForm';
import Todos from './PopTodos';

function PopContainer({type, setPop}) {
  let pop = useSelector(state => state.reducer2);
  pop = type === 'todos' ? true : pop;
  return (
    <div className={`popup ${pop !== '' ? 'pop_show' : ''}`}>
      <div className="popup_box">
        <div className="popup_inner">
          {type === "todos" 
          ? <Todos setPop={setPop} />
          : <Form setPop={setPop} pop={pop}/>}
        </div>
      </div>
    </div>
  );
}

export default PopContainer;