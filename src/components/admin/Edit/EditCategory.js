import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../../../Global';
import swal from 'sweetalert';

class EditCategory extends Component {

	//Refs creation
	codeRef = React.createRef();
	nameRef = React.createRef();

	url = Global.url;
	state = {
		category:{}
	}
	//loading predefined values
    componentDidMount() {
 		axios.get(`${this.url}/category/${this.props.match.params.id}`).then((resp) => {
			if(resp.data.category){
				this.setState({
					category: resp.data.category
				});
				this.nameRef.current.value = this.state.category.name;
				this.codeRef.current.value = this.state.category.code;
			}
		}).catch(err=>{console.log(err)});
    }
    //change State
    changeState = () =>{
        this.setState({
            category :{
				_id : this.state.category._id,
                code: this.codeRef.current.value,
                name : this.nameRef.current.value
            }
		})
	}
	//POST edit category
	edit = (e) =>{
		e.preventDefault();
		let category = {
			id: this.state.category._id,
			name : this.state.category.name
		}
		axios.post(`${this.url}/category/edit`, category)
			 .then(resp =>{
				 this.setState({
					 ...this.state,
					 status:resp.status
				 })
				 swal(
					'Category update',
					'The category was update correctly',
					'success'
				)
			 }).catch(err =>{
				swal(
					'Error',
					'Clould not update',
					'error'
				)
			 })
	}
    render() {
		if(this.state.status === 200){
			return <Redirect to={'/categories'}/>;
		}
		return (
			<div className="container-fluid text-center backcat">
				<div className="row">
					<div className="col-md-12 pt-5">
						<h2>Category Edition</h2>
					</div>
					<form className="col-md-4 offset-md-4 py-4" onSubmit={this.edit}>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="code">Code</label>
								<input type="text" disabled className="form-control" name="code" ref={this.codeRef} placeholder="Code" />
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="name">Name</label>
								<input type="text" className="form-control" onChange={this.changeState} name="name" ref={this.nameRef} placeholder="Name" />
							</div>
						</div>
						<div className="text-center">
							<input type="submit" className="btn btn-success" value="Edit Category"/>
						</div>
					</form>
				</div>
			</div>
		);
    }
}
export default EditCategory;