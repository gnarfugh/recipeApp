import React, { useEffect, useState } from 'react';
import Recipe from './components/recipe/Recipe';
import Logo from './components/logo/Logo';
import Form from './components/form/Form';
import { getItem } from './components/Methods';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faClock,
	faUsers,
	faWeight,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
const { eKey, eId } = require('./config');

const App = () => {
	const [recipes, setRecipes] = useState([]);
	const [query, setQuery] = useState('');
	const [search, setSearch] = useState('');

	const [error, setError] = useState('');

	library.add(faClock, faUsers, faWeight, faUser);

	useEffect(() => {
		const API = `https://api.edamam.com/search?q=${query}&app_id=${eId}&app_key=${eKey}`;
		getItem(API)
			.then((res) => {
				setRecipes(res.hits);
				setSearch('');
			})
			.catch((err) => {
				setError(err);
			});
	}, [query]);

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
	};

	return (
		<div className='App'>
			<Logo />
			<Form getSearch={getSearch} search={search} updateSearch={updateSearch} />
			{error ? (
				<li>{error.message}</li>
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
						/>
					);
				})
			)}
		</div>
	);
};

export default App;
