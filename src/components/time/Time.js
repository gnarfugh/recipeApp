import React from '../../../node_modules/react';
import style from './time.module.scss';

const Time = ({ time }) => {
	const hours = h => Math.floor(h / 60);
	const minutes = m => Math.floor(m % 60);
	const ifHourExist = input => (typeof input === 'undefined' ? '0' : input);
	const ifMinuteExist = input => (typeof input === 'undefined' ? '00' : input);
	const ifTimeExist = time => (time === 0 ? 'N/A' : timeString(time));
	const timeString = time => {
		return `${ifHourExist(hours(time))}:${ifMinuteExist(minutes(time))} hrs`;
	};

	return (
		<div className={style.time}>
			<span>{ifTimeExist(time)}</span>
		</div>
	);
};

export default Time;
