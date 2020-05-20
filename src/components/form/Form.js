import React from 'react';

const Form = ({ getSearch, search, updateSearch }) => {
	return (
		<React.Fragment>
			<form onSubmit={getSearch} className='search-form'>
				<input
					className='search-bar'
					type='text'
					value={search}
					onChange={updateSearch}
					placeholder='Search Food...'
				/>
				<button className='search-button' type='submit'>
					Search
				</button>
			</form>
		</React.Fragment>
	);
};

export default Form;
