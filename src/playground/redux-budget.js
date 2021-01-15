import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';

const demoState = {

    expenses: [{
        id: 'asdflkaj',
        description: 'January Rent',
        note: 'Final payment',
        amount: 54500,
        createDate: 0
    }],

    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// Action Generators::

// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createDate = 0
    } = {}
) => ({

    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createDate
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

// SORT_BY_DATE
const sortbyDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {

    switch (action.type) {

        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];

        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);

        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });

        default:
            return state;

    }

};

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined

};

const filtersReducer = (state = filtersReducerDefaultState, action) => {

    switch (action.type) {

        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };

        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };

        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };

        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };

        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        
        default:
            return state;
    }

};

// timestamps (milliseconds) explanation:
// timestampt 0 == Jan 1 00:00 1970 (unix epoch_)
// 33400, 10, -203 all valid


// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy,  startDate, endDate } ) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createDate >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createDate <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) ;

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createDate < b.createDate ? 1: -1;
        }
        if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};


// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

//track changes in console fro debug
const unsub = store.subscribe(() => {

    const state = store.getState();
    const visExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visExpenses);
});

const toEdit = store.dispatch(addExpense({ description: 'rent', amount: 100,  createDate: 1000}));
const toRemove = store.dispatch(addExpense({ description: 'bills', amount: 50000, createDate: -1000 }));
store.dispatch(addExpense({ description: 'tickets', amount: 2300, createDate: 1500 }));

// store.dispatch(removeExpense({ id: toRemove.expense.id }));

// store.dispatch(editExpense(toEdit.expense.id, { amount: 800 } ));
// store.dispatch(setTextFilter('rent'));

// //filters reducers
store.dispatch(sortByAmount());
// store.dispatch(sortbyDate());


// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));
// store.dispatch(setEndDate());
