import React, { useState } from '../../../node_modules/react';
import Ingredients from '../ingredients/Ingredients';
import Calories from '../calories/Calories';
import Time from '../time/Time';
import Youtube from '../youtube/Youtube';
import style from './recipe.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Recipe = ({ title, image, calories, servings, ingredients, time, scroll }) => {
	const [showVideo, setShowVideo] = useState(false);

	const handleVideo = (e) => {
		e.preventDefault();
		setShowVideo(true);
	};

	const pipe =
		(...fns) =>
		(arg) =>
			fns.reduce((prev, fn) => fn(prev), arg);
	const pipeWith = (arg, ...fns) => pipe(...fns)(arg);

	const recipeText = ['recipe', 'recipes'];
	const recipeTextFilter = (arr) => arr.filter((x) => !recipeText.includes(x));
	const lowerCaseTitle = (title) => title.toLowerCase();
	const titleArr = (title) => title.split(' ');
	const joinArr = (arr) => arr.join(' ');
	const replaceFirstLetter = (string) => string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
	const cleanTitle = (title) =>
		pipeWith(title, lowerCaseTitle, titleArr, recipeTextFilter, joinArr, replaceFirstLetter);

	return (
		<div className={`${style.recipe} ${scroll ? style.recipe_s : ''}`}>
			<ImageContainer image={image} title={title} />
			<article>
				<Title title={cleanTitle(title)} />
				<StatsList servings={servings} time={time} calories={calories} />
				<IngredientTable ingredients={ingredients} />
				<VideoContainer
					showVideo={showVideo}
					handleVideo={handleVideo}
					onChange={handleVideo}
					title={cleanTitle(title)}
					scroll={scroll}
				/>
			</article>
		</div>
	);
};
const Title = ({ title }) => (
	<div className={style.title}>
		<h1>{title}</h1>
	</div>
);
const ImageContainer = ({ image, title }) => {
	return (
		<div className={style.image_container}>
			<img src={image} alt={title} />
		</div>
	);
};
const StatsList = ({ servings, time, calories }) => {
	return (
		<ul className={style.list_items}>
			<li>
				<FontAwesomeIcon icon='users' size='lg' />
				{servings}
			</li>
			<li>
				<FontAwesomeIcon icon='clock' size='lg' />
				<Time time={time} />
			</li>
			<li>
				<FontAwesomeIcon icon='weight' size='lg' />
				<Calories calories={calories} servings={servings} />
			</li>
		</ul>
	);
};
const Video = ({ title }) => {
	return (
		<div>
			<Youtube title={title} />
		</div>
	);
};
const IngredientTable = ({ ingredients }) => {
	return (
		<div className={style.ingredients_container}>
			<h2>Ingredients</h2>
			<ul>
				<Ingredients ingredients={ingredients} />
			</ul>
		</div>
	);
};
const VideoContainer = ({ handleVideo, showVideo, title }) => {
	return (
		<div className={` ${style.video_container} ${showVideo ? style.video_container_clicked : ''}`}>
			{showVideo ? <Video title={title} /> : <button onClick={(e) => handleVideo(e)}>Watch Video</button>}
		</div>
	);
};

export default Recipe;
