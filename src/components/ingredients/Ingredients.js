import React from '../../../node_modules/react';
import style from './ingredients.module.scss';

const Ingredients = ({ ingredients }) => {
	const getKG = x => Math.round(x / 1000);
	const calcWeight = x => (x > 1000 ? `${getKG(x)}kg` : `${x}g`);
	const newWeights = ingredients.map(i => calcWeight(Math.ceil(i.weight)));
	const newIngredients = ingredients.map((ingredient, i) => {
		return {
			text: ingredient.text,
			weight: newWeights[i]
		};
	});

	return (
		<div className={style.ingredients}>
			<ul>
				{newIngredients.map((ingredient, i) => {
					return (
						<React.Fragment key={i}>
							<li>
								{ingredient.text}
								<span>({ingredient.weight})</span>
							</li>
						</React.Fragment>
					);
				})}
			</ul>
		</div>
	);
};

export default Ingredients;
