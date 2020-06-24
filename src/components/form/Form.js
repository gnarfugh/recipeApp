import React from 'react';
import style from './form.module.scss';

const Form = ({ scroll, getSearch, search, updateSearch }) => {
	return (
		<React.Fragment>
			<form
				onSubmit={getSearch}
				className={`${style.searchForm} ${scroll ? style.searchForm_s : ''}`}>
				<input
					className={`${style.searchBar} ${
						scroll ? style.padding_s : style.padding_n
					}`}
					type='text'
					value={search}
					onChange={updateSearch}
					placeholder='Search Food...'
				/>
				<button
					className={`${style.searchButton} ${
						scroll ? style.padding_s : style.padding_n
					}`}
					type='submit'>
					Search
				</button>
			</form>
		</React.Fragment>
	);
};

export default Form;
