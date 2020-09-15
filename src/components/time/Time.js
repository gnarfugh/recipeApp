import React from '../../../node_modules/react';
import style from './time.module.scss';

const Time = ({ time }) => {
	const ifTimeExist = (time) => {
		if (time === 0) {
			return `Not Provided`;
		} else if (time <= 60) {
			return `${time} mins`;
		} else {
			return `${Math.floor(time / 60)} hrs ${time % 60} mins`;
		}
	};

	return (
		<div className={style.time}>
			<span>{ifTimeExist(time)}</span>
		</div>
	);
};

export default Time;
