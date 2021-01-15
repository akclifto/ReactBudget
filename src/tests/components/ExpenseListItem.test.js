import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListitem';
import expenses from '../fixtures/expenses';

test('should render selected expense list item correctly at id 2', () =>  {

    const wrapper = shallow (<ExpenseListItem {...expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});