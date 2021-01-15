import moment from 'moment';
import filtersReducer from '../../reducers/filters-reducer';


test('should setup default filter values', () => {

    const state = filtersReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
    
});

test('should set sortBy to amount', () => {

    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

    expect(state.sortBy).toBe('amount');

});

test('should set sortBy to date', () => {

    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE' };

    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});


// should set text filter 
test('should set text filter', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'date'
    };
    const action = { type: 'SET_TEXT_FILTER', text: 'gum' };
    
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('gum');

});

// should set startdate filter
test('should set startDate filter', () => {

    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'date'
    };
    const action = { type: 'SET_START_DATE', startDate: moment(0) };

    const state = filtersReducer(currentState, action);
    expect(state.startDate).toEqual(moment(0));
});


// should set enddate filter
test('should set endDate filter', () => {

    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'date'
    };
    const action = { type: 'SET_END_DATE', endDate: moment(0).add(2, 'days').valueOf() };

    const state = filtersReducer(currentState, action);
    expect(state.endDate).toEqual(moment(0).add(2, 'days').valueOf());

});
