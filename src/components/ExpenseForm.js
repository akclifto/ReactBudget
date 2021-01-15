import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

// date object for react sucks, using moment.js instead. Documentation is really good for moment
//const date = new Date();
// const now = moment();
// console.log(now.format('MMM DD YYYY'));

export default class ExpenseForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    setupNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    onAmountChange = (e) => {
        const amount = e.target.value;

        // using a regular expression here to get a correct value and char input for money to two decimal places
        // search regex101 to learn more about it
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    }

    onDateChange = (createdAt) => {

        if(createdAt) {
            this.setState(() => ( { createdAt }));
        }

    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ( { calendarFocused: focused }))
    }

    onSubmit = (e) => {
        
        e.preventDefault();
        if(!this.state.description || !this.state.amount) {
            // set error state 
            this.setState(() => ( { error: 'Please provide description and amount!' }));
        } else {
            // clear the error
            this.setState(() => ( { error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
            // console.log('submitted');
        }
    };

    render() {
        return (

            <div>
            {this.state.error && <p>{this.state.error}</p>}

                <form onSubmit={this.onSubmit}>

                    <input
                        type="text"
                        placeholder="Description of Expense"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />

                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        //number of calendar months visible when selecting a day
                        numberOfMonths={1}
                        //inline way to let you select any day in existence 
                        isOutsideRange={ () => false}
                    />
                    
                    <br />

                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.setupNoteChange}
                    >
                    </textarea>

                    <br />

                    <button>Save Expense</button>
                </form>
            </div>
        )
    }
}
