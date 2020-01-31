import React, { Component, Fragment } from 'react';
import '../../App';
import axios from 'axios';
import Global from '../../Global';
import Product from './Product';
import Select from 'react-select';
import swal from 'sweetalert';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();


export default class Store extends Component {

	url = Global.url;

	//Refs creation
	searchProduct = React.createRef();
	searchCategory = React.createRef();
	
	//initial state
	state = {
		products: [],
		item:{},
		items:[],
		total:0
	};
	//loading product list
	componentDidMount() {
		this.getProducts();
		this.getCategories();

	}
	getProducts = () => {
		axios.get(`${this.url}/product/get`).then((resp) => {
			this.setState({
				products: resp.data.products,
				sale:[]
			});
		});
	}
	getCategories = () => {
		axios.get(`${this.url}/category/get`).then((resp) => {
			this.setState({
				categories: resp.data.categories
			});
		}).catch(err=>{console.log(err)})
	}
	//Receiving from the son
	receiveSon = (data) =>{
		console.log(data)
		if(data === 'Not Found'){
			swal(
				"don't worry",
				'this item is no longer available',
				'info'
			)
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

		swal({
			title: "Are you sure?",
			text: "Sure, we may not have inventory later?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			  
			if (willDelete) {
				let arrayItems = this.state.items;
				let items = arrayItems.filter(item => item.product._id !== id);
				this.setState({
					...this.state,
					items
				})
				
			} else {
				swal(
					"don't worry",
					'the item was not deleted',
					'success'
				)
			}
		  });
		
	}
	//save sale
	save = () => {
		let arrayItems = this.state.items;

		if(arrayItems.length > 0){
			let product = {
				items : []
			}
			 for (let index = 0; index < arrayItems.length; index++) {
				product.items.push(arrayItems[index].product)
				product.items[index].product = arrayItems[index].product._id
	
				if(index === arrayItems.length -1){
	
					axios.post(`${this.url}/sale/save`, product)
						 .then(resp => {
							this.getProducts();
							this.setState({
								items:[]
							})

							swal(
								'Generated invoice',
								'Your order will be sent',
								'success'
							)
						 })
						 .catch(err => {
							swal(
								'Error',
								'Could not update',
								'error'
							)
						 })
				}
			} 
		}else{
			swal(
				'Be careful',
				'you must select at least one item',
				'info'
			)
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
							getOptionValue={(options)=> options._id}
							getOptionLabel={(options)=> options.name}
									
						/>
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
															<button  onClick={this.delete(item.product._id)} className="btn btn-danger  m-auto text-center"><i className="fa fas fa-trash"></i></button>
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
