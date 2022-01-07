import Calendar from './components/molecules/Calendar';
import PopContainer from './components/molecules/PopContainer';
import { Route, Redirect } from 'react-router-dom';
import { format } from 'date-fns';
import { Transition } from 'react-transition-group';

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Redirect to={`/${format(new Date(), 'yyyyMM')}`} />
      </Route>
      <Route path="/:month">
        <Calendar />
      </Route>
      <Route path={'/:month/:day'}>
        <PopContainer type="todos" />
        <PopContainer type="form" />
      </Route>
    </div>
  );
}

export default App;
