import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './NavComponent.scss';
import LoginControl from './LoginControl';

export class NavComponent extends Component {
    constructor(props) {
        super(props);
        
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.onLogin = this.onLogin.bind(this);

        this.state = {
            collapsed: true,
            showModal: false,
            isLoggedIn: false
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleLoginModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    onLogin(isSuccess) {
        this.setState({ 
            isLoggedIn: isSuccess,
            showModal: !isSuccess
        });
    }

    render() {
        var loginLogoutText = 'Login';
        if (this.state.isLoggedIn) {
            loginLogoutText = 'Logout';
        } 
        return (
            <div>
                <Navbar color="faded" light>
                <NavbarBrand href="/" className="mr-auto">
                    <img src={require('../assets/lotus_logo.png')} className="thumbnail-med" alt="lotus flower"/>
                    <span className="logo__brand"></span>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                    <NavItem>
                        <NavLink href="#" onClick={this.toggleLoginModal}>{loginLogoutText}</NavLink>
                        <Modal isOpen={this.state.showModal} toggle={this.toggleLoginModal} centered={true}>
                            <ModalHeader toggle={this.toggleLoginModal}>{loginLogoutText}</ModalHeader>
                            <ModalBody>
                                {this.state.showModal && <LoginControl isLoggedIn={this.state.isLoggedIn} onLogin={this.onLogin}/>}
                            </ModalBody>
                        </Modal>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">My Profile</NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        );
    }
}