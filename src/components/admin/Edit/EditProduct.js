import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import noimage from '../../../assets/images/no-image.png'
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
		categories : [],
		selectedFile:null
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

				//upload image
				if(this.state.selectedFile !== null){
					let product_id = resp.data.productUpdate._id;
					//created form data
					const formData = new FormData();
					formData.append(
						'fileUpload',//name received in api
						this.state.selectedFile,//the file
						this.state.selectedFile.name//file name
					)
					axios.post(`${this.url}/product/upload/${product_id}`, formData)
							.then(res =>{
								console.log('image ok');
							})
							.catch(err =>{
								console.log(err);
							})
				}
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
	//Selected file
	fileChange=(event)=>{
		this.setState({
			selectedFile:event.target.files[0]
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
							<div className="form-group col-md-12">		
								{this.state.product.img && (
									<img  className="imgStore"  alt="imageSi" src={this.url + '/product/getimage/' + this.state.product.img} aly="er" />
								)}
								{!this.state.product && <img className="imgStore" alt="imageNo" src={noimage} aly="er" />}
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
								</div>
								<div className="custom-file">
									<input type="file" name="fileUpload" onChange={this.fileChange} className="custom-file-input"/>
									<label className="custom-file-label" >Choose file</label>
								</div>
							</div>
						</div>
						<div className="text-center">
							<button type="submit" className="btn btn-success" value="Save Product"><i className="fa far fa-save"> Update Product</i></button>
						</div>
					</form>
				</div>
            </div>    
        )
    }
}
