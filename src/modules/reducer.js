import { combineReducers, createStore } from 'redux';

const init = [];
let inputs;
function reducer(state = init, action) {
  switch(action.type) {
    case 'get':
      state = action.payload;
      break;
    case 'status':
      state = state.map(v => {
        if (v.date == action.date) {
          return {
            ...v,
            todo: v.todo.map(vv => {  
              return vv.id !== action.id ? vv 
              : {
                ...vv,
                status: ! vv.status,
              }
            }) 
          }
        } else {
          return v;
        }
      });
      break;
    case 'remove':
      state = state.map(v => {
        if (v.date == action.date) {
          return {...v, todo: v.todo.filter(vv => vv.id !== action.id)};
        } else {
          return v;
        }
      });
      break;
    case 'modify':
      inputs = action.inputs;
      state = state.map(v => {
        if (v.date == action.date) {
          return {
            ...v,
            todo: v.todo.map(vv => {  
              return vv.id !== inputs.id ? vv 
              : {
                ...vv,
                period: [inputs.start, inputs.end],
                subject: inputs.subject,
              }
            }) 
          }
        } else {
          return v;
        }
      });
      break;
    case 'create':
      inputs = action.inputs;
      state = [
        ...state, 
        {
          date: action.date,
          todo: [
            {
              id: action.date+'1',
              period: [inputs.start, inputs.end],
              subject: inputs.subject,
              status: false
            }
          ]
        }
      ];
      break;
    case 'add':
      inputs = action.inputs;
      state = state.map(v => {
        if (v.date == action.date) {
          return {
            ...v,
            todo: [
              ...v.todo,
              {
                id: action.date+(v.todo.length+1),
                period: [inputs.start, inputs.end],
                subject: inputs.subject,
                status: false
              }
            ]
          }
        } else {
          return v;
        }
      });
      break;
  }
  return state;
}

let form = '';
function reducer2(state = form, action) {
  switch(action.type) {
    case 'setid':
      state = action.id;
      break;
    case 'init':
      state = '';
      break;
  }
  return state;
}

const store = createStore(combineReducers({reducer, reducer2}));
export default store;