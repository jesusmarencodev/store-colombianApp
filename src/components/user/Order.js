import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../App';

export default class Order extends Component {
	state = {
		total: 0,
		items: []
	};

	//calculating the order total
	total = (items) => {
		let total = 0;

		for (let index = 0; index < items.length; index++) {
			total += items[index].product.price * items[index].product.quantity;
			if (index === items.length - 1) {
				return total;
			}
		}
	};
	prueba = () =>{
		console.log("es una prueba")
	}

	//delete items
	delete = (index) => () =>{
		let items 
	}

	render() {
		let { items } = this.props;
		let total = this.total(items);
		console.log(this.state)


		return (
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
					<p className="font-weight-bold text-success">
						Total({`${items.length} items`}):${total}
					</p>
					<ul className="pl-0">
						{items.map((item, index) => {
							return (
								<Fragment  key={item.product._id}>
									<li className="row d-flex  about" onCompositionUpdate={this.prueba}>
										<div className="col-9 mr-0">
											<p className="col-9 font-weight-bold mr-0">{item.product.name}</p>
										</div>
										<div className="col-2 d-flex text-center align-items-center justify-content-center">
											<button onClick={this.delete(index)} className="btn btn-danger col-2 m-auto">-</button>
										</div>
										<hr/>
										<div className="col-12">
											<p className="pl-3 mb-0">Unit Price: ${item.product.price}</p>
											<p className="pl-3 mb-0">Units: {item.product.quantity}</p>
											<p className="pl-3 mb-0">Total item: ${item.product.price * item.product.quantity}</p>
										</div>
									</li>
									<hr/>
								</Fragment>
							);
						})}
					</ul>

					<Link to={'/products'} className="btn btn-warning btn-block">
						Proceed to checkout
					</Link>
				</div>
			</div>
		);
	}
}
