import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './NavComponent.scss';
import LoginComponent from './LoginComponent';

export class NavComponent extends Component {
    constructor(props) {
        super(props);
        
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);

        this.state = {
            collapsed: true,
            showModal: false
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

    render() {
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
                        <NavLink href="#" onClick={this.toggleLoginModal}>Login</NavLink>
                        <Modal isOpen={this.state.showModal} toggle={this.toggleLoginModal}>
                            <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                            <ModalBody>
                                <LoginComponent/>
                            </ModalBody>
                        </Modal>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Other Link</NavLink>
                    </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        );
    }
}