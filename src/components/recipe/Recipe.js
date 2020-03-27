import React from '../../../node_modules/react';
import Ingredients from '../ingredients/Ingredients';
import Calories from '../calories/Calories';
import Time from '../time/Time';
import style from './recipe.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Recipe = ({ title, image, calories, servings, ingredients, time }) => {
	return (
		<div className={style.recipe}>
			<div className={style.image_container}>
				<img src={image} alt={title} />
			</div>
			<article>
				<h1>{title}</h1>
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
				<div className={style.ingredients_container}>
					<h2>Ingredients</h2>
					<ul>
						<Ingredients ingredients={ingredients} />
					</ul>
				</div>
			</article>
		</div>
	);
};

export default Recipe;
