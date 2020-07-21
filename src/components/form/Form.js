import React from 'react';
import style from './form.module.scss';

const Form = ({ scroll, getSearch, search, updateSearch }) => {
	return (
		<>
			<form
				onSubmit={getSearch}
				className={`${style.searchForm} ${scroll ? style.searchForm_s : ''}`}>
				<input
					className={`${style.searchBar} ${
						scroll ? style.searchBar_s : style.searchBar_n
					}`}
					type='text'
					value={search}
					onChange={updateSearch}
					placeholder='Search Food...'
				/>
				<button
					className={`${style.searchButton} ${
						scroll ? style.searchButton_s : style.searchButton_n
					}`}
					type='submit'>
					Search
				</button>
			</form>
		</>
	);
};

export default Form;
