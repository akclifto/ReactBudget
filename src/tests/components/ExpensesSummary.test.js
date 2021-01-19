import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Should render the Expenses Summary Correctly with 1 expense (snapshot)', () => {
    const wrapper = shallow(<ExpensesSummary 
        expenseCount={1} 
        expenseTotal={195}
        />)

        expect(wrapper).toMatchSnapshot();
});

test('Should render the Expenses Summary Correctly with multiple expense (snapshot)', () => {
    const wrapper = shallow(<ExpensesSummary 
        expenseCount={13} 
        expenseTotal={2044541}
        />)

        expect(wrapper).toMatchSnapshot();
});

test(' ', () => {

});