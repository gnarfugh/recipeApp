import React from '../../../node_modules/react';
import style from './time.module.scss';

const Time = ({ time }) => {
	const ifTimeExist = (time) => {
		const getHrs = Math.floor(time / 60);
		const getRmdMins = time % 60;

		if (time === 0) {
			return `Not Provided`;
		} else if (time <= 60) {
			return `${time} mins`;
		} else {
			if (time % 60 === 0) {
				return `${getHrs} hrs`;
			} else if (getHrs === 1 && time % 60 !== 0) {
				return `${getHrs} hr ${getRmdMins} mins`;
			} else {
				return `${getHrs} hrs ${getRmdMins} mins`;
			}
		}
	};

	return (
		<div className={style.time}>
			<span>{ifTimeExist(time)}</span>
		</div>
	);
};

export default Time;
