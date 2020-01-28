import React, { Component } from 'react';
import Order from './Order';
import prueba from '../../assets/images/face2.jpg';
import axios from 'axios';
import Global from '../../Global';
import '../../App'

export default class Store extends Component {
	url = Global.url;
	state = {
		products: []
	};
	componentDidMount() {
		axios.get(`${this.url}/product/get`).then((resp) => {
			this.setState({
				products: resp.data.products
			});
			console.log(this.state);
		});
	}
	render() {
        const storeInput = {
            width:'30px'
          };
		let products = this.state.products;
		return (
			<div className="container-fluid text-justify">
				<div className="row mx-2 ">
					<div className="col-12 col-md-8 pt-3 ">
						<h4 className="h4 mb-0">Shopping Cart</h4>
						<p className="py-0 mb-0 text-right">
							<small className="d-none d-md-block">Price</small>
						</p>
						<hr className="my-2 my-md-0" />
						{products.map((product) => {
							return (
								<div key={product._id} className="row py-3 border-bottom d-md-flex">
									<div className="col-12 col-md-3 text-center">
                                        <img className="imgStore"  src={prueba} aly="er" />
                                    </div>
                                    <div className="col-12 col-md-9 about text-center">
                                        <div className="d-md-flex justify-content-between">
                                            <strong className="name">{product.name}</strong>
                                            <strong className="d-none d-md-block">${product.price}</strong>
                                        </div>
                                        <p className="pt-3 text-info text-md-left">Categoy:<span className="text-dark">{product.category.name}</span></p>
                                        <p className="text-md-left">{product.about}</p>
                                        <p className="d-block  d-md-none">${product.price}</p>
                                        <p className="pt-3 text-info text-md-left">
                                            <input  className="form-control storeInput" style={{width:'30px !important'}} type="number" />
                                            <button className="btn btn-warning">+</button>
                                        </p>
                                    </div>
                        
								</div>
							);
						})}
					</div>
					<div className="col-12 col-md-4 p-2">
						<div className="p-2 card">
							<strong>
								<p style={{ fontSize: '12px' }}>
									Items added:{' '}
									<span className="font-weight-normal">
										In this section the items you want to buy will be added.
									</span>
									<span> Remember your shipment is free.</span>
								</p>
							</strong>
							<hr className="m-0" />
							<div className="py-2">
								<p className="font-weight-bold text-success">Total(2 items):$4512</p>
								<input
									type="submit"
									className="btn btn-warning btn-block"
									value="Proceed to checkout"
								/>
							</div>
						</div>
                        
					</div>
				</div>
			</div>
		);
	}
}
