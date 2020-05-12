import React, { Component } from 'react'
import { withRouter} from 'react-router-dom';
import axios from 'axios'

export class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            first_name:"",
            last_name:"",
            email:"",
            password:""
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
        const newUser={
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            email:this.state.email,
            password:this.state.password
        }
        axios.post('http://localhost:8081/users/register',{
            first_name:newUser.first_name,
            last_name:newUser.last_name,
            email:newUser.email,
            password:newUser.password,
        })
        .then(res=>{
            this.props.history.push('/login')
            console.log(res)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text"
                                className="form-control"
                                name="first_name"
                                placeholder="Enter First Name"
                                value={this.state.first_name}
                                onChange={this.onChange}
                                />                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text"
                                className="form-control"
                                name="last_name"
                                placeholder="Enter Last Name"
                                value={this.state.last_name}
                                onChange={this.onChange}
                                />                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter Email"
                                value={this.state.email}
                                onChange={this.onChange}
                                />                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={this.onChange}
                                />                                
                            </div>
                            <button type="submit"className="btn btn-primary btn-block btn-lg">
                                Register
                            </button>
                        </form>
                        <br/>
                        <a href="/login">Already Registered?</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Register)