import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { withRouter , Link } from 'react-router-dom';
import { Container, Row, Col , Table , Modal, ModalHeader, ModalBody, ModalFooter , Button } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import {faList,faBolt} from '@fortawesome/free-solid-svg-icons'

import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { initializeSegment , loadSegmentList , deleteSegment , loadSelectedSegment } from '../actions/segmentActions.js';

class ListAndSegment extends React.Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       modal:false,
       listOrSegmentName:"",
       allListsOrSegments:[]
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.setState({
      modal: !this.state.modal
    })
  }

  componentWillReceiveProps(nextProps){ 
    if(this.props.user===null) this.props.loadSegmentList();       
    this.setState({
      allListsOrSegments:nextProps.allSegments
    })
  }

  onDeleteClick = ( id ) => {
      this.props.deleteSegment(id);
  }

  onEditClick = async( id ) => {
    await this.props.loadSelectedSegment(id);
    this.props.history.push('/segment/create')
  }

  render () {
    //if(!this.state.openLayout)
      return (
       <React.Fragment>
       <Container fluid={true}>
        <NavComp/>
        <Row>
          <Col xs="2">
            <MainSidebar/>
          </Col>
        <Col>
        <div id="main">
            <div className="dashboard-nav-header">
              <Row>
                <Col>
                <p>Lists & Segments</p>
                </Col>
                <Col>
                <button className="btn primaryButton" onClick={this.toggle}>
                  Create List/Segment
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
                  (this.state.allListsOrSegments)?this.state.allListsOrSegments.map((obj)=>{
                    return(
                      <tr key={obj.segment.segment_id}>
                      <Col>
                        <td>{obj.segment.segment_name}</td>
                      </Col>   
                        <td>
                          <button className="btn btnTable" onClick={this.onDeleteClick.bind(this,obj.segment.segment_id)} >Delete</button>
                          <button className="btn btnTable" onClick={this.onEditClick.bind(this,obj.segment.segment_id)}>Edit</button>
                        </td>  
                      </tr>
                    )
                  }):<div className="spinner-border" style={{marginLeft:'50%'}}/>
                }
                </tbody>
            </Table>
              </div>              
             </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}  >
                <ModalHeader toggle={this.toggle}>Create List or Segment</ModalHeader>
                <ModalBody>
                  <Row>
                    <Col sm="6">

                        <button class="demo" onClick={()=>{
                          this.props.history.push('/list/create')
                        }}>
                        <Card body className="text-center">
                        <CardBody>
                        <CardTitle><FontAwesomeIcon icon={faList} size="lg" /></CardTitle>
                          <CardSubtitle><strong>List</strong></CardSubtitle>
                          <CardText>Paste from a spreadsheet,upload a file,or choose from people already in Klaviyo.</CardText>
          
                             </CardBody>
                              </Card>
                        </button>
                    </Col>
                    <Col sm="6">
                        <button class="demo" onClick={()=>{
                            this.props.initializeSegment(uuidv4())
                            this.props.history.push('/segment/create')
                          }}>
                        <Card body className="text-center">
        
                        <CardBody >
                        <CardTitle><FontAwesomeIcon icon={faBolt} size="lg" /></CardTitle>
                          <CardSubtitle><strong>Segment</strong></CardSubtitle>
                          <CardText>A dynamic segment of people based on their behaviour or properties.</CardText>
          
                             </CardBody>
                              </Card>
                              </button>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-secondary" onClick={this.toggle}>Cancel</button>
                </ModalFooter>
            </Modal>  
        </div>
        </Col>
        </Row>
      </Container>
      </React.Fragment>
    )
    //Redirect to /create route
    //else return <Redirect to='/flow/create' />
  }
}

const mapStateToProps = state => ({
    user:state.auth.user,
    allSegments:state.segment.allSegments
})

export default connect( mapStateToProps , { initializeSegment , loadSegmentList , deleteSegment , loadSelectedSegment } )(withRouter(ListAndSegment));
