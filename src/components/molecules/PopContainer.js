import { useSelector } from 'react-redux';
import Form from './PopForm';
import Todos from './PopTodos';
import { CSSTransition } from 'react-transition-group';

function PopContainer({type, setPop}) {
  let pop = useSelector(state => state.reducer2);
  pop = type === 'todos' ? true : pop;
  return (
    <CSSTransition
      in={pop !== '' ? true : false}
      timeout={300}
      classNames="transpop"
      unmountOnExit
    >
    <div className={`popup pop_show`}>
      <div className="popup_box">
        <div className="popup_inner">
          {type === "todos" 
          ? <Todos setPop={setPop} />
          : <Form setPop={setPop} pop={pop}/>}
        </div>
      </div>
    </div>
    </CSSTransition>
  );
}

export default PopContainer;