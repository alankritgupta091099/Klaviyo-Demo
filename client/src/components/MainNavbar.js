import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink , Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';

const NavComp = (props) => {
  const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ddtoggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <div className="topbar">
        <div className="container-fluid">
            <Navbar light expand="md" >
                <div className="header-secondary-container">
                    <NavbarBrand href="/" style={{color: '#DFE3E6'}}>Email Flows</NavbarBrand>
                    <input
                        type="text"
                        placeholder="Search for Someone"
                        className="navsearch"
                    />
                </div>
                <div className="header-primary-container">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className="nav">
                    <Nav className="ml-auto Nav" navbar> 
                        {
                            props.user ? 
                                <Dropdown isOpen={dropdownOpen} toggle={ddtoggle}>
                                    <DropdownToggle caret>
                                        {props.user.first_name} {props.user.last_name}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem href="/logout" className="NavLink">Log Out</DropdownItem>          
                                    </DropdownMenu>
                                </Dropdown>
                                :
                                <div></div>
                        }
                    </Nav>
                </Collapse>
                </div>
            </Navbar>
        </div>
    </div>
  );
}

const mapStateToProps = state => ({
    user:state.auth.user
})

export default connect(mapStateToProps,null)(NavComp);