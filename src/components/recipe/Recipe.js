import React from '../../../node_modules/react';
import Ingredients from '../ingredients/Ingredients';
import Calories from '../calories/Calories';
import Time from '../time/Time';
import style from './recipe.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Recipe = ({ title, image, calories, servings, ingredients, totalTime }) => {
	return (
		<div className={style.recipe}>
			<div className={style.image_container}>
				<img src={image} alt={title} />
			</div>
			<article>
				<h2>{title}</h2>
				<ul>
					<li>
						<FontAwesomeIcon icon='users' />
						{servings}
					</li>
					<li>
						<FontAwesomeIcon icon='clock' />
						<Time time={totalTime} />
					</li>
					<li>
						<Calories calories={calories} />
					</li>
				</ul>
				<div className='ingredients-container'>
					<ul>
						<Ingredients ingredients={ingredients} />
					</ul>
				</div>
			</article>
		</div>
	);
};

export default Recipe;
