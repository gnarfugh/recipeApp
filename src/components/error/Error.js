import React from '../../../node_modules/react';
import style from './error.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Error = () => {
	return (
		<div className={style.error_container}>
			<FontAwesomeIcon icon='frown' size='6x' />
			<h2>No Results Found </h2>
		</div>
	);
};

export default Error;
