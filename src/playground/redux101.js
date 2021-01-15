import { createStore } from 'redux';

// Action generators - functions that return action objects
const incrCount = ( { incrementBy = 1 } = {}) => ({ 
    type: 'INCREMENT',
    incrementBy
});

const decrCount = ( { decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({count}) => ({
    type: 'SET',
    count
});


/*
// Reducers
    1. are pure functions :  output only determined by input
    2. never change state or action!
*/
const countReducer = (state = { count: 0 }, action) => {

    switch (action.type) {

        case 'INCREMENT' : 
            return {
                count: state.count + action.incrementBy
            };

        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };

        case 'RESET':
            return {
                count: 0
            }

        case 'SET':
            return {
                count: action.count
            };
            
        default :
            return state;
    }
};


const store = createStore(countReducer);

//subscribe checks for when the redux state changes for the store var
const unsub = store.subscribe(() => {
    console.log(store.getState());
});


// Actions - obj that gets sent to the redux store.  Below are actions.

// We want to incr count, decr count
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

store.dispatch(incrCount({ incrementBy: 5 }));
store.dispatch(incrCount({ incrementBy: 10 }));
store.dispatch(incrCount());


//to unsuscribe from something to stop watching it, call the var created with the subscribe function.
// unsub();

store.dispatch(incrCount({ decrementBy: 5 }));
store.dispatch(decrCount());
// We want to reset count
store.dispatch(resetCount());

// store.dispatch({
//     type: 'RESET'
// });

store.dispatch(setCount({ count: 505 }))
// store.dispatch({
//     type: 'SET',
//     count: 505
// });

