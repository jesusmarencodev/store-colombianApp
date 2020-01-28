import React, { Component } from 'react'
import axios from 'axios';
import Global from '../../../Global';

class EditCategory extends Component {

	//Refs creation
	codeRef = React.createRef();
	nameRef = React.createRef();

	url = Global.url;
	state = {
		category:{}
	}

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
                code: this.codeRef.current.value,
                name : this.nameRef.current.value
            }
        })
    }
    render() {
		return (
			<div className="container-fluid text-center backcat">
				<div className="row">
					<div className="col-md-12 pt-5">
						<h2>Category Edition</h2>
					</div>
					<form className="col-md-4 offset-md-4 py-4" onSubmit={this.editCategory}>
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