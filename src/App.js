import React from 'react';
import Recipe from './components/recipe/Recipe';
import Nav from './components/nav/Nav';
import Loader from './components/loader/Loader';
import Error from './components/error/Error';
import useRecipe from './components/useRecipe';
import useScroll from './components/useScroll';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faClock,
	faUsers,
	faWeight,
	faUser,
	faFrown,
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
library.add(faClock, faUsers, faWeight, faUser, faFrown);

const App = () => {
	const {
		updateSearch,
		getSearch,
		isLoading,
		recipes,
		noResults,
		search,
		query,
	} = useRecipe(null);
	const { scrollY } = useScroll(query);
	const notScroll = scrollY === 0;

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
