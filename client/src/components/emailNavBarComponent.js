import React, { useState } from 'react';
import { Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { saveEmail } from '../actions/emailActions.js';

const NavComp = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const ddtoggle = () => setDropdownOpen(prevState => !prevState);

    const saveEmail =(e)=>{
        e.preventDefault();
        props.saveDesign();
    }

  return (
    <div className="topbar">
        <div className="container-fluid">
            <Navbar light expand="md" >
                <div className="header-secondary-container">
                    <NavbarBrand href="/" style={{color: '#DFE3E6'}}>Email Flows</NavbarBrand>
                    <Dropdown isOpen={dropdownOpen} toggle={ddtoggle}>
                        <DropdownToggle caret>
                           {
                               (props.emailName) ? props.emailName : "404"
                           }
                        </DropdownToggle>
                    </Dropdown>
                </div>
                <div className="header-primary-container">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className="nav">
                    <Nav className="ml-auto Nav" navbar>
                        <NavItem className="NavItem">
                            <NavLink href="/" className="NavLink" onClick={saveEmail}>Save</NavLink>
                        </NavItem>
                        <NavItem className="NavItem">
                            <NavLink href="/email-templates" className="NavLink">Exit</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                </div>
            </Navbar>
        </div>
    </div>
  );
}

const mapStateToProps = state => ({
  emailName: state.email.email_name
})


export default connect ( mapStateToProps , { saveEmail })(withRouter(NavComp));