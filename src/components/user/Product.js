import React, { Component } from 'react';
import prueba from '../../assets/images/no-image.png';
import Global from '../../Global';
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

        if(product.quantity >= product.units ){
            this.unitRef.current.value = product.units
        }
        product.quantity = parseInt(this.unitRef.current.value)
        this.setState({
            product
        })
	}
	
	//function that receives data from the child
    comunicationFather = () =>{
        if(this.unitRef.current.value > 0){
            this.props.levelUp(this.state)
        }else{
            this.props.levelUp('Not Found')
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
					{!product.img && <img className="imgStore" alt="imageNo" src={prueba} aly="er" />}
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
							<button className="btn btn-outline-secondary" type="button" id="button-addon1">
								see
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
								+
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
