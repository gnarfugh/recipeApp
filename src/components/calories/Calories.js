import React from '../../../node_modules/react';
import style from './calories.module.scss';

const Calories = ({ calories, servings }) => {
	const addCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	const newCalories = addCommas(Math.ceil(calories / servings));

	return (
		<div className={style.calories}>
			<span>{newCalories} /</span>
			<span className={style.serving}>serving</span>
		</div>
	);
};

export default Calories;
