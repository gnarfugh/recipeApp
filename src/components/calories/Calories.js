import React from '../../../node_modules/react';
import style from './calories.module.scss';

const Calories = ({ calories }) => {
	const addCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	const newCalories = addCommas(Math.ceil(calories));

	return (
		<div className={style.calories}>
			<h2>Calories: </h2>
			<h3>{newCalories}</h3>
		</div>
	);
};

export default Calories;
