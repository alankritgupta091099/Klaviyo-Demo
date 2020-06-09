import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect , Link} from 'react-router-dom';
import { Container, Row, Col , Alert , Button, Form, FormGroup, Label, Input , InputGroup ,
InputGroupAddon } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';
import { SegmentItem , SegmentItemOR } from '../components/listsAndSegment/SegmentItem.js';
import { saveSegment , nameSegment } from '../actions/segmentActions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'

const style={
    color:'#373F51', 
    border: '1px solid #dfe3e6' , 
    borderRadius:'0' , 
    height: '40px' , 
    display: 'inline-table', 
    boxSizing: 'border-box'
}

class createSegment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            arr:[]
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
                element.orArr=orArr;
            }
        });
        this.setState({
            arr:this.state.arr
        })
        //console.log(this.state.arr)
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state.arr)
        this.props.nameSegment(this.state.segment_name)
        this.props.saveSegment(this.state.arr);
        this.props.history.push('/lists-campaigns')
    }

    componentDidMount(){
        if(this.props.segment_name){
            this.setState({
                segment_name:this.props.segment_name,
                arr:this.props.segment_body
            })
        }
    }

    render() {        
        if(this.state.arr.length==0){
            this.setState({
                arr:[{AND_id:uuidv4()}]
            })
        }
        //if(this.props.segment_id) 
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
                    <div id="segment-del" style={{padding:'30px'}}>
                        <div className="Card-Table-Inner">
                            <Form onSubmit={this.onSubmit}>
                                <Row form>
                                    <Col xs={8}>
                                    <FormGroup>
                                        <Label><strong>Name</strong></Label>
                                        <Input bsSize="sm" type="text" name="segment_name" value={this.state.segment_name} onChange={this.onChange} placeholder="Enter Segment Name" required/>
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
                                                <div className="ANDcard">
                                                    <div class="new-seg-item">
                                                        <Row>
                                                            <SegmentItemOR item={item} saveAndComponent={this.saveAndComponent}/>
                                                        </Row>
                                                    </div>
                                                    <Row>
                                                        <Col>
                                                            <div class="segment-items">
                                                                <Button  color="light" style={{...style,width:'100px'}} onClick={this.addAndComponent} >
                                                                    <FontAwesomeIcon icon={faPlus} />
                                                                    <span id="segment-del"> <strong>AND</strong></span>
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div class="segment-items"><Button color="light" style={{...style,width:'100px'}} onClick={this.removeAndComponent.bind(this,item.AND_id)}><span id="segment-del"><strong>Remove</strong></span></Button></div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                {
                                                    (this.state.arr[this.state.arr.length-1].AND_id!=item.AND_id)?<p style={{margin:'35px 0', color:'rgba(98, 111, 126, 0.66)'}}>AND  --------------------------------------------------------------------------------------------------------------------------------------------------</p>:""
                                                }
                                            </div>                                            
                                        )
                                    })
                                }
                                <br/>
                                <Row>            
                                <Col style={{marginLeft:'70%'}}>
                                    <Button color="secondary" size="md" onClick={()=>this.props.history.push('/lists-campaigns')}>Back</Button>  
                                
                                    <Button color="primary" size="md"  style={{marginLeft:'40px'}} onClick={this.onSubmit} ><span id="segment-del"><strong>Save Segment</strong></span></Button>
                                </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
              </Col>
             </Row>
            </Container>
            </>
        )
       // else return <Redirect to="/lists-campaigns"/>
    }
}

const mapStateToProps = state => ({
    segment_name:state.segment.segment_name,
    segment_body:state.segment.segment_body,
    segment_id:state.segment.segment_id
})

export default connect( mapStateToProps , { saveSegment , nameSegment })(createSegment);