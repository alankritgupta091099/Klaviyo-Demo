import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter , Redirect , Link} from 'react-router-dom';
import { Container, Row, Col , Alert , Button, Form, FormGroup, Label, Input , InputGroup ,
InputGroupAddon ,Table } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import CSVReader from 'react-csv-reader';

import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';
import { saveList } from '../actions/listActions.js';

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

    renderListItem=(data,fileInfo)=>{
        var dataArr=[];
        if(data[0][0]=="Email"){
            data.slice(1,data.length-1).forEach(element => {
               if(element.length>1){
                    console.log("can not read");
                } else {
                    dataArr.push(element[0])
                }
            })
        }
        this.setState({
            dataArr:dataArr
        })
    }
    
    onSave=()=>{
        this.props.saveList(this.state.dataArr);
        this.props.history.push('/lists-campaigns')
    }

    render() {
        if(this.props.list.list_name && this.props.list.list_type)
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
                        <p ><a href="/lists-campaigns">Lists & Segment</a> > Edit <strong></strong> (List)</p>
                        </Col>
                    </Row>
                    </div>
                    <hr/>
                    <div id="segment-del" style={{padding:'30px'}}>
                        {
                            (()=>{
                                if(this.state.dataArr){
                                    return(
                                        <div className="Card-Table">
                                            <div className="Card-Table-Inner">
                                                <Table hover borderless>
                                                    <tbody>
                                                    { 
                                                    (this.state.dataArr)?this.state.dataArr.map((obj,index)=>{
                                                        return(
                                                        <tr key={index}>
                                                            <Col>
                                                                <td>{obj}</td>
                                                            </Col>                                               
                                                        </tr>
                                                        )
                                                    }):<div className="spinner-border" style={{marginLeft:'50%'}}/>
                                                    }
                                                    </tbody>
                                                </Table>
                                                <Row>            
                                                    <Col style={{marginLeft:'70%'}}>
                                                        <Button color="secondary" size="md" onClick={()=>this.props.history.push('/list/create')}>Back</Button>  
                                                    
                                                        <Button color="primary" size="md"  style={{marginLeft:'40px'}} onClick={this.onSave} ><span id="segment-del"><strong>Save List</strong></span></Button>
                                                    </Col>
                                                </Row> 
                                            </div>              
                                        </div> 
                                    )
                                } else {
                                   return(
                                    <>
                                        <Row>
                                            <Col sm={6}>
                                                <CSVReader onFileLoaded={(data, fileInfo) => this.renderListItem(data,fileInfo)} />
                                            </Col>
                                            <Col sm={6}>
                                                <h5>Instructions</h5>
                                                <p>
                                                    Import the .csv file with 1st column named Email.
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>            
                                            <Col style={{marginLeft:'70%'}}>
                                                <Button color="secondary" size="md" onClick={()=>this.props.history.push('/list/create')}>Back</Button>                                              
                                            </Col>
                                        </Row> 
                                    </>
                                   )
                                }
                            })()
                        }                     
                    </div>                    
                </div>
              </Col>
             </Row>             
            </Container>            
            </>
        )
        else return<Redirect to="/list/create"/>
    }
}

const mapStateToProps = state => ({
    list:state.list
})

export default connect ( mapStateToProps , { saveList } ) ( createList ) ;

