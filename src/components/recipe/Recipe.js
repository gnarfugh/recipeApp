import React, { useState } from '../../../node_modules/react';
import Ingredients from '../ingredients/Ingredients';
import Calories from '../calories/Calories';
import Time from '../time/Time';
import Youtube from '../youtube/Youtube';
import style from './recipe.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Recipe = ({ title, image, calories, servings, ingredients, time }) => {
	const [showVideo, setShowVideo] = useState(false);

	const handleVideo = (e) => {
		e.preventDefault();
		setShowVideo(true);
	};

	return (
		<div className={style.recipe}>
			<ImageContainer image={image} title={title} />
			<article>
				<Title title={title} />
				<StatsList servings={servings} time={time} calories={calories} />
				<IngredientTable ingredients={ingredients} />
				{showVideo ? (
					<Video title={title} />
				) : (
					<VideoFake handleVideo={handleVideo} onChange={handleVideo} />
				)}
			</article>
		</div>
	);
};
const Title = ({ title }) => <h1>{title}</h1>;
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
const VideoFake = ({ handleVideo, title }) => {
	return (
		<div className={style.video_container}>
			<button onClick={(e) => handleVideo(e)}>Watch Video</button>
		</div>
	);
};

export default Recipe;
