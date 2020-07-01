import React from '../../../node_modules/react';
import style from './calories.module.scss';

const Calories = ({ calories, servings }) => {
	const addCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	const newCalories = addCommas(Math.ceil(calories / servings));

	return (
		<div className={style.calories}>
			<span className={style.newCalories}>{newCalories}</span>
			<div className={style.calorieMetrics}>
				<span className={style.serving}>cal.</span>
				<span className={style.serving}></span>
			</div>
		</div>
	);
};

export default Calories;
