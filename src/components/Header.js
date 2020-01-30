import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App'

const Header = () => {
	return (
		<div className="container-fluid p-0">
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
				<div className="container">
					<NavLink className="logo" to="/">
						<p >AppColombiaStore</p>
					</NavLink>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarResponsive"
						aria-controls="navbarResponsive"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item text-center active">
								<NavLink to="/" className="nav-link">
									Home
								</NavLink>
							</li>
							<li className="nav-item text-center">
								<NavLink to="/store" className="nav-link text-center">
									Store
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;
