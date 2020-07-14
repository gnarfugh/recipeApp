import React, { useEffect, useState, useReducer } from 'react';
import { initialStates, searchReducer } from './components/searchReducer';
import Recipe from './components/recipe/Recipe';
import Nav from './components/nav/Nav';
import { getItem, scrollToTop } from './components/Methods';
import Loader from './components/loader/Loader';
import Error from './components/error/Error';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
	faClock,
	faUsers,
	faWeight,
	faUser,
	faFrown,
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
const { eKey, eId } = require('./config');

const App = () => {
	const [state, dispatch] = useReducer(searchReducer, initialStates);
	const { isLoading, search, query, recipes, noResults } = state;
	const [scrollY, setScrollY] = useState(0);
	const notScroll = scrollY === false;

	//Fns
	const logScroll = () => setScrollY(window.pageYOffset >= 130);
	const updateSearch = (e) => {
		dispatch({ type: 'UPDATE_SEARCH', payload: e.target.value });
	};
	const getSearch = (e) => {
		e.preventDefault();
		dispatch({ type: 'GET_SEARCH', payload: search });
	};
	const fetchSuccess = (res) => {
		dispatch({ type: 'FETCH_SUCCESS', payload: res.hits });
		scrollToTop();
	};
	const fetchFail = () => dispatch({ type: 'FETCH_FAIL' });

	library.add(faClock, faUsers, faWeight, faUser, faFrown);

	useEffect(() => {
		const API = `https://api.edamam.com/search?q=${query}&app_id=${eId}&app_key=${eKey}`;
		if (query !== '') {
			dispatch({ type: 'YES_RESULTS' });
			getItem(API)
				.then((res) => {
					res.count === 0 ? fetchFail() : fetchSuccess(res);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [query]);

	useEffect(() => {
		const addWatch = () => window.addEventListener('scroll', logScroll);
		const removeWatch = () => window.removeEventListener('scroll', logScroll);
		addWatch();
		return () => removeWatch();
	}, []);

	return (
		<div className='App'>
			<Nav
				getSearch={getSearch}
				search={search}
				updateSearch={updateSearch}
				scroll={scrollY}
			/>
			{isLoading && notScroll ? (
				<div className='loader_container'>
					<Loader className='loader' />
				</div>
			) : (
				<main className={`${scrollY ? `main_s` : ''}`}>
					{noResults ? (
						<Error />
					) : (
						recipes.map((recipe, i) => {
							return (
								<Recipe
									key={i}
									title={recipe.recipe.label}
									calories={recipe.recipe.calories}
									time={recipe.recipe.totalTime}
									image={recipe.recipe.image}
									ingredients={recipe.recipe.ingredients}
									servings={recipe.recipe.yield}
									scroll={scrollY}
								/>
							);
						})
					)}
				</main>
			)}
		</div>
	);
};

export default App;
