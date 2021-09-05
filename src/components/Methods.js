import axios from 'axios';

export const callAll =
	(...fns) =>
	(...args) =>
		fns.forEach((fn) => fn && fn(...args));

export const getAPI = async (url) => {
	return axios
		.get(url)
		.then((res) => {
			return res.data;
		})
		.catch((err) => console.log(err));
};

export const scrollToTop = () => window.scrollTo(315, 315);
export const logScroll = (fn) => fn(window.pageYOffset >= 130);
