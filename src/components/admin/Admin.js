import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Admin extends Component {
	render() {
		return (
			<div className="container-fluid text-center back p-5">
				<div className="row">
					<div className="col-md-6 p-5">
						<div className="card">
							<div className="container">
								<h4>
									<b>Categories</b>
								</h4>
								<p>create categories so that your products are found faster</p>
                                <div className="py-1">
                                    <Link to={'/categories'} className="btn btn-success">Create Category</Link>
                                </div>
							</div>
						</div>
					</div>
					<div className="col-md-6 p-5">
						<div className="card">
							<div className="container">
								<h4>
									<b>Products</b>
								</h4>
								<p>register your products here, remember to add a description</p>
                                <div className="py-1">
                                    <Link to={'/products'} className="btn btn-success">Create Products</Link>
                                </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
