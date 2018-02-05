import { DateRangePicker } from 'react-dates';
import React from 'react';
import { connect } from 'react-redux';
import { sortByAmount, sortByDate, setTextFilter, setStartDate, setEndDate } from '../actions/filters';

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
	}
	onSortChange = (e) => {
		e.target.value === 'date' ? this.props.sortByDate() : this.props.sortByAmount();
	};
	render() {
		return (
			<div>
				<input 
					type="text" 
					value={this.props.filters.text} 
					onChange={this.onTextChange} 
				/>
				<select onChange={this.onSortChange}>
					<option value="date">Date</option>
					<option value="amount">Amount</option>
				</select>
				<DateRangePicker
					startDate={this.props.filters.startDate}
					startDateId="StartDate"
					endDate={this.props.filters.endDate}
					endDateId="EndDate"
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
};

const mapStateToProps = (state) => ({
	filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
	setEndDate: (date) => dispatch(setEndDate()),
	setStartDate: (date) => dispatch(setStartDate()),
	setTextFilter: (text) => dispatch(setTextFilter(text)),
	sortByAmount: () => dispatch(sortByAmount()),
	sortByDate: () => dispatch(setByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);