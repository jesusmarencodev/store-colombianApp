import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import face from '../assets/images/face2.jpg';
export default class Home extends Component {
	render() {
		return (
			<div className="container-fluid text-center home ">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="mt-5 text-white font-weight-light">You are User</h1>
                        <div>
                            <Link to={"/user"} className="btn btn-warning">Click here!!</Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h1 className="mt-5 text-white font-weight-light">You are Admin</h1>
                        <div>
                            <Link to={"/admin"} className="btn btn-danger">Click here!!</Link>
                        </div>
                    </div>
                    <div className="col-md-12  my-4">
                        <p className="lead text-white-50 pt35">
                            colombianApp is one of the most incredible stores of Colombian culture, all ethnicities of the country in one place, love your country and its people, feel proud of your race, because within you even a little of each.
                        </p>
                        <img className="face" src={face} alt="race"></img>
                        
                    </div>

                </div>
			</div>
		);
	}
}
