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
import {faPlus} from '@fortawesome/free-solid-svg-icons'

class createSegment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            arr:[{AND_id:uuidv4()}]
        }
    }
    
    addAndComponent=()=>{
        this.state.arr.push({AND_id:uuidv4()})
        this.setState({
            arr:this.state.arr
        })
        console.log(this.state.arr)
    }

    removeAndComponent=(id)=>{
        if ( this.state.arr.length > 1 ){
            var newArr=[]
            this.state.arr.forEach(element => {
                if(element.AND_id!=id){
                    newArr.push(element)
                }
            });
            console.log(newArr)
            this.setState({arr:newArr})
            //Deleting correct value but not rendering
        }
    }

    saveAndComponent = ( orArr , AND_id ) => {
        this.state.arr.forEach(element => {
            if(element.AND_id===AND_id){
                element.orArr=orArr
            }
        });
        this.setState({
            arr:this.state.arr
        })
        console.log(this.state.arr)
    }

    onSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state.arr)
        this.props.saveSegment(this.state.arr);
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
                        <p ><a href="/lists-campaigns">Lists & Segment</a> > Edit <strong></strong> Segment</p>
                        </Col>
                    </Row>
                    </div>
                    <hr/>
                    <div id="segment-del" className="Card-Table" style={{padding:'30px'}}>
                        <div className="Card-Table-Inner">
                            <Form onSubmit={this.onSubmit}>
                                <Row form>
                                    <Col xs={8}>
                                    <FormGroup>
                                        <Label><strong>Name</strong></Label>
                                        <Input bsSize="sm" type="text" name="segment_name" onChange={this.onChange} placeholder="Enter Segment Name" />
                                    </FormGroup>
                                    </Col>
                                    <Col xs={4}>
                                    <FormGroup>
                                        <Label><strong>Tag</strong></Label>
                                        <Input bsSize="sm" type="select" name="campaignTag" disabled>
                                            <option>Select tags...</option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <FormGroup>
                                        <Label><strong>Definitions</strong></Label> 
                                                           
                                    </FormGroup>
                                    </Col>
                                </Row>
                                {
                                    this.state.arr.map(item=>{
                                            return (
                                            <div>
                                            <div class="new-seg-item">
                                                <Row>
                                                    <SegmentItemOR AND_id={item.AND_id} saveAndComponent={this.saveAndComponent}/>
                                                </Row>
                                                </div>
                                                <Row>
                                                    <Col>
                                                        <div class="segment-items"><Button  color="light" onClick={this.addAndComponent} size="sm" ><FontAwesomeIcon icon={faPlus} /><span id="segment-del"> <strong>AND</strong></span></Button></div>
                                                    </Col>
                                                    <Col>
                                                        <div class="segment-items"><Button color="light" size="sm" onClick={this.removeAndComponent.bind(this,item.AND_id)}><span id="segment-del"><strong>Remove</strong></span></Button></div>
                                                        
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    })
                                }
                                <div class="del"> <Button color="primary" size="sm" onClick={this.onSubmit} ><span id="segment-del"><strong>Save Segment</strong></span></Button></div>
                                                           
                            </Form>
                        </div>
                    </div>
                </div>
              </Col>
             </Row>
            </Container>
            </>
        )
    }
}

// const mapStateToProps = state => ({
    
// })

export default connect( null , { saveSegment })(createSegment);