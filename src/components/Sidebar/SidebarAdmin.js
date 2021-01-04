/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import './sidebar.css'
import { NavLink as NavLinkRRD, Link, Redirect } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col
} from "reactstrap";
import Dropdown from "reactstrap/lib/Dropdown";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";

var ps;

class SidebarAdmin extends React.Component {
    state = {
        collapseOpen: true,
        display: []
    };
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
    }
    componentDidMount() {
        let display = []
        this.props.routes.map(async (prop) => {
            if (prop.render) {
                if (prop.menu) {

                    display.push(false)
                    await this.setState({
                        ...this.state,
                        display: display
                    })

                }
            }
        })
        console.log(this.state.display);
        console.log(display);
    }
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }
    // toggles collapse between opened and closed (true/false)
    toggleCollapse = () => {
        this.setState({
            ...this.state,
            collapseOpen: !this.state.collapseOpen
        });
    };
    // closes the collapse
    closeCollapse = () => {
        this.setState({
            ...this.state,
            collapseOpen: true
        });
    };
    toggle = async () => {
        await this.setState({
            ...this.state,
            dropdownOpen: true
        })
        console.log(this.state.dropdownOpen);
    }
    // creates the links that appear in the left menu / Sidebar
    createLinks = routes => {
        return routes.map((prop, key) => {
            console.log(key);
            if (prop.render) {
                if (prop.menu) {
                    return (
                        <>
                            <NavItem key={key} onClick={async () => {
                                let display = this.state.display
                                display[key] = !this.state.display[key]
                                await this.setState({
                                    ...this.state,
                                    display: display
                                })
                                console.log(key + "==>" + this.state.display);
                            }}>
                                <NavLink to={prop.layout + prop.path}
                                    tag={NavLinkRRD}
                                    onClick={this.closeCollapse}
                                    activeClassName="active" >
                                    <i className={prop.icon} />
                                    {prop.name}
                                    <i style={{ paddingLeft: '5px' }} className={(this.state.display[key]) ?
                                        (prop.down) : (prop.right)} />
                                </NavLink>
                            </NavItem>
                            <NavItem style={{ display: this.state.display[key] ? ('block') : ('none'), }}>
                                {prop.submenu.map((item, key) => {
                                    console.log(this.state.display[key]);
                                    return (
                                        <NavItem key={key} style={{ paddingLeft: '40px' }}>
                                            <NavLink
                                                tag={NavLinkRRD}
                                                onClick={this.closeCollapse}
                                                activeClassName="active"
                                                to={prop.layout + item.path}
                                                id="btn-submenu" key={key} style={{
                                                    margin: '0px', background: '#ffffff',
                                                    border: 'none', boxShadow: 'none',
                                                    paddingBottom: '2px',
                                                    fontWeight: 300
                                                }}
                                            >
                                                {item.name}
                                            </NavLink></NavItem>
                                    )
                                })}</NavItem>
                        </>
                    )
                }
                else {
                    return (
                        <NavItem key={key}>
                            <NavLink
                                to={prop.layout + prop.path}
                                tag={NavLinkRRD}
                                onClick={this.closeCollapse}
                                activeClassName="active"
                            >
                                <i className={prop.icon} />
                                {prop.name}
                            </NavLink>
                        </NavItem>
                    );
                }
            }
            else return null;
        });
    };
    render() {
        const { bgColor, routes, logo } = this.props;
        let navbarBrandProps;
        if (logo && logo.innerLink) {
            navbarBrandProps = {
                to: logo.innerLink,
                tag: Link
            };
        } else if (logo && logo.outterLink) {
            navbarBrandProps = {
                href: logo.outterLink,
                target: "_blank"
            };
        }
        return (
            <Navbar
                className="navbar-vertical fixed-left navbar-light bg-white"
                expand="md"
                id="sidenav-main"
            >
                <Container fluid>
                    {/* Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={this.toggleCollapse}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* Brand */}
                    {logo ? (
                        <NavbarBrand className="pt-0" {...navbarBrandProps}>
                            <img
                                alt={logo.imgAlt}
                                className="navbar-brand-img"
                                src={logo.imgSrc}
                            />
                        </NavbarBrand>
                    ) : null}

                    <Collapse navbar isOpen={this.state.collapseOpen}>
                        {/* Collapse header */}
                        <div className="navbar-collapse-header d-md-none">
                            <Row>
                                {logo ? (
                                    <Col className="collapse-brand" xs="6">
                                        {logo.innerLink ? (
                                            <Link to={logo.innerLink}>
                                                <img alt={logo.imgAlt} src={logo.imgSrc} />
                                            </Link>
                                        ) : (
                                                <a href={logo.outterLink}>
                                                    <img alt={logo.imgAlt} src={logo.imgSrc} />
                                                </a>
                                            )}
                                    </Col>
                                ) : null}
                                <Col className="collapse-close" xs="6">
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        onClick={this.toggleCollapse}
                                    >
                                        <span />
                                        <span />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        {/* Form */}
                        <Form className="mt-4 mb-3 d-md-none">
                            <InputGroup className="input-group-rounded input-group-merge">
                                <Input
                                    aria-label="Search"
                                    className="form-control-rounded form-control-prepended"
                                    placeholder="Tìm kiếmm"
                                    type="search"
                                />
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <span className="fa fa-search" />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                        {/* Navigation */}
                        <Nav navbar>{this.createLinks(routes)}</Nav>
                        <Redirect from="/admin/item" to="/admin/item/list" />
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

SidebarAdmin.defaultProps = {
    routes: [{}]
};

SidebarAdmin.propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the image src of the logo
        imgSrc: PropTypes.string.isRequired,
        // the alt for the img
        imgAlt: PropTypes.string.isRequired
    })
};

export default SidebarAdmin;
