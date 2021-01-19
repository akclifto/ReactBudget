import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { v4 as uuidv4 } from 'uuid';

//make a text filter to search or find things.  
export class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
        // console.log(e.target.value)
    };

    onSortChange = (e) => {
        if (e.target.value === 'date') {
            this.props.sortByDate();
          } else if (e.target.value === 'amount') {
            this.props.sortByAmount();
          }
    };


    render() {
        return (

            <div>
                <input
                    type="text"
                    value={this.props.filters.text}
                    onChange={this.onTextChange}
                />

                {/*Below is how to create a controlled input using a text filtering process and drop down selectors.*/}

                <select
                    value={this.props.filters.sortBy}
                    onChange={this.onSortChange}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>

                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId={uuidv4()}
                    endDate={this.props.filters.endDate}
                    endDateId={uuidv4()}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />

            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({

    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())
});

const mapStateToProps = (state) => {

    return {
        filters: state.filters
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);