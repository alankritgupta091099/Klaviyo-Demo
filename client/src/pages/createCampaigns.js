import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter , Redirect , Link} from 'react-router-dom';
import { Container, Row, Col , Alert , Button, Form, FormGroup, Label, Input , InputGroup ,
InputGroupAddon} from 'reactstrap';

import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';
import { changeCampaignConfig } from '../actions/campaignActions.js';

class createCampaigns extends Component {
    constructor(props) {
        super(props)
        this.state={
            campaign_name:""
        }
        this.onSubmit=this.onSubmit.bind(this);
    }
    
    onSubmit(e){
        e.preventDefault();
        if ( this.props.campaign.campaign_name !== this.state.campaign_name ) this.props.changeCampaignConfig(this.state.campaign_name);
        this.props.history.push('/campaigns/create/mail-content')
    }    

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    componentDidMount(){
        this.setState({
            campaign_name:this.props.campaign.campaign_name
        })
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
                                    <Input type="select" name="campaignTag">
                                        <option>Default Select</option>
                                    </Input>
                                </FormGroup>
                                </Col>
                            </Row>
                            <Label>Who are you sending this campaign to?</Label>
                            <InputGroup>
                                    <Input type="select" name="campaignTag">
                                        <option>Default Select</option>
                                    </Input>
                                <InputGroupAddon addonType="prepend"><Button>Reset</Button></InputGroupAddon>                            
                            </InputGroup>
                            <FormGroup>
                                <p>Use Smart sending ?</p>
                                <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" />{' '}
                                    Yes, do not send this campaign to people who received an email in the last 16 hours.
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio2" />{' '}                                
                                    No, send this campaign to everyone.
                                </Label>
                                </FormGroup>
                            </FormGroup>     
                            <FormGroup>
                                <p>Use UTM Tracking?</p>
                                <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" />{' '}                                
                                    Do not use UTM Tracking for this campaign.
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio2" />{' '}                                
                                    Use account defaults for UTM Tracking for this campaign.
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio2" />{' '}                                
                                    Use custom values for UTM Tracking for this campaign.
                                </Label>
                                </FormGroup>
                                <Row>
                                    <Col>
                                    <Button color="secondary" size="md"><Link to="/campaigns">Back</Link></Button>
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
    campaign:state.campaign
})
export default connect( mapStateToProps , { changeCampaignConfig } )(withRouter(createCampaigns));
