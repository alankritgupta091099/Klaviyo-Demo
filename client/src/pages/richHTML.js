import React from 'react';
//import { Modal, ModalHeader, ModalBody, ModalFooter , Table , Row, Col , Container } from 'reactstrap';
import Modal  from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { withRouter , Redirect , Link } from 'react-router-dom';
import { initializeEmail , loadEmailList , deleteEmail ,loadSelectedEmail } from '../actions/emailActions.js';

class RichHTML extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            emailName:""
         }
         this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
  
    onSubmit(e){
        e.preventDefault();
        const newEmail={
            email_name : this.state.emailName,
            email_id : uuidv4()
        }
        this.props.initializeEmail(newEmail)
        this.props.handleModalOpen();
    }
    render(){
        return(
        <>
            <Modal show={this.props.modalOpen} onHide={this.props.handleModalOpen} >
            <form onSubmit={this.onSubmit}>
              <Modal.Header toggle={this.toggle}>Create Email Template</Modal.Header>
              <Modal.Body>
                <div className="form-group">
                    <label htmlFor="flow-name">Email Template Name</label>
                    <input type="text"
                    className="form-control"
                    name="emailName"
                    placeholder="e.g. Welcome Series, Post Purchase"
                    value={this.state.emailName}
                    onChange={this.onChange}
                    required
                    />                                
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={this.onSubmit} className="btn modalbutton">
                  <Link to="/email-templates/create">Create Template</Link>
                </button>
                <button variant="danger" onClick={this.props.handleModalOpen}>Cancel</button>
              </Modal.Footer>
            </form>
          </Modal> 
          </>
        )
    }
}
const mapStateToProps = state => ({
    user:state.auth.user,
    email:state.email.allemails
})
export default connect( mapStateToProps , { initializeEmail } )(withRouter(RichHTML));;