import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expensesReducer from '../../reducers/expenses-reducer';


test('should setup remove expense action object', () => {
    const action = removeExpense( { id: '123abc' });

    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc',

    });
});

test('should setup edit expense action object', () => {
    const action = editExpense( '123abc', { note:'new edit' });

    //the updates is an object, so need to treat it like such in the expect func below
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'new edit'
        }
    });
});


test('should setup add expense action object with provided values', () => {

    const expenseData = {
        description: 'Rent',
        note: 'Bill',
        amount: 13500,
        createdAt: 15003541
    };

    const result = addExpense(expenseData);

    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });

});

test('should setup add expense action object with default values', () => {

    const result = addExpense();

    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});