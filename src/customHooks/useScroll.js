import { useState, useEffect } from 'react';

const useScroll = ({ query }) => {
	const [scrollY, setScrollY] = useState(0);
	const logScroll = () => setScrollY(window.pageYOffset >= 130);
	useEffect(() => {
		const addWatch = () => window.addEventListener('scroll', logScroll);
		const removeWatch = () => window.removeEventListener('scroll', logScroll);
		addWatch();
		return () => removeWatch();
	}, [query]);

	return {
		scrollY,
	};
};

export default useScroll;
