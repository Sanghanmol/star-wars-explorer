import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
	const { pathname } = useLocation();
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			<div id="root">
				<Navbar onSearch={handleSearch} />
				<main>
					<Outlet context={{ searchQuery }}/>
				</main>
				<Footer />
			</div>
		</MantineProvider>
	);
}
