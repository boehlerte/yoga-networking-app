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
        this.onLogout = this.onLogout.bind(this);

        this.state = {
            collapsed: true,
            showModal: false,
            isLoggedIn: this.props.isLoggedIn,
            user: this.props.user
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

    onLogin(isSuccess, user) {
        this.setState({ 
            isLoggedIn: isSuccess,
            showModal: !isSuccess,
            user: user
        });
        if (isSuccess) {
            this.props.onLogin(user);
        }
    }

    onLogout(isConfirm) {
        if (isConfirm) {
            this.setState({
                isLoggedIn: false,
                showModal: false,
                user: null
            });
            localStorage.removeItem('user');
            this.props.onLogout();
        } else {
            this.setState({
                showModal: false
            })
        } 
    }

    render() {
        const { isLoggedIn, collapsed, user } = this.state;
        var loginLogoutText = 'Login';
        if (isLoggedIn) {
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
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                    <NavItem>
                        <NavLink href="#" onClick={this.toggleLoginModal}>{loginLogoutText}</NavLink>
                        <Modal isOpen={this.state.showModal} toggle={this.toggleLoginModal} centered={true}>
                            <ModalHeader toggle={this.toggleLoginModal}>{loginLogoutText}</ModalHeader>
                            <ModalBody>
                                {
                                    this.state.showModal && 
                                    <LoginControl 
                                        isLoggedIn={isLoggedIn} 
                                        onLogin={this.onLogin}
                                        onLogout={this.onLogout}
                                    />
                                }
                            </ModalBody>
                        </Modal>
                    </NavItem>
                    <NavItem>
                        {isLoggedIn && user != null && <NavLink href={"#/profile/"+ user.username}>My Profile</NavLink>}
                    </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        );
    }
}
