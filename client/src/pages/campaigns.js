import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { withRouter , Link } from 'react-router-dom';
import { Container, Row, Col , Table , Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';
import { initializeCampaign } from '../actions/campaignActions.js';

class campaigns extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            modal:false,
            campaignName:"",
            campaignList:[]
        }
        this.toggle = this.toggle.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    toggle(){
        this.setState({
        modal: !this.state.modal
        })
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        const initializeCampaign={
            campaign_name : this.state.campaignName,
            campaign_id : uuidv4()
        }
        this.props.initializeCampaign(initializeCampaign)
        this.toggle();
        this.props.history.push('/campaigns/create')
    }    
    render() {
        return (
            <>
             <Container fluid={true}>
                <NavComp/>
                <Row>
                    <Col xs="2">
                        <MainSidebar/>
                    </Col>
                    <Col xs="10">
                    <div id="main">
                        <div className="dashboard-nav-header">
                        <Row>
                            <Col>
                            <p>Campaigns</p>
                            </Col>
                            <Col>
                            <button className="btn primaryButton" onClick={this.toggle}>
                            Create Campaign
                            </button>
                            </Col>
                        </Row>
                        </div>
                        <hr/>
                        <div className="Card-Table">
                            <div className="Card-Table-Inner">
                                <Table hover borderless>
                                <tbody>
                                { 
                                (this.state.flowList)?this.state.flowList.map((obj)=>{
                                    return(
                                    <tr key={obj.flow.flow_id}>
                                    <Col>
                                        <td>{obj.flow.flow_name}</td>
                                    </Col>   
                                        <td>
                                        <button className="btn btnTable" onClick={this.onDeleteClick.bind(this,obj.flow.flow_id)} >Delete</button>
                                        <button className="btn btnTable" onClick={this.onEditClick.bind(this,obj.flow.flow_id)}>Edit</button>
                                        </td>  
                                    </tr>
                                    )
                                }):<div className="spinner-border" style={{marginLeft:'50%'}}/>
                                }
                                </tbody>
                                </Table>
                            </div>              
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} >
                            <form onSubmit={this.onSubmit}>
                                <ModalHeader toggle={this.toggle}>Create Campaign</ModalHeader>
                                <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="flow-name">Campaign Name</label>
                                    <input type="text"
                                    className="form-control"
                                    name="campaignName"
                                    placeholder="e.g. Welcome Series, Post Purchase"
                                    value={this.state.campaignName}
                                    onChange={this.onChange}
                                    required
                                    />                                
                                </div>
                                </ModalBody>
                                <ModalFooter>
                                <button onClick={this.onSubmit}  className="btn modalbutton">
                                    <Link to="/flow/create">Create Campaign</Link>
                                </button>
                                <button onClick={this.toggle}>Cancel</button>
                                </ModalFooter>
                            </form>
                        </Modal>  
                    </div>
                    </Col>
                </Row>
             </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user:state.auth.user,
    flow:state.flow.allFlows
})

export default connect( mapStateToProps , { initializeCampaign } )( campaigns );