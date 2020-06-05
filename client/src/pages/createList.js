import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter , Redirect , Link} from 'react-router-dom';
import { Container, Row, Col , Alert , Button, Form, FormGroup, Label, Input , InputGroup ,
InputGroupAddon } from 'reactstrap';
import { Card , CardImg , CardText , CardBody , CardTitle , CardSubtitle , Table } from 'reactstrap';
import { faList , faClipboardList , faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';
import { nameList , saveList } from '../actions/listActions.js';

class createList extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            modal:false
        }
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit=(e)=>{
        e.preventDefault();
        this.props.nameList(this.state.list_name,this.state.list_type);
        this.props.history.push('/list/importFile') 
    }

    componentDidMount(){
        this.setState({
            list_name:this.props.list.list_name,
            list_type:this.props.list.list_type,
            list_data:this.props.list.list_data
        })
    }

    render() {
        if(this.props.list.list_id)
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
                    <div id="segment-del" style={{padding:'30px'}}>
                        <div className="Card-Table-Inner">
                            <Form onSubmit={this.onSubmit}>
                                <Row form>
                                    <Col xs={8}>
                                    <FormGroup>
                                        <Label><strong>Name</strong></Label>
                                        <Input bsSize="sm" type="text" name="list_name" value={this.state.list_name} onChange={this.onChange} placeholder="Enter List Name" required/>
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
                                {
                                    (()=>{
                                        if(this.state.list_type && this.state.list_data.length>0){
                                            return (
                                                <div className="Card-Table">
                                                    <div className="Card-Table-Inner">
                                                        <Table hover borderless>
                                                            <tbody>
                                                            { 
                                                                this.props.list.list_data.map((obj,index)=>{
                                                                    return(
                                                                    <tr key={index}>
                                                                        <Col>
                                                                            <td>{obj}</td>
                                                                        </Col>     
                                                                    </tr>
                                                                    )
                                                                })
                                                            }
                                                            </tbody>
                                                        </Table>
                                                        <Row>            
                                                            <Col style={{marginLeft:'60%'}}>
                                                                <Button color="primary" size="md" onClick={()=>{
                                                                    this.props.nameList(this.state.list_name,this.state.list_type)
                                                                    this.props.saveList(this.props.list.list_data)
                                                                    this.props.history.push('/lists-campaigns')

                                                                }}>Save & Go Back</Button>  
                                                            
                                                                <Button color="secondary" size="md"  style={{marginLeft:'40px'}} onClick={()=>this.setState({list_type:"",list_data:[]})} ><span id="segment-del"><strong>Change List</strong></span></Button>
                                                            </Col>
                                                        </Row>
                                                    </div>              
                                                </div> 
                                            )
                                        } else return(
                                        <>
                                            <Row style={{margin:'50px'}}>
                                                <Col sm="4">
                                                    {/* <button class="demo" onClick={()=>{
                                                        this.setState({
                                                            list_type:'signUpForm'
                                                        })
                                                        
                                                    }}> */}
                                                    <Card body className="text-center">
                                                    <CardBody>
                                                        <CardTitle><FontAwesomeIcon icon={faList} size="lg" /></CardTitle>
                                                        <CardSubtitle><strong>Create Signup Form</strong></CardSubtitle>
                                                    </CardBody>
                                                        </Card>
                                                    {/* </button> */}
                                                </Col>
                                                <Col sm="4">
                                                    {/* <button class="demo" onClick={()=>{
                                                        this.setState({
                                                            list_type:"subscribePage"
                                                        })
                                                    }}> */}
                                                    <Card body className="text-center">
                                                    <CardBody>
                                                        <CardTitle><FontAwesomeIcon icon={faClipboardList} size="lg" /></CardTitle>
                                                        <CardSubtitle><strong>Add a Subscribe Page</strong></CardSubtitle>
                                                    </CardBody>
                                                        </Card>
                                                    {/* </button> */}
                                                </Col>
                                                <Col sm="4">
                                                    <button class="demo" onClick={()=>{
                                                        this.setState({
                                                            list_type:"importCSV"
                                                        })
                                                    }}>
                                                    <Card body className="text-center">
                                                    <CardBody>
                                                        <CardTitle><FontAwesomeIcon icon={faCloudUploadAlt} size="lg" /></CardTitle>
                                                        <CardSubtitle><strong>Upload Contacts</strong></CardSubtitle>
                                                    </CardBody>
                                                        </Card>
                                                    </button>
                                                </Col>
                                            </Row>
                                        </>
                                        )
                                    })()
                                }
                                <br/>
                            </Form>
                        </div>
                    </div>
                </div>
              </Col>
             </Row>
            </Container>
            
            </>
        )
        else return <Redirect to="/lists-campaigns"/>
    }
}

const mapStateToProps = state => ({
    list:state.list
})

export default connect( mapStateToProps , { nameList , saveList } )(createList);

