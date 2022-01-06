import Form from './PopForm';
import Todos from './PopTodos';

function PopContainer({pop, data, setData, type, setPop}) {
  return (
    <div className={`popup ${pop !== '' ? 'pop_show' : ''}`}>
      <div className="popup_box">
        <div className="popup_inner">
          {type === "todos" 
          ? <Todos data={data} setData={setData} setPop={setPop} />
          : <Form data={data} setData={setData} setPop={setPop} pop={pop}/>}
        </div>
      </div>
    </div>
  );
}

export default PopContainer;