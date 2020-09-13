import React from '../../../node_modules/react';
import style from './time.module.scss';

const Time = ({ time }) => {
	const minutes = (m) => Math.floor(m % 60);
	const ifTimeExist = (time) => (time === 0 ? 'N/A' : timeString(time));
	const timeString = (time) => `${minutes(time)} minutes`;

	return (
		<div className={style.time}>
			<span>{ifTimeExist(time)}</span>
		</div>
	);
};

export default Time;
