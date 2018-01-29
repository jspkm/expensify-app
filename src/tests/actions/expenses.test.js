import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});

test('should setup edit expense action object', () => {
	const action = editExpense('123abc', { description: 'water bill', note: 'winter', amount: 1000 });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		update: {
			description: 'water bill', 
			note: 'winter', 
			amount: 1000
		}
	});
});

test('should setup add expense action object with provided value', () => {
	const expenseData = {
		description: 'Rent',
		amount: 123450,
		createdAt: 1000,
		note: 'Jan rent'
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)
		}
	});
});

test('should setup add expense action object with default value', () => {
	const expectedData = {
		description:'', 
		note: '', 
		amount: 0,
		createdAt: 0
	};
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expectedData,
			id: expect.any(String)
		}
	});
});