import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Global from '../../../Global';
import axios from 'axios';
import swal from 'sweetalert';


export default class EditProduct extends Component {

    url = Global.url;
    //Refs creation
    codeRef = React.createRef();
    nameRef = React.createRef();
    priceRef = React.createRef();
    unitsRef = React.createRef();
	aboutRef = React.createRef();
	categoryRef = React.createRef();
	//initial state
    state = {
        product : {},
        categories : []
	}
	//loading predefined values
    componentDidMount() {
        axios.get(`${this.url}/product/${this.props.match.params.id}`)
             .then(resp => {
				this.setState({
					product: resp.data.product
				})
				this.codeRef.current.value = resp.data.product.code;
				this.nameRef.current.value = resp.data.product.name;
				this.priceRef.current.value = resp.data.product.price;
				this.unitsRef.current.value = resp.data.product.units;
				this.aboutRef.current.value = resp.data.product.about;
				this.categoryRef.current.value = resp.data.product.category.name;

			 }).catch(err => console.log(err));
			
		axios.get(`${this.url}/category/get`)
			 .then((resp) => {
				this.setState({
					categories: resp.data.categories
				});
		}).catch(err=>{console.log(err)});
	}
	//capturing new values
    changeState = () => {
        this.setState({
            ...this.state,
            product :{
				_id: this.state.product._id,
                name: this.nameRef.current.value,
                price: this.priceRef.current.value,
                units: this.unitsRef.current.value,
				about: this.aboutRef.current.value,
            }
		}) 
	}
	//update product
	updateProduct = (e) =>{
		e.preventDefault();
		axios.post(`${this.url}/product/edit`, this.state.product)
			 .then(resp => {
				this.setState({
					...this.state,
					status:resp.status
				});
				swal(
					'Product updated',
					'The product was update correctly',
					'success'
				)
			 }).catch(err => {
				swal(
					'Error',
					'Could not update',
					'error'
				)
			 })
	}
    render() {
		if(this.state.status === 200){
			return <Redirect to={'/products'}/>;
		}
        return (
			<div className="container-fluid text-center backcat">
				<div className="row">
					<div className="col-md-12 pt-5">
						<h2>Product Update</h2>
					</div>
					<form className="col-md-4 offset-md-4 py-4" onSubmit={this.updateProduct}>
						<div className="form-row">
							<div className="form-group col-md-12">			
								<label htmlFor="name">Category</label>
								<input type="text" className="form-control" disabled onChange={this.changeState} name="name" ref={this.categoryRef} placeholder="Name" />
							</div>
                            <div className="form-group col-md-6">
								<label htmlFor="code">Code</label>
								<input type="text" disabled className="form-control" onChange={this.changeState} name="code" ref={this.codeRef} placeholder="Code" />
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="name">Name</label>
								<input type="text" className="form-control" onChange={this.changeState} name="name" ref={this.nameRef} placeholder="Name" />
							</div>
                            <div className="form-group col-md-6">
								<label htmlFor="price">Price</label>
								<input type="number" min="0" className="form-control" onChange={this.changeState} name="name" ref={this.priceRef} placeholder="Price" />
							</div>
                            <div className="form-group col-md-6">
								<label htmlFor="units">Units</label>
								<input type="number" min="0" className="form-control" onChange={this.changeState} name="units" ref={this.unitsRef} placeholder="Units" />
							</div>
                            <div className="form-group col-md-12">
								<label htmlFor="about">About</label>
								<textarea type="text" className="form-control" onChange={this.changeState} name="about" ref={this.aboutRef} placeholder="About" />
							</div>
						</div>
						<div className="text-center">
							<input type="submit" className="btn btn-success" value="Save Product"/>
						</div>
					</form>
				</div>
            </div>    
        )
    }
}
