import React from 'react';
import Logo from '../logo/Logo';
import Header from '../header/Header';
import Form from '../form/Form';
import style from './nav.module.scss';

const Nav = ({ getSearch, search, updateSearch, scroll }) => {
	return (
		<div className={style.navWrapper}>
			<div className={scroll ? style.sticky : style.normal}>
				<div className={style.logoGroup}>
					<Logo scroll={scroll} />
					<Header scroll={scroll} />
				</div>
				<Form
					scroll={scroll}
					getSearch={getSearch}
					search={search}
					updateSearch={updateSearch}
				/>
			</div>
		</div>
	);
};

export default Nav;
