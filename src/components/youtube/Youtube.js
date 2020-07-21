import React, { useState, useEffect } from 'react';
import Loader from '../loader/Loader';
import { getAPI } from '../Methods';
const { yKey } = require('../../config');

const Youtube = ({ title }) => {
	const [video, setVideo] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	let titleSearch = `How to make ${title} recipe`;

	useEffect(() => {
		setIsLoading(true);
		//const proxy = `https://damp-plateau-34998.herokuapp.com/`;
		const API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&relevanceLanguage=en&q=${titleSearch}&key=${yKey}`;
		getAPI(API).then((res) => {
			const url = `https://www.youtube.com/embed/${res.items[0].id.videoId}`;
			setVideo({ url });
			const timer = setTimeout(() => {
				setIsLoading(false);
			}, 2000);
			return () => clearTimeout(timer);
		});
	}, [titleSearch]);

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
