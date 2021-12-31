import Calendar from './components/molecules/Calendar';
import PopContainer from './components/molecules/PopContainer';
import { Route, Redirect } from 'react-router-dom';
import { format } from 'date-fns';
import { useState } from 'react';


function App() {
  const [data, setData] = useState([]);
  const [pop, setPop] = useState('');
  return (
    <div className="App">
      <Route exact path="/">
        <Redirect to={`/${format(new Date(), 'yyyyMM')}`} />
      </Route>
      <Route path="/:month">
        <Calendar data={data} setData={setData} />
      </Route>
      <Route path={'/:month/:day'}>
        <PopContainer type="todos" pop={true} data={data} setData={setData} setPop={setPop} />
        <PopContainer type="form" pop={pop} data={data} setData={setData} setPop={setPop} />
      </Route>
    </div>
  );
}

export default App;
