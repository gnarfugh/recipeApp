import React from 'react';
import style from './ingredients.module.scss';

const Ingredients = ({ ingredients }) => {
	const getKG = (x) => Math.round(x / 1000);
	const calcWeight = (x) => (x > 1000 ? `${getKG(x)}kg` : `${x}g`);
	const newWeights = ingredients.map((i) => calcWeight(Math.ceil(i.weight)));
	const newIngredients = ingredients.map((ingredient, i) => {
		return {
			text: ingredient.text,
			weight: newWeights[i],
		};
	});

	return (
		<div className={style.ingredients}>
			<ul>
				{newIngredients.map((ingredient, i) => {
					return (
						<li key={i}>
							{ingredient.text}
							<span>({ingredient.weight})</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Ingredients;
