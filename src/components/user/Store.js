import React, { Component } from 'react';

import axios from 'axios';
import Global from '../../Global';
import Product from './Product';
import Order from './Order';
import '../../App';

export default class Store extends Component {
	url = Global.url;
	state = {
		products: [],
		item:{},
		items:[],
		total:0
	};
	componentDidMount() {
		axios.get(`${this.url}/product/get`).then((resp) => {
			this.setState({
				products: resp.data.products,
				sale:[]
			});
			
		});
	}
	//Receiving from the son
	receiveSon = (data) =>{
		if(data === 'Not Found'){
			console.log(data)
		}else{
			let items=[];
			let arrayItems = this.state.items;
			
			items = arrayItems.filter(item => item.product._id !== data.product._id);
			items.push(data);

			this.setState({
				...this.state.items,
				items,
			})
			
		}
	}


	render() {
		let products = this.state.products;

		return (	
			<div className="container-fluid text-justify">
				{products &&
					<div className="row mx-2 ">
						<div className="col-12 col-md-8 pt-3 ">
							<h4 className="h4 mb-0">Shopping Cart</h4>
							<p className="py-0 mb-0 text-right">
								<small className="d-none d-md-block">Price</small>
							</p>
							<hr className="my-2 my-md-0" />
							{products.map((product, index) => {
								return (
									<Product key={product._id} product={product} index={index} levelUp = {this.receiveSon}></Product>
								);
							})}
						</div>
						<div className="col-12 col-md-4 p-2">
							<Order items={this.state.items}/>
						</div>
					</div>
				}
			</div>
		);
	}
}
