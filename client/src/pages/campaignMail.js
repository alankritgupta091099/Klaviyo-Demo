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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
            value:new Date()
        }
        this.toggle = this.toggle.bind(this);
        this.time=["12:00 am","12:15 am","12:30 am","12:45 am"]
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
       // if( this.props.campaign.campaign_name && this.props.campaign.campaign_id)
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
                                            <Col xs={4}>
                                            <Button onClick={()=>this.props.history.push('/email-templates')}>Rich HTML</Button>
                                            </Col>
                                            <Col xs={4}>
                                                <Button onClick={this.toggle2}>Text Based</Button>
                                            </Col>
                                            <Col xs={4}>
                                                <Button onClick={this.populateEmailList}>Use From Templates</Button>
                                            </Col>                                    
                                        </>
                                    )                                    
                                })()
                            }
                            </Row>
                            <br/>
                            <Row>
                                <Col xs={3}>
                                <Button className="btn">Save Changes</Button>
                                </Col>
                                <Col xs={3}>
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
                                        <Col xs={6}>
                                            {entry.email.email_name}
                                        </Col>
                                        <Col xs={6}>
                                            <Button onClick={this.reviewFunction.bind(this,entry.email)}>Select</Button>
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
                                        <Dropdown isOpen={this.state.ddDate} toggle={this.Datetoggle}>
                                            <DropdownToggle color="light" caret>
                                                {`${this.state.value.getDate()}/${this.state.value.getMonth()}/${this.state.value.getFullYear()}`}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <Calendar
                                                    onChange={this.onDateChange}
                                                    value={this.state.value}
                                                />
                                            </DropdownMenu>
                                        </Dropdown> 
                                    </Col>
                                    <Col>
                                        <Dropdown isOpen={this.state.ddTime} toggle={this.Timetoggle}>
                                            <DropdownToggle color="light" caret>
                                                {this.state.time?this.state.time:"Select Time"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                            {
                                                this.time.map((item,index)=>{
                                                    return <DropdownItem key={index} onClick={()=>{
                                                        this.setState({
                                                            time:item
                                                        })
                                                    }}>{item}</DropdownItem>
                                                })
                                            }
                                            </DropdownMenu>
                                        </Dropdown>                    
                                    </Col>
                                </Row>
                            </Row> :""
                        }
                    </Col>
                    <Col sm="6">
                        <button class="demo" onClick={async()=>{
                            //await this.props.saveCampaign(this.state)
                            await this.props.sendMailCampaign()
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
                  {(this.state.value&&this.state.time)?<button className="btn btn-primary" onClick={()=>{
                      this.props.scheduleCampaignMail(this.state,this.state.time,this.state.value)
                    }}>Schedule Campaign</button>:""}
                  <button className="btn btn-secondary" onClick={this.toggle3}>Cancel</button>
                </ModalFooter>
            </Modal>
            </Container>
            </>
        ) 
     // else return<Redirect to="/campaigns/create"/>
    }
}

const mapStateToProps = ( state ) => ({
    allemails:state.email.allemails,
    campaign:state.campaign
})

export default connect( mapStateToProps , { loadEmailList , saveCampaign , sendMailCampaign , scheduleCampaignMail } )(createCampaigns);