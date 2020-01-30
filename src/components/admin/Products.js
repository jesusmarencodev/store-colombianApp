import React, { Component } from 'react'
import OneProduct from './OneProduct';
import axios from 'axios';
import Global from '../../Global';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import swal from 'sweetalert';
const animatedComponents = makeAnimated();


class Products extends Component {

    url = Global.url;
    //Refs creation
    codeRef = React.createRef();
    nameRef = React.createRef();
    priceRef = React.createRef();
    unitsRef = React.createRef();
	aboutRef = React.createRef();
	
	//initial state
    state = {
        products : [],
        product : {},
        categories : []
	}
	//loading product list
    componentDidMount() {
		axios.get(`${this.url}/category/get`).then((resp) => {
			this.setState({
				categories: resp.data.categories
			});
		}).catch(err=>{console.log(err)});
		this.listProducts();
	}
	//capturing  values
    changeState = () => {
        this.setState({
            ...this.state,
            product :{
                code: this.codeRef.current.value,
                name: this.nameRef.current.value,
                price: this.priceRef.current.value,
                units: this.unitsRef.current.value,
                about: this.aboutRef.current.value,
            }
        }) 
	}
	//category selection
	selectCategory = (category) =>{

		this.setState({
			...this.state,
			category : category._id
		})
    }
	//save product
    saveProduct = (e) => {
        e.preventDefault();
		this.changeState();

 		let productSave = {
			code:this.state.product.code,
			name:this.state.product.name,
			price:this.state.product.price,
			units:this.state.product.units,
			about:this.state.product.about,
			category:this.state.category
		} 
		axios.post(`${this.url}/product/save`, productSave)
			 .then(resp => {
				 if(resp.data.productCreated){
					this.codeRef.current.value = "";
					this.nameRef.current.value = "";
					this.priceRef.current.value = "";
					this.unitsRef.current.value = "";
					this.aboutRef.current.value = "";
					this.setState({
						product: {}
					})
					swal(
						'Product created',
						'The product was created correctly',
						'success'
					)
					this.listProducts();
				 }
			 })
			 .catch(err => {
				swal(
					'Error',
					'Code already exists',
					'error'
				)
			 })
	}
	//list products
	listProducts = () => {
		axios.get(`${this.url}/product/get`)
			 .then(resp => {
				this.setState({
					...this.state,
					products: resp.data.products
				})

			 });
	}
	render() {
		let { products } = this.state;
		return (
			<div className="container-fluid text-center backcat">
				<div className="row">
					<div className="col-md-12 pt-5">
						<h2>Product Creation</h2>
					</div>
					<form className="col-md-4 offset-md-4 py-4" onSubmit={this.saveProduct}>
						<div className="form-row">
							<div className="form-group col-md-12">
								<Select 
									onChange={this.selectCategory}
									options={this.state.categories}
									components={animatedComponents}
									placeholder={'Select Category'}
									getOptionValue={(options)=> options._id}
									getOptionLabel={(options)=> options.name}
									required
								/>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="code">Code</label>
								<input type="text" className="form-control" onChange={this.changeState} name="code" ref={this.codeRef} placeholder="Code" required />
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="name">Name</label>
								<input type="text" className="form-control" onChange={this.changeState} name="name" maxLength="55" ref={this.nameRef} placeholder="Name" required />
							</div>
                            <div className="form-group col-md-6">
								<label htmlFor="price">Price</label>
								<input type="number" min="0" className="form-control" onChange={this.changeState} name="name" ref={this.priceRef} placeholder="Price" required />
							</div>
                            <div className="form-group col-md-6">
								<label htmlFor="units">Units</label>
								<input type="number" min="0" className="form-control" onChange={this.changeState} name="units" ref={this.unitsRef} placeholder="Units" required />
							</div>
                            <div className="form-group col-md-12">
								<label htmlFor="about">About</label>
								<textarea type="text" className="form-control" onChange={this.changeState} name="about" ref={this.aboutRef} placeholder="About" required />
							</div>
						</div>
						<div className="text-center">
							<button type="submit" className="btn btn-success" value="Save Product"><i className="fa far fa-save"> Save Product</i></button>
						</div>
					</form>
				</div>
				<hr />
				<div className="container">
					<div className="text-center row pt-3">
						<div className="col-md-12 pb-3 ">
							<h4 className="text-center">List Products</h4>
						</div>
						<div className="col-md-12 ">
							<ul className="listGroup p-0">
								{products.map((product) => {
									return (
                                        <OneProduct key={product._id} product={product}/>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Products;