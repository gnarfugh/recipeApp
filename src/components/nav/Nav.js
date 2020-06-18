import React, { useEffect, useState } from 'react';
import Logo from '../logo/Logo';
import Header from '../header/Header';
import Form from '../form/Form';
import style from './nav.module.scss';

const Nav = ({ getSearch, search, updateSearch }) => {
	const [scrollY, setScrollY] = useState(0);
	const logScroll = () => setScrollY(window.pageYOffset >= 60);

	useEffect(() => {
		const addWatch = () => window.addEventListener('scroll', logScroll);
		const removeWatch = () => window.removeEventListener('scroll', logScroll);
		addWatch();
		return () => removeWatch();
	}, []);

	return (
		<div className={style.navWrapper}>
			<div className={scrollY ? style.sticky : style.normal}>
				<div className={style.logo_group}>
					<Logo scroll={scrollY} />
					<Header scroll={scrollY} />
				</div>
				<Form
					scroll={scrollY}
					getSearch={getSearch}
					search={search}
					updateSearch={updateSearch}
				/>
			</div>
		</div>
	);
};

export default Nav;
