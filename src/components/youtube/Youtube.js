import React from 'react';
import Loader from '../loader/Loader';
import useYoutube from '../useYoutube';

const Youtube = ({ title }) => {
	const { video, isLoading } = useYoutube(title);

	return isLoading ? (
		<Loader />
	) : (
		<VideoContainer title={title} video={video} />
	);
};

export default Youtube;

const VideoContainer = ({ title, video }) => {
	return (
		<div
			key={title}
			className='video'
			style={{
				paddingBottom: '56.25%' /* 16:9 */,
				paddingTop: 25,
				height: 0,
				borderRadius: '5px',
			}}>
			<iframe
				title={title}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					borderRadius: '5px',
				}}
				src={video.url}
				frameBorder='0'
				allow='accelerometer;
				gyroscope;
				encrypted-media;
				'
			/>
		</div>
	);
};
