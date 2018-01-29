import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT'});
	expect(state).toEqual([]);
});

test('should remove expenses by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id does not exist', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should add expenses', () => {
	const expense = {
		id: '4',
		description: 'AWS',
		note: '',
		amount: 11110,
		createdAt: moment(0).add(10, 'days').valueOf()
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});

test('should edit expenses', () => {
	const update = {
		note: 'new note',
	};
	const action = {
		id: expenses[2].id,
		type: 'EDIT_EXPENSE',
		update
	};
	const state = expensesReducer(expenses, action);
	expect(state[2].note).toBe(update.note);
});

test('should not edit expenses if id not found', () => {
	const update = {
		note: 'new note',
	};
	const action = {
		id: '-1',
		type: 'EDIT_EXPENSE',
		update
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});