import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListitem';
import selectExpenses from '../selectors/get-expenses';


export const ExpenseList = (props) => (

    <div>
        {
            props.expenses.length === 0 ? (
                <p> No Expenses in List </p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />
                })
            )
        }
    </div>

);


const mapStateToProps = (state) => {

    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

// We can use connect from redux and the state of the components to access information as needed.  
// The connect components lets us access info within other components where the structure may be disjointed
//      meaning, there is no direct link between two components that need to connect information.  
//      this apparently is pretty common.

//  connect (the state of the props to be mapped)(where the connect will be mapped)

export default connect(mapStateToProps)(ExpenseList);
