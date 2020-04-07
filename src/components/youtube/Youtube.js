import React, { useState, useEffect } from 'react';

const Youtube = ({ title }) => {
	const [video, setVideo] = useState('');
	let titleSearch = `How to make ${title} recipe`;

	useEffect(() => {
		const creds = {
			key: process.env.REACT_APP_YOUTUBE_KEY,
		};
		//const proxy = `https://damp-plateau-34998.herokuapp.com/`;
		const API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&relevanceLanguage=en&q=${titleSearch}&key=${creds.key}`;

		const getVideo = async () => {
			const res = await fetch(API);
			const data = await res.json();
			const url = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
			setVideo({ url });
		};
		getVideo();
	}, [titleSearch]);

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
			/>
		</div>
	);
};

export default Youtube;
