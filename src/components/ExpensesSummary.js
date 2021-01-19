import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/get-expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expenseTotal}) => {

    const expenseWord = expenseCount === 1 ? 'expense': 'expenses';
    const expenseTotalFormatted = numeral(expenseTotal / 100 ).format('$0,0.00');

    return (
        <div>
            <h1> Viewing {expenseCount} {expenseWord} totalling {expenseTotalFormatted}</h1>
        </div>
    )

};

// need to map state to props for connector
const mapStateToProps = (state) => {

    const visibleExpenses = selectExpenses(state.expenses, state.filters);

    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: selectExpensesTotal(visibleExpenses)
    };
};

//connector react-redux
export default connect(mapStateToProps)(ExpensesSummary);