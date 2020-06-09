import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter , Redirect , Link} from 'react-router-dom';
import { Container, Row, Col , Alert , Button, Form, FormGroup, Label, Input , InputGroup ,
InputGroupAddon , DropdownToggle , DropdownMenu , DropdownItem , Dropdown } from 'reactstrap';

import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';
import { changeCampaignConfig } from '../actions/campaignActions.js';
import { loadList } from '../actions/listActions.js';
import { loadSegmentList } from '../actions/segmentActions.js';

class createCampaigns extends Component {
    constructor(props) {
        super(props)
        this.state={
            campaign_name:"",
            modalCondition:false
        }
        this.onSubmit=this.onSubmit.bind(this);
    }
    
    onSubmit(e){
        e.preventDefault();
        this.props.changeCampaignConfig(this.state.campaign_name,this.state.ddType,this.state.ddId,this.state.ddVal);
        this.props.history.push('/campaigns/create/mail-content')
    }    

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    toggle=()=>{
        this.setState({
            modalCondition: !this.state.modalCondition
        })
    }

    componentDidMount(){
        this.setState({
            campaign_name:this.props.campaign.campaign_name,
            ddVal:this.props.campaign.campaign_receivers_name,
            ddType:this.props.campaign.campaign_receivers_type,
            ddId:this.props.campaign.campaign_receivers_id
        })
        this.props.loadList();
        this.props.loadSegmentList();
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
                        <p ><a href="/campaigns">Campaigns</a> > Edit <strong>{this.state.campaign_name}</strong></p>
                        </Col>
                    </Row>
                    </div>
                    <hr/>
                    <div className="Card-Table" style={{padding:'30px'}}>
                        <div className="Card-Table-Inner">
                        <Form onSubmit={this.onSubmit}>
                            <Row form>
                                <Col xs={6}>
                                <FormGroup>
                                    <Label>Campaign Name</Label>
                                    <Input type="text" name="campaign_name" value={this.state.campaign_name} onChange={this.onChange} placeholder="Enter Campaign Name" />
                                </FormGroup>
                                </Col>
                                <Col xs={6}>
                                <FormGroup>
                                    <Label>Tag</Label>
                                    <Input type="select" name="campaignTag" disabled>
                                        <option>Default Select</option>
                                    </Input>
                                </FormGroup>
                                </Col>
                            </Row>
                            <Label>Who are you sending this campaign to?</Label>
                            <InputGroup>
                                    <Dropdown  isOpen={this.state.modalCondition} toggle={this.toggle}>
                                        <DropdownToggle color="light" style={{ width:'700px'}} caret block>
                                            {
                                                (this.state.ddVal) ? this.state.ddType==='List'? this.state.ddVal+" (List)":this.state.ddVal+" (Segment)" : "Select List or Segment"
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Lists</DropdownItem>
                                            {
                                                (this.props.allLists.length>0) ? this.props.allLists.map( item => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem key={item.list.list_id} onClick={()=>this.setState({
                                                                    ddType:"List",
                                                                    ddVal:item.list.list_name,
                                                                    ddId:item.list.list_id
                                                                })} 
                                                            style={{ width:'700px'}} >{item.list.list_name}</DropdownItem>
                                                        </>
                                                    )
                                                }) : <DropdownItem disabled>No lists</DropdownItem>                                              
                                            }                                            
                                            <DropdownItem divider />      
                                            <DropdownItem header>Segments</DropdownItem>                  
                                            {
                                                (this.props.allSegments.length>0) ? this.props.allSegments.map( item => { 
                                                    return(
                                                        <>  
                                                            <DropdownItem key={item.segment.segment_id} onClick={()=>this.setState({
                                                                    ddType:"Segment",
                                                                    ddVal:item.segment.segment_name,
                                                                    ddId:item.segment.segment_id
                                                                })} 
                                                            style={{ width:'700px'}} >{item.segment.segment_name}</DropdownItem>
                                                        </>
                                                    )
                                                }) : <DropdownItem disabled>No Segments</DropdownItem>
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                <InputGroupAddon addonType="prepend"><Button onClick={()=>this.setState({ddVal:""})}>Reset</Button></InputGroupAddon>                            
                            </InputGroup>
                            <FormGroup style={{margin:'10px'}}>
                                <Label>Use Smart sending ?</Label>
                                <FormGroup check style={{margin:'10px'}}>
                                    <Label check>
                                        <Input type="radio" name="radio1"/>{' '}
                                        Yes, do not send this campaign to people who received an email in the last 16 hours.
                                    </Label>
                                </FormGroup>
                                <FormGroup check style={{margin:'10px'}}>
                                    <Label check>
                                        <Input type="radio" name="radio1"/>{' '}                                
                                        No, send this campaign to everyone.
                                    </Label>
                                </FormGroup>
                            </FormGroup>     
                            <FormGroup style={{margin:'10px'}}>
                                <p>Use UTM Tracking?</p>
                                <FormGroup check style={{margin:'10px'}}>
                                <Label check>
                                    <Input type="radio" name="radio2" />{' '}                                
                                    Do not use UTM Tracking for this campaign.
                                </Label>
                                </FormGroup>
                                <FormGroup check style={{margin:'10px'}}>
                                <Label check>
                                    <Input type="radio" name="radio2" />{' '}                                
                                    Use account defaults for UTM Tracking for this campaign.
                                </Label>
                                </FormGroup>
                                <FormGroup check style={{margin:'10px'}}>
                                <Label check>
                                    <Input type="radio" name="radio2" />{' '}                                
                                    Use custom values for UTM Tracking for this campaign.
                                </Label>
                                </FormGroup>
                                <hr style={{margin:"2rem 0"}}/>
                                <Row style={{margin:'15px 0 0 20rem'}}>
                                    <Col>
                                        <Button color="secondary" size="md" style={{ marginLeft:'12rem'}}><Link to="/campaigns" style={{color:'white'}}>Back</Link></Button>
                                    </Col>
                                    <Col>
                                        <Button color="primary" size="md">Save & Continue to Content</Button>
                                    </Col>
                                </Row>
                            </FormGroup>                      
                        </Form>
                        </div>
                    </div>
                </div>
              </Col>
             </Row>
            </Container>
            </>
        ) 
       else return <Redirect to="/campaigns"/>
    }
}
const mapStateToProps = ( state ) => ({
    campaign:state.campaign,
    allLists:state.list.allLists,
    allSegments:state.segment.allSegments
})

export default connect( mapStateToProps , { changeCampaignConfig , loadList , loadSegmentList } )(withRouter(createCampaigns));