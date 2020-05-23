import React from 'react';
import Rect from './Rect';
import style from './loader.module.scss';

const Loader = () => {
	const rectObj = [
		{ id: 1, x: '0', begin: '0' },
		{ id: 2, x: '10', begin: '0.2s' },
		{ id: 3, x: '20', begin: '0.4s' },
	];
	return (
		<div className={style.loader} title='4'>
			<svg
				version='1.1'
				id='Layer_1'
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				x='0px'
				y='0px'
				width='54px'
				height='60px'
				viewBox='0 0 24 30'
				style={{ enableBackground: 'new 0 0 54 60' }}
				xmlSpace='preserve'>
				{rectObj.map((x) => {
					return <Rect key={x.id} x={x.x} begin={x.begin} />;
				})}
			</svg>
		</div>
	);
};
export default Loader;
