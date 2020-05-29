import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter , Redirect , Link} from 'react-router-dom';
import { Container, Row, Col , Alert , Button, Form, FormGroup, Label, Input , InputGroup ,
InputGroupAddon } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';
import { SegmentItem , SegmentItemOR } from '../components/listsAndSegment/SegmentItem.js';
import { saveSegment } from '../actions/segmentActions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

class createList extends Component {
    constructor(props){
        super(props)
    
    this.state = {
        modal:false
    }
    this.toggle = this.toggle.bind(this);
}
    toggle(){
        this.setState({
          modal: !this.state.modal
        })
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
                        <Col className="campaignHead">
                        <p ><a href="/lists-campaigns">Lists & Segment</a> > Edit <strong></strong> List</p>
                        </Col>
                    </Row>
                    </div>
                    <hr/>
                    </div>
              </Col>
             </Row>
             <button className="btn primaryButton" onClick={this.toggle}>
                  Create List
                </button>
            </Container>
            
            </>
        )
    }
}

export default createList;

