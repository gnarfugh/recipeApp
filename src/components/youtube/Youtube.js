import React, { useState, useEffect } from 'react';
import { getItem } from '../methods';
const { yKey } = require('../../config');

const Youtube = ({ title }) => {
	const [video, setVideo] = useState('');
	let titleSearch = `How to make ${title} recipe`;

	useEffect(() => {
		//const proxy = `https://damp-plateau-34998.herokuapp.com/`;
		const API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&relevanceLanguage=en&q=${titleSearch}&key=${yKey}`;
		getItem(API).then((res) => {
			const url = `https://www.youtube.com/embed/${res.items[0].id.videoId}`;
			setVideo({ url });
		});
	}, [titleSearch]);

	return <VideoContainer title={title} video={video} />;
};

export default Youtube;

const VideoContainer = ({ title, video }) => {
	return (
		<div
			key={title}
			className='video'
			style={{
				position: 'relative',
				paddingBottom: '56.25%' /* 16:9 */,
				paddingTop: 25,
				height: 0,
			}}>
			<iframe
				title={title}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
				}}
				src={video.url}
				frameBorder='0'
				allow='accelerometer;
				gyroscope;
				encrypted-media;
				allowFullScreen'
			/>
		</div>
	);
};
