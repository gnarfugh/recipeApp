import React, { useEffect, useState } from 'react';
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

// const initialStates = {
// 	recipes: [],
// 	query: '',
// 	isLoading: false,
// 	search: '',
// 	error: '',
// 	noResults: false,
// 	scrollY: 0,
// };

// const searchReducer = (state = '', action) => {
// 	switch (action.type) {
// 		case 'searched': {
// 			return {
// 				...state,
// 				isLoading: false,
// 			};
// 		}
// 		default:
// 			break;
// 	}
// 	return state;
// };

const App = () => {
	//const [state, dispatch] = useReducer(searchReducer, initialStates);
	//const { isLoading } = state;
	const [recipes, setRecipes] = useState([]);
	const [query, setQuery] = useState('');
	const [search, setSearch] = useState('');
	//const [error, setError] = useState('');
	const [noResults, setNoResults] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [scrollY, setScrollY] = useState(0);

	const logScroll = () => setScrollY(window.pageYOffset >= 130);
	const notScroll = scrollY === false;
	const updateSearch = (e) => setSearch(e.target.value);
	const getSearch = (e) => {
		e.preventDefault();
		// dispatch({ type: 'searched' });
		setIsLoading(true);
		setQuery(search);
	};

	library.add(faClock, faUsers, faWeight, faUser, faFrown);

	useEffect(() => {
		const API = `https://api.edamam.com/search?q=${query}&app_id=${eId}&app_key=${eKey}`;
		if (query !== '') {
			setNoResults(false);
			getItem(API)
				.then((res) => {
					if (res.count === 0) {
						setIsLoading(false);
						setNoResults(true);
						setSearch('');
						return;
					} else {
						// dispatch({ type: 'searched' });
						setIsLoading(false);
						setRecipes(res.hits);
						scrollToTop();
						setSearch('');
					}
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
