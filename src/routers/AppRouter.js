import React from 'react';
import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom';

import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={ExpenseDashboardPage} />
				<Route path="/create" component={AddExpensePage} />
				<Route exact path="/edit" component={EditExpensePage} />
				<Route path="/edit/:id" component={EditExpensePage} />
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} />
				</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;