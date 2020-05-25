import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

import { API_URL } from '../helpers/utils.js';
import { loginUser } from '../actions/authActions.js';
import { clearErrors } from '../actions/popUpActions.js';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:"",
            password:""
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentDidUpdate(prevProps){
        const { popUp } = this.props;
        if(popUp !== prevProps.popUp){
            if(popUp.id === 'LOGIN_FAIL'){
                this.setState({
                    msg:popUp.msg.msg
                });
                setTimeout(() => {
                    this.props.clearErrors()
                }, 2500);
            }else{
                this.setState({
                    msg:null
                })
            }
        }
        if(this.props.isAuthenticated && this.props.token)
            this.props.history.push('/campaigns/create/mail-content')        
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e){
        e.preventDefault()
        const user={
            email:this.state.email,
            password:this.state.password
        }
        this.props.loginUser(user);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            {
                                this.state.msg ? (
                                    <Alert color="danger">{this.state.msg}</Alert>  
                                ) : null 
                                                        
                            }       
                            {
                                this.state.notification ? (
                                    <Alert color="success">{this.state.notification}</Alert>  
                                ) : null                                                         
                            }                     
                            <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
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
                                Sign In
                            </button>
                        </form>
                        <br/>
                        <a href="/register">New User?</a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated,
    token:state.auth.token,
    popUp:state.popUp
})

export default connect(mapStateToProps, { loginUser , clearErrors })(withRouter(Login));