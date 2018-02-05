import React from 'react';
import { shallow } from 'enzyme';
import { DateRangePicker } from 'react-dates';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import expenses from '../fixtures/expenses';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
		/>
	);
});

test('should render ExpenseListFilters correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
	wrapper.setProps({
		filters: altFilters
	})
	expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
	const value = 'rent bill';
	wrapper.find('input').simulate('change', {
		target: { value }
	});
	expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
	const value = 'date';
	wrapper.find('select').simulate('change', {
		target: { value }
	});
	expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
	const value = 'amount';
	wrapper.find('select').simulate('change', {
		target: { value }
	});
	expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () => {
	const startDate = moment(0);
	const endDate = moment(0).add(3, 'days');
	wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate });
	expect(setStartDate).toHaveBeenLastCalledWith(startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus change', () => {
	// const calendarFocused = 'endDate';
	// wrapper.find(DateRangePicker).prop('onFocusChange')({ calendarFocused });
	// expect(wrapper.state('calendarFocused')).toEqual({ 'calendarFocused': calendarFocused });
});