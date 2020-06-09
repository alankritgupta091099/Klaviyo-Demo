import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter , Redirect } from 'react-router-dom';
import { Container, Row, Col , Alert , Button, Form, FormGroup, Label, Input , InputGroup ,
InputGroupAddon , Modal , ModalHeader, ModalBody, ModalFooter , ListGroup , ListGroupItem } from 'reactstrap';
import parse from 'html-react-parser';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { faClock , faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont , faFile , faMagic } from '@fortawesome/free-solid-svg-icons';
import { formatISO } from 'date-fns';

import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';
import { loadEmailList } from '../actions/emailActions.js';
import { saveCampaign , sendMailCampaign , scheduleCampaignMail } from '../actions/campaignActions.js';

class createCampaigns extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            modal:false,
            modal2:false,
            modal3:false,
            ddDate:false,
            ddTime:false,
            from:"",
            replyTo:"",
            subject:"",
            previewText:"",
            editorState: EditorState.createEmpty(),
            date:new Date()
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
        modal: !this.state.modal
        })
    }

    toggle2=()=>{
        this.setState({
        modal2: !this.state.modal2
        })
    }

    toggle3=()=>{
        this.setState({
        modal3: !this.state.modal3
        })
    }

    Datetoggle=()=>{
        this.setState({
        ddDate: !this.state.ddDate
        })
    }

    Timetoggle=()=>{
        this.setState({
        ddTime: !this.state.ddTime
        })
    }

    populateEmailList = () => {
        this.toggle();
        this.props.loadEmailList();
    }

    reviewFunction = (email) => {
        console.log(email);
        this.setState({
            email_name:email.email_name,
            email_id:email.email_id,
            email_html:email.email_html
        })
        this.toggle();
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitCampaign=(e)=>{
        e.preventDefault();
        this.props.saveCampaign(this.state);
        alert("Campaign saved");
        this.props.history.push('/campaigns')
    }

    componentDidMount(){
        this.setState({
            from:this.props.campaign.campaign_content.from,
            replyTo:this.props.campaign.campaign_content.replyTo,
            subject:this.props.campaign.campaign_content.subject,
            previewText:this.props.campaign.campaign_content.previewText,
            email_id:this.props.campaign.campaign_content.email_id,
            email_name:this.props.campaign.campaign_content.email_name,
            email_html:this.props.campaign.campaign_content.email_html,
        })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
        editorState,
        });
    };

    onTextEditorSave=()=>{
        const contentState = this.state.editorState.getCurrentContent();
        console.log(convertToHTML(contentState))
        this.setState({
            email_html:convertToHTML(contentState)
        })
        this.toggle2();
    }

    onDateChange = value => {
        console.log(value)
        this.setState({ value })
    }

    render() {
      if( this.props.campaign.campaign_name && this.props.campaign.campaign_id)
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
                        <p ><a href="/campaigns">Campaigns</a> > Edit</p>
                        </Col>
                    </Row>
                    </div>
                    <hr/>
                    <div className="Card-Table" style={{padding:'30px'}}>
                        <div className="Card-Table-Inner">
                        <Form onSubmit={this.submitCampaign}>
                            <Row form>
                                <Col xs={6}>
                                <FormGroup>
                                    <Label>From</Label>
                                    <Input type="text" name="from" value={this.state.from}
                                    onChange={this.onChange} required/>
                                </FormGroup>
                                </Col>
                                <Col xs={6}>
                                <FormGroup>
                                    <Label>From / Reply-To Email</Label>
                                    <Input type="email" name="replyTo" value={this.state.replyTo} onChange={this.onChange}
                                    required></Input>
                                </FormGroup>
                                </Col>
                            </Row>                   
                            <Row form>
                                <Col xs={6}>
                                <FormGroup>
                                    <Label>Subject</Label>
                                    <Input type="text" name="subject" value={this.state.subject}
                                    onChange={this.onChange} required/>
                                </FormGroup>
                                </Col>
                                <Col xs={6}>
                                <FormGroup>
                                    <Label>Preview Text</Label>
                                    <Input type="email" name="previewText" value={this.state.previewText}
                                    onChange={this.onChange} disabled></Input>
                                </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                            {
                                (()=>{
                                    if(this.state.email_html){
                                        return (
                                            <>
                                                <Col style={{margin:'0 20%', border:'box-shadow: 0 0 6px rgba(43,152,211,.5)',border:'2px solid rgba(43,152,211,.5)'}}>
                                                    {parse(this.state.email_html)}
                                                </Col>
                                                <Button className="primaryButton" onClick={()=>{
                                                    this.setState({
                                                        email_body:"",
                                                        email_id:"",
                                                        email_html:""
                                                    })
                                                }}>Change Layout</Button>
                                            </>
                                        )
                                    } else return (
                                        <>
                                            <Row style={{padding:'20px 0 0 40px'}}>
                                                <Col sm="4">
                                                    <button class="demo" onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.props.history.push('/email-templates')
                                                    }}>
                                                    <Card body className="text-center" style={{width:'17rem',height:'10rem'}}>
                                                    <CardBody>
                                                    <CardTitle><FontAwesomeIcon icon={faMagic} size="lg" /></CardTitle>
                                                    <CardSubtitle><strong>Rich HTML</strong></CardSubtitle>
                                                    <CardText>Use Email builder to build the template</CardText>                                    
                                                        </CardBody>
                                                        </Card>
                                                    </button>
                                                </Col>
                                                <Col sm="4">
                                                    <button class="demo" onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.toggle2();
                                                    }}>
                                                    <Card body className="text-center" style={{width:'17rem',height:'10rem'}}>
                                                    <CardBody>
                                                    <CardTitle><FontAwesomeIcon icon={faFont} size="lg" /></CardTitle>
                                                    <CardSubtitle><strong>Text Based</strong></CardSubtitle>
                                                    <CardText>For Text only Emails</CardText>                                    
                                                        </CardBody>
                                                        </Card>
                                                    </button>
                                                </Col>
                                                <Col sm="4">
                                                    <button class="demo" onClick={(e)=>{
                                                        e.preventDefault();
                                                        this.populateEmailList()
                                                    }}>
                                                    <Card body className="text-center" style={{width:'17rem',height:'10rem'}}>
                                    
                                                    <CardBody >
                                                    <CardTitle><FontAwesomeIcon icon={faFile} size="lg" /></CardTitle>
                                                    <CardSubtitle><strong>Use Template</strong></CardSubtitle>
                                                    <CardText>Choose from you library</CardText>                                    
                                                        </CardBody>
                                                        </Card>
                                                        </button>
                                                </Col>
                                            </Row>
                                        </>
                                    )                                    
                                })()
                            }
                            </Row>
                            <br/>
                            <hr/>
                            <Row>
                                <Col xs={3} style={{marginLeft:'20%'}}>
                                <Button className="btn">Save Changes</Button>
                                </Col>
                                <Col xs={3} style={{marginLeft:'10%'}}>
                                <Button className="btn" onClick={this.toggle3}>Send Campaign</Button>
                                </Col>
                            </Row>
                        </Form>
                        <hr/>
                        </div>
                    </div>
                </div>
              </Col>
             </Row>
             <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <form onSubmit={(e)=>e.preventDefault()}>
                <ModalHeader toggle={this.toggle}>Select Email Template</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        {
                            this.props.allemails?this.props.allemails.map( entry => {
                                return (
                                    <ListGroupItem key={entry.email.email_id}>
                                    <Row>
                                        <Col xs={12}>
                                            {entry.email.email_name}
                                            <Button style={{float:'right'}} onClick={this.reviewFunction.bind(this,entry.email)}>Select</Button>
                                        </Col> 
                                    </Row>
                                    </ListGroupItem>
                                )
                            }): <p>No Templates</p>
                        }                        
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-secondary" onClick={this.toggle}>Cancel</button>
                </ModalFooter>
              </form>
            </Modal> 
            <Modal isOpen={this.state.modal2} toggle={this.toggle2} contentClassName="texteditor">
              <form onSubmit={(e)=>e.preventDefault()}>
                <ModalHeader toggle={this.toggle2}>Select Email Template</ModalHeader>
                <ModalBody>
                    <Editor
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <button onClick={this.onTextEditorSave} className="btn btn-primary">
                      Save
                    </button>
                  <button className="btn btn-secondary" onClick={this.toggle2}>Cancel</button>
                </ModalFooter>
              </form>
            </Modal>
            <Modal isOpen={this.state.modal3} toggle={this.toggle3}>
                <ModalHeader toggle={this.toggle3}>Ready to Send?</ModalHeader>                
                <ModalBody>
                  <Row style={{margin:'8px'}}><strong>Sending Strategy</strong></Row>
                  <Row>
                    <Col sm="6">
                        <button class="demo" onClick={()=>{
                            this.setState({scheduleRow:true})
                        }}>
                            <Card body className="text-center">
                                <CardBody>
                                    <CardTitle><FontAwesomeIcon icon={faClock} size="lg" /></CardTitle>
                                    <CardSubtitle><strong>Schedule</strong></CardSubtitle>
                                    <CardText>Choose a future date and time to send</CardText>          
                                </CardBody>
                            </Card>
                        </button>
                        {   
                            (this.state.scheduleRow) ? <Row style={{margin:'8px'}}>
                                <Row style={{margin:'8px'}}><strong>Choose Send time</strong></Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="exampleDate">Date</Label>
                                            <Input
                                            type="date"
                                            name="date"
                                            id="exampleDate"
                                            value={this.state.date}
                                            placeholder="date placeholder"
                                            onChange={this.onChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup>
                                        <Label for="exampleTime">Time</Label>
                                        <Input
                                        type="time"
                                        name="time"
                                        value={this.state.time}
                                        id="exampleTime"
                                        placeholder="time placeholder"
                                        onChange={this.onChange}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                            </Row> :""
                        }
                    </Col>
                    <Col sm="6">
                        <button class="demo" onClick={async()=>{
                            await this.props.saveCampaign(this.state)
                            setTimeout(() => {
                                this.props.sendMailCampaign()
                            }, 1000);                            
                            this.props.history.push('/campaigns')
                          }}>
                            <Card body className="text-center">    
                                <CardBody >
                                    <CardTitle><FontAwesomeIcon icon={faPaperPlane} size="lg" /></CardTitle>
                                    <CardSubtitle><strong>Send Now</strong></CardSubtitle>
                                    <CardText>Start sending your campaign immediately</CardText>          
                                </CardBody>
                            </Card>
                        </button>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  {(this.state.date&&this.state.time)?<button className="btn btn-primary" onClick={()=>{
                    this.props.scheduleCampaignMail(this.state,this.state.date,formatISO(new Date(
                          this.state.date.split('-')[0],
                          (this.state.date.split('-')[1]-1),
                          this.state.date.split('-')[2],
                          this.state.time.split(':')[0],
                          this.state.time.split(':')[1],
                          52
                        )))
                    this.toggle3()
                    }}>Schedule Campaign</button>:""}
                  <button className="btn btn-secondary" onClick={this.toggle3}>Cancel</button>
                </ModalFooter>
            </Modal>
            </Container>
            </>
        ) 
     else return<Redirect to="/campaigns/create"/>
    }
}

const mapStateToProps = ( state ) => ({
    allemails:state.email.allemails,
    campaign:state.campaign
})

export default connect( mapStateToProps , { loadEmailList , saveCampaign , sendMailCampaign , scheduleCampaignMail } )(createCampaigns);