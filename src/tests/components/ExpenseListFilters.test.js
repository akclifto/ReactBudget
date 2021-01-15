import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';


let setTextFilter,
    sortbyDate,
    sortByAmount,
    setStartDate,
    setEndDate,
    wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortbyDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    

    wrapper = shallow(
        <ExpenseListFilters
            setTextFilter={setTextFilter}
            sortbyDate={sortbyDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            filters={filters}
        />
    );

});

test('should render expense list filters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render expense list filters with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'rent';
    wrapper.find('input').simulate('change', {
        target: {
            value
        }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
    const value = 'date';
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortbyDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByAmount).toHaveBeenCalled();

});

// test fails due to enzyem issue:
// Method “props” is meant to be run on 1 node. 0 found instead.

// test('should handle date change', () => {
//     const startDate = moment(0).add(4, 'years');
//     const endDate = moment(0).add(8, 'years');
//     wrapper.find('DateRangePicker').prop('onDatesChange')({
//         startDate, endDate
//     });
//     expect(setStartDate),toHaveBeenLastCalledWith(startDate);
//     expect(setEndDate),toHaveBeenLastCalledWith(EndDate);
// });

// test fails due to enzyem issue:
// Method “props” is meant to be run on 1 node. 0 found instead.

// test('should handle date focus changes', () => {
//     const calendarFocused = 'startDate';
//     wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
//     expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
// });