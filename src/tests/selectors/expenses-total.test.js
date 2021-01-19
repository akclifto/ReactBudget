import selectExpesnsesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses logged', () => {

    const result = selectExpesnsesTotal([]);
    expect(result).toBe(0);


});


test('should return total for a single expense logged', () => {

    const result = selectExpesnsesTotal([expenses[0]]);
    expect(result).toBe(1985);
});


test('should return total for multiple expenses logged', () => {

    const result = selectExpesnsesTotal(expenses);
    expect(result).toBe(8485);
});