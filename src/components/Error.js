import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<div>
			<section id="wrapper" className="error-page">
				<div className="error-box">
					<div className="error-body text-center">
						<h1 className="text-info">400</h1>
						<h3 className="text-uppercase">Page Not Found !</h3>
						<p className="text-muted mt-4 mb-4">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
						<Link to={"/"} className="btn btn-info btn-rounded waves-effect waves-light mb-5">
							Back to home
						</Link>

					</div>
					
				</div>
			</section>
		</div>
	);
};

export default Error;
