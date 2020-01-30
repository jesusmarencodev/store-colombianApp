import React, { Component } from 'react';
import axios from 'axios';
import OneCategory from './OneCategory';
import Global from '../../Global';
import swal from 'sweetalert';

class Category extends Component {
    //Refs creation
    codeRef = React.createRef();
    nameRef = React.createRef();

    url = Global.url;
	state = {
        categories: [],
        category : {}
	};
	//loading categories	
	componentDidMount() {
		axios.get(`${this.url}/category/get`).then((resp) => {
			this.setState({
				categories: resp.data.categories
			});
		}).catch(err=>{console.log(err)})
    }
    //change State
    changeState = () =>{
        this.setState({
            ...this.state,
            category :{
                code: this.codeRef.current.value,
                name : this.nameRef.current.value
            }
        })
    }
    //Save Category
    saveCategory = (e) =>{
        e.preventDefault();
        
        //fill the state with the form data
        this.changeState();

        //http request to save the category
        axios.post(`${this.url}/category/save`, this.state.category)
             .then(resp =>{
                 if(resp.data.categoryCreated){
                     this.codeRef.current.value = '';
					 this.nameRef.current.value = '';
					 swal(
						'Category created',
						'The category was created correctly',
						'success'
					)
				 }	 
             }).catch(err=> {
				 console.log(err)
				swal(
					'Error',
					'Code already exists',
					'error'
				)
			 });
    }

	render() {
		let { categories } = this.state;
		return (
			<div className="container-fluid text-center backcat">
				<div className="row">
					<div className="col-md-12 pt-5">
						<h2>Category Creation</h2>
					</div>
					<form className="col-md-4 offset-md-4 py-4" onSubmit={this.saveCategory}>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="code">Code</label>
								<input type="text" className="form-control" onChange={this.changeState} name="code" ref={this.codeRef} placeholder="Code" />
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="name">Name</label>
								<input type="text" className="form-control" onChange={this.changeState} name="name" ref={this.nameRef} placeholder="Name" />
							</div>
						</div>
						<div className="text-center">
							<input type="submit" className="btn btn-success" value="Save Category"/>
						</div>
					</form>
				</div>
				<hr />
				<div className="container">
					<div className="text-center row pt-3">
						<div className="col-md-12 pb-3 ">
							<h4 className="text-center">Category List</h4>
						</div>
						<div className="col-md-12 ">
							<ul className="listGroup p-0">
								{categories.map((category) => {
									return (
                                        <OneCategory key={category._id} category={category}/>
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
export default Category;
