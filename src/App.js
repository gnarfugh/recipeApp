import React, { useEffect, useState } from 'react';
import Recipe from './components/recipe/Recipe';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faUsers, faWeight } from '@fortawesome/free-solid-svg-icons';
import './App.css';
const { KEY } = require('./config');

const App = () => {
	const [recipes, setRecipes] = useState([]);
	const [query, setQuery] = useState('');
	const [search, setSearch] = useState('');
	library.add(faClock, faUsers, faWeight);

	useEffect(() => {
		//const proxy = `https://cors-anywhere.herokuapp.com/`;
		const ID = `a886a42e`;
		const API = `https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${KEY}`;
		const options = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Headers': '*',
			},
		};

		const getRecipes = async () => {
			const res = await fetch(`${API}`, options);
			const data = await res.json();
			setRecipes(data.hits);
			console.log(data.hits);
		};
		getRecipes();
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
			<form onSubmit={getSearch} className='search-form'>
				<input
					className='search-bar'
					type='text'
					value={search}
					onChange={updateSearch}
					placeholder='Search (chicken, soup, pasta, etc) ...'
				/>
				<button className='search-button' type='submit'>
					Search
				</button>
			</form>
			{recipes.map((recipe, i) => {
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
			})}
		</div>
	);
};

export default App;
