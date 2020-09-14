import { useEffect, useReducer } from 'react';
import { initialStates, searchReducer } from './searchReducer';
import { getAPI, scrollToTop } from './Methods';
const { eKey, eId } = require('../config');

const useRecipe = () => {
	const [state, dispatch] = useReducer(searchReducer, initialStates);
	const { isLoading, search, query, recipes, noResults } = state;

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

		const timer = setTimeout(() => {
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
		}, 800);
		return () => {
			clearTimeout(timer);
		};
	}, [query]);

	return {
		updateSearch,
		getSearch,
		fetchSuccess,
		fetchFail,
		yesResults,
		isLoading,
		recipes,
		noResults,
		search,
		query,
	};
};

export default useRecipe;
