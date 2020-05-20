import React from 'react';

const Rect = ({ x, begin }) => {
	return (
		<rect x={x} y='0' width='4' height='10' fill='#333'>
			<animateTransform
				attributeType='xml'
				attributeName='transform'
				type='translate'
				values='0 0; 0 20; 0 0'
				begin={begin}
				dur='0.6s'
				repeatCount='indefinite'
			/>
		</rect>
	);
};

export default Rect;
