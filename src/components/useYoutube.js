import { useState, useEffect } from 'react';
import { getAPI } from './Methods';
const { yKey } = require('../config');

const useYoutube = ({ title }) => {
	const [video, setVideo] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	let titleSearch = `How to make ${title} recipe`;

	useEffect(() => {
		setIsLoading(true);
		const API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&relevanceLanguage=en&q=${titleSearch}&key=${yKey}`;
		getAPI(API).then((res) => {
			const url = `https://www.youtube.com/embed/${res.items[0].id.videoId}`;
			setVideo({ url });
			const timer = setTimeout(() => {
				setIsLoading(false);
			}, 2000);
			return () => {
				clearTimeout(timer);
			};
		});
	}, [titleSearch]);

	return { video, isLoading };
};

export default useYoutube;
