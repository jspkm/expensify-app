import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = (
	{
		description = '', 
		note = '', 
		amount = 0,
		createdAt = 0
	} = {}
) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
});

const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

const editExpense = (id, update) => ({
	type: 'EDIT_EXPENSE',
	id,
	update
});

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch(action.type) {
		case 'ADD_EXPENSE':
			return [
				...state,
				action.expense
			]
		case 'REMOVE_EXPENSE':
			return state.filter(({ id }) => id !== action.id);
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if(expense.id === action.id) {
					return {
						...expense,
						...action.update
					}
				} else {
					return expense;
				}
			});
		default:
			return state;
	}
};

const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text
});

const sortByAmount = () => ({
	type: 'SORT_BY_DATE',
	sortBy: 'amount'
});

const sortByDate = () => ({
	type: 'SORT_BY_DATE',
	sortBy: 'date'
});

const setStartDate = (date = undefined) => ({
	type: 'SET_START_DATE',
	date
});

const setEndDate = (date = undefined) => ({
	type: 'SET_END_DATE',
	date
});

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			};
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: action.sortBy
			};
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: action.sortBy
			};
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.date
			};
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.date
			};
		default:
			return state;
	}
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDAteMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
		
		return startDateMatch && endDAteMatch && textMatch;
	}).sort((a, b) => {
		if(sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;
		} else if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1;
		}
	});
};

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 3000, createdAt: 300 }));

// store.dispatch(removeExpense({ id: expenseTwo.expense.id }));
// store.dispatch(editExpense(expenseOne.expense.id, { amount: 200000 }));

//store.dispatch(setTextFilter('rent'));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));