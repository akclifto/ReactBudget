import moment from 'moment';
import expensesReducer from '../../reducers/expenses-reducer';
import expenses from '../fixtures/expenses';

test('should set default state', () => {

    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});


test('should remove expense by id', () => {

    const action = {
        type: 'REMOVE_EXPENSE',     
        id: expenses[1].id   
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);

});


test('should NOT remove expenses if id not found', () => {

    const action = {
        type: 'REMOVE_EXPENSE',     
        id: 34 
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

// should add an expense
test('should add an expense', () => {

    const expense = {
        id: '5',
        description: 'new expense',
        note: '',
        amount: 100,
        createdAt: moment(0) 
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);

});


// should edit an expense
test('should edit an expense', () => {

    const amount = 12200;
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            amount
        }
    };

    const state = expensesReducer(expenses, action);
    expect(state[0].amount).toBe(amount);
});


// should not edit expense if expense not found
test('should NOT edit an expense if not found', () => {

    const amount = 12200;
    const action = {
        type: 'EDIT_EXPENSE',
        id: '3434',
        updates: {
            amount
        }
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});