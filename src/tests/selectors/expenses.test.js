import moment from 'moment';
import selectExpenses from '../../selectors/get-expenses';
import expenses from '../fixtures/expenses';

test('should filter by text value', () => {

    // this will test the text sort by filter for date,
    // and searching for the letter 'e'
    // result should be expense id 3, and id 2 in that order
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined, 
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([expenses[2], expenses[1]]);

});


test('should filter by startDate', () => {

    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0), 
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([expenses[2], expenses[0]]);

});


// should filter by end date 
test('should filter by endDate', () => {

    // test for dates after moment(0), so exp 0 and 1
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined, 
        endDate: moment(0)
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]]);

});


// should sort by date
test('should sort by date', () => {

    //filter out items further than two days after moment(0)
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined, 
        endDate: moment(0).add(2, 'days')
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]]);


});

// should sort by amount
test('should sort by amount, greatest to smallest', () => {

    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined, 
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1], expenses[0]]);
});