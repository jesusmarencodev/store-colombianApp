import React, { Component } from 'react';
import noimage from '../../assets/images/no-image.png';
import Global from '../../Global';
import swal from 'sweetalert';
import '../../App';

export default class Product extends Component {
	url = Global.url;

	//Refs creation
	unitRef = React.createRef();
	
	//Initial State
    state ={
        product:this.props.product
	}

	//capturing  values
    changeState = () =>{
        let product = this.state.product;

        if(product.quantity > product.units ){
            this.unitRef.current.value = product.units;
        }
        product.quantity = parseInt(this.unitRef.current.value);
        this.setState({
            product
        })
	}
	
	//function that receives data from the child
    comunicationFather = () =>{
        if(this.unitRef.current.value > 0){
			let product = this.state.product;
			if(product.quantity > product.units ){
				this.unitRef.current.value = product.units;
				product.quantity = parseInt(this.unitRef.current.value);
				swal(
					"don't worry",
					'there is no such amount in inventory',
					'info'
				)
				this.setState({
					product
				})
			}else{
				this.props.levelUp(this.state);
			}
            
        }else{
			this.props.levelUp('Not Found');
        }
    }
	render() {
		const {product} = this.props;
		//console.log(product)
		return (
			<div key={product._id} className="row py-3 border-bottom d-md-flex">
				<div className="col-12 col-md-3 text-center">
					{product.img && (
						<img  className="imgStore"  alt="imageSi" src={this.url + '/product/getimage/' + product.img} aly="er" />
					)}
					{!product.img && <img className="imgStore" alt="imageNo" src={noimage} aly="er" />}
				</div>
				<div className="col-12 col-md-9 about text-center">
					<div className="d-md-flex justify-content-between about">
						<strong className="name ">{product.name}</strong>
						<strong className="d-none d-md-block">${product.price}</strong>
					</div>
					<p className="pt-3 text-info text-md-left about">
						Categoy: <span className="text-dark">{product.category.name}</span>
					</p>
					<p className="text-info text-md-left about">
						Units: <span className="text-dark">{product.units}</span>
					</p>
					<p className="text-md-left name">About: {product.about}</p>
					<p className="d-block  d-md-none">${product.price}</p>

					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<button className="btn btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalProduct">
							<i className="fa far fa-eye"></i>  Detail 
							</button>
						</div>
						<input
                        onChange={this.changeState}
                            ref={this.unitRef}
							type="number"
							min="0"
                            defaultValue="0"
							className="form-control"
							placeholder="quantity"
							aria-label="Recipient's quantity"
						/>
						<div className="input-group-append">
							<button
                                onClick={this.comunicationFather}
								className="btn btn-outline-warning"
								
							>
								<i className="fa fas fa-plus"></i>
							</button>
						</div>
					</div>
				</div>
				{/* Modal */}
				<div className="modal fade" id="modalProduct"  role="dialog" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h2>Detail</h2>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body" >
								<div className="text-center overImage">
										{product.img && (
											<img  className="imgStore"  alt="imageSi" src={this.url + '/product/getimage/' + product.img} aly="er" />
										)}
										{!product.img && <img className="imgStore" alt="imageNo" src={noimage} aly="er" />}
								</div>
								<div>
									<p className="font-weight-bold">Nombre: <span className="name">{product.name}</span></p>
									<p className="font-weight-bold">About: <span className="name">{product.about}</span></p>
									<p className="font-weight-bold">Category: <span className="name">{product.category.name}</span></p>
									<p className="font-weight-bold">Price: <span className="name">${product.price}</span></p>
									<p className="font-weight-bold">Units: <span className="name">{product.units}</span></p>

								</div>	
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
