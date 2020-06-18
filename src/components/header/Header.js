import React from 'react';
import style from './header.module.scss';

const Header = ({ scroll }) => {
	const getScrollClass = (sClass, nClass) => (scroll ? sClass : nClass);
	return (
		<div>
			<h1 className={getScrollClass(style.sHeader, style.nHeader)}>Recipeek</h1>
		</div>
	);
};

export default Header;
