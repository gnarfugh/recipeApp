import React, { useEffect, useState, useReducer } from 'react';
import Recipe from './components/recipe/Recipe';
import Nav from './components/nav/Nav';
import Loader from './components/loader/Loader';
import Error from './components/error/Error';
import { getAPI, scrollToTop } from './components/Methods';
import { library } from '@fortawesome/fontawesome-svg-core';
import { initialStates, searchReducer } from './components/searchReducer';
import {
	faClock,
	faUsers,
	faWeight,
	faUser,
	faFrown,
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
const { eKey, eId } = require('./config');
library.add(faClock, faUsers, faWeight, faUser, faFrown);

const App = () => {
	//Get States
	const [state, dispatch] = useReducer(searchReducer, initialStates);
	const { isLoading, search, query, recipes, noResults } = state;
	const [scrollY, setScrollY] = useState(0);
	const notScroll = scrollY === false;

	//Get States Fns
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
	const yesResults = () => dispatch({ type: 'YES_RESULTS' });

	//Get Data List from API
	useEffect(() => {
		let showRecipesOrNoResults = (res) => {
			if (res.count === 0) {
				fetchFail();
			} else {
				fetchSuccess(res);
				localStorage.setItem(query, JSON.stringify(res));
			}
		};

		let API = `https://api.edamam.com/search?q=${query}&app_id=${eId}&app_key=${eKey}`;
		const getLocalStorageInc = (q) => Object.keys(localStorage).includes(q);

		if (query !== '' && !getLocalStorageInc(query)) {
			yesResults();
			getAPI(API)
				.then((results) => {
					showRecipesOrNoResults(results);
				})
				.catch((error) => {
					fetchFail(error);
				});
		} else if (query !== '' && getLocalStorageInc(query)) {
			yesResults();
			fetchSuccess(JSON.parse(localStorage.getItem(query)));
		}
	}, [query]);

	//Get Scroll Position
	useEffect(() => {
		const addWatch = () => window.addEventListener('scroll', logScroll);
		const removeWatch = () => window.removeEventListener('scroll', logScroll);
		addWatch();
		return () => removeWatch();
	}, [query]);

	//Get App Template
	return (
		<div className='App'>
			<Nav
				getSearch={getSearch}
				search={search}
				updateSearch={updateSearch}
				scroll={scrollY}
			/>

			{/*-- Show Loader --*/}
			{isLoading && notScroll ? (
				<div className='loader_container'>
					<Loader className='loader' />
				</div>
			) : (
				<main className={`${scrollY ? `main_s` : ''}`}>
					{/*--  {Show Error or Recipes} --*/}
					{noResults ? (
						<Error />
					) : (
						recipes.map((recipe, i) => {
							let props = {
								key: i,
								title: recipe.recipe.label,
								calories: recipe.recipe.calories,
								time: recipe.recipe.totalTime,
								image: recipe.recipe.image,
								ingredients: recipe.recipe.ingredients,
								servings: recipe.recipe.yield,
								scroll: scrollY,
							};
							return <Recipe {...props} />;
						})
					)}
				</main>
			)}
		</div>
	);
};

export default App;
