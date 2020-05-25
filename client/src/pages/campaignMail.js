import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import {
    Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input, InputGroup,
    InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem
} from 'reactstrap';

import NavComp from '../components/MainNavbar.js';
import RichHTML from './richHTML';
import { MainSidebar } from '../components/MainSidebar.js';
import { loadEmailList } from '../actions/emailActions.js';

class createCampaigns extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            modalOpen: false
        }
        this.toggle = this.toggle.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
    }
    handleModalOpen = () => {
        this.setState((prevState) => {
            return {
                modalOpen: !prevState.modalOpen
            }
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    populateEmailList = () => {
        this.toggle();
        this.props.loadEmailList();
    }

    reviewFunction = (email) => {
        console.log(email)
    }

    render() {
        return (
            <>
                <Container fluid={true}>
                    <NavComp />
                    <Row>
                        <Col xs="2">
                            <MainSidebar />
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
                                <hr />
                                <div className="Card-Table" style={{ padding: '30px' }}>
                                    <div className="Card-Table-Inner">
                                        <Form>
                                            <Row form>
                                                <Col xs={6}>
                                                    <FormGroup>
                                                        <Label>From</Label>
                                                        <Input type="text" name="from" />
                                                    </FormGroup>
                                                </Col>
                                                <Col xs={6}>
                                                    <FormGroup>
                                                        <Label>From / Reply-To Email</Label>
                                                        <Input type="email" name="replyToEmail"></Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col xs={6}>
                                                    <FormGroup>
                                                        <Label>Subject</Label>
                                                        <Input type="text" name="subject" />
                                                    </FormGroup>
                                                </Col>
                                                <Col xs={6}>
                                                    <FormGroup>
                                                        <Label>Preview Text</Label>
                                                        <Input type="email" name="replyToEmail" disabled></Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={3}>
                                                    <Button className="btn"> Save Changes</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <hr />
                                        <Row>
                                            <Col xs={4}>
                                                <Button onClick={this.handleModalOpen}>Rich HTML</Button>
                                            </Col>
                                            <Col xs={4}>
                                                <Button>Text Based</Button>
                                            </Col>
                                            <Col xs={4}>
                                                <Button onClick={this.populateEmailList}>Use Templates</Button>
                                            </Col>
                                        </Row>
                                        <RichHTML modalOpen={this.state.modalOpen}
                                            handleModalOpen={this.handleModalOpen} />
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <form onSubmit={this.onSubmit}>
                            <ModalHeader toggle={this.toggle}>Select Email Template</ModalHeader>
                            <ModalBody>
                                <ListGroup>
                                    {
                                        this.props.allemails ? this.props.allemails.map(entry => {
                                            return (
                                                <ListGroupItem key={entry.email.email_id}>
                                                    <Row>
                                                        <Col xs={6}>
                                                            {entry.email.email_name}
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Button onClick={this.reviewFunction.bind(this, entry.email)}>Select</Button>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                        }) : <p>No Templates</p>
                                    }
                                </ListGroup>
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-secondary" onClick={this.toggle}>Cancel</button>
                            </ModalFooter>
                        </form>
                    </Modal>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    allemails: state.email.allemails
})

export default connect(mapStateToProps, { loadEmailList })(createCampaigns);