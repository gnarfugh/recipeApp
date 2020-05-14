// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
	eKey: process.env.REACT_APP_EDAMAM_KEY,
	eId: process.env.REACT_APP_EDAMAM_ID,
	yKey: process.env.REACT_APP_YOUTUBE_KEY,
};
