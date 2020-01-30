import React, { Component, Fragment } from 'react';
import '../../App';
import axios from 'axios';
import Global from '../../Global';
import Product from './Product';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();




export default class Store extends Component {

	searchProduct = React.createRef();
	searchCategory = React.createRef();

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
		axios.get(`${this.url}/category/get`).then((resp) => {
			console.log(resp)
			this.setState({
				categories: resp.data.categories
			});
		}).catch(err=>{console.log(err)})
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
	//delete items 
	delete = (id) => () => {
		let arrayItems = this.state.items;
		let items = arrayItems.filter(item => item.product._id !== id);
		this.setState({
			...this.state,
			items
		})
		
	}
	//save sale
	save = () => {
		let arrayItems = this.state.items;
		let product = {
			items : []
		}
 		for (let index = 0; index < arrayItems.length; index++) {
			product.items.push(arrayItems[index].product)
			product.items[index].product = arrayItems[index].product._id

			if(index === arrayItems.length -1){
				console.log(product)
				axios.post(`${this.url}/sale/save`, product)
					 .then(resp => {
						 console.log(resp)
					 })
					 .catch(err => console.log(err))
			}
		} 
		
	}
	//Search listener
	searchListener = () => {
		axios.get(`${this.url}/product/search/products/${this.searchProduct.current.value}`)
			 .then(resp => {
				 this.setState({
					 ...this.state,
					 products: resp.data.products
				 })
			 })
			 .catch(err => console.log(err))
	}
	//Search selectCategory
	searchSelectCategory = (category) =>{
		axios.get(`${this.url}/product/category/${category._id}`)
			 .then(resp => {
				this.setState({
					...this.state,
					products: resp.data.products
				})
			 })
    }


	
	render() {
		let products = this.state.products;
		let total = this.total(this.state.items);

		return (	
			<div className="container-fluid text-justify">
				<div className="mx-4 py-2 row col-12 col-md-8 text-center justify-content-between">
					<div className="col-5">
						<label>Serch Product</label>
						<input className=" mr-2 form-control" type="text" onChange={this.searchListener} ref={this.searchProduct}/>		
					</div>
					<div className="col-5">
						<label>By Category</label>	
						<Select 
							onChange={this.searchSelectCategory}
							options={this.state.categories}
							components={animatedComponents}
							placeholder={'Select Category'}
							getOptionValue={(options)=> options._id}
							getOptionLabel={(options)=> options.name}
									
						/>
						{/* <input className="form-control" type="text" onChange={this.searchListenerCategory} ref={this.searchCategory}/> */}
					</div>
				</div>
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
							{/* <Order items={this.state.items}/> */}
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
										Total({`${this.state.items.length} items`}):${total}
									</p>
									<ul className="pl-0">
										{this.state.items.map((item, index) => {
											return (
												<Fragment  key={item.product._id}>
													<li className="row d-flex  about" onCompositionUpdate={this.prueba}>
														<div className="col-9 mr-0">
															<p className="col-9 font-weight-bold mr-0">{item.product.name}</p>
														</div>
														<div className="col-2 d-flex text-center align-items-center justify-content-center">
															<button  onClick={this.delete(item.product._id)} className="btn btn-danger col-2 m-auto">-</button>
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

									<button onClick={this.save} className="btn btn-warning btn-block">
										Proceed to checkout
									</button>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}
