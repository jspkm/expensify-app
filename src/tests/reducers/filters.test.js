import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
	const state = filtersReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should set sortBy to amount', () => {
	const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
	expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
	const state = filtersReducer(undefined, { type: 'SORT_BY_DATE' });
	expect(state.sortBy).toBe('date');
});

test('should change sortBy to date', () => {
	const current = {
		text: '',
		sortBy: 'amount',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	};
	const action = { type: 'SORT_BY_DATE' };
	const state = filtersReducer(current, action);
	expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
	const action = {
		type: 'SET_TEXT_FILTER',
		text: 'bill'
	}
	const state = filtersReducer(undefined, action);
	expect(state.text).toBe('bill');
});

test('should set startDate filter', () => {
	const date = moment('2018-12-25');
	const action = {
		type: 'SET_START_DATE',
		date
	}
	const state = filtersReducer(undefined, action)
	expect(state.startDate).toEqual(date);
});

test('should set endDate filter', () => {
	const date = moment('2018-12-25');
	const action = {
		type: 'SET_END_DATE',
		date
	}
	const state = filtersReducer(undefined, action)
	expect(state.endDate).toEqual(date);
});
