import React from 'react';
import { shallow } from 'enzyme';
import { AddExpense } from '../../components/AddExpense';
import expenses from '../fixtures/expenses';


let addExpenseSpy, historySpy, wrapper;

beforeEach(() => {
    addExpenseSpy = jest.fn();
    historySpy = { push: jest.fn() }

    wrapper = shallow(<AddExpense 
        addExpense={addExpenseSpy} 
        history={historySpy} />);
});

test('should render AddExpense page correctly', () => {

    // const addExpenseSpy = jest.fn();
    // const historySpy = { push: jest.fn() }

    // const wrapper = shallow(<AddExpense 
    //     onSubmit={addExpenseSpy} 
    //     history={historySpy} />);

    expect(wrapper).toMatchSnapshot();

});

test('should handle onSubmit correctly', () => {

    // const addExpenseSpy = jest.fn();
    // const historySpy = { push: jest.fn() }

    // const wrapper = shallow(<AddExpense 
    //     onSubmit={addExpenseSpy} 
    //     history={historySpy} />);

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[1]);
})