import {Nav, Navbar, NavItem} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import Logo from '../assets/logo.png'
import {
    IoCash, IoGridOutline, IoListOutline, IoLogOutOutline
} from "react-icons/io5";
import {LinkContainer,} from "react-router-bootstrap";

export default function Sidebar() {

    let history = useNavigate();
    return (<div className={'h-100'}>
        <Navbar variant={'dark'} bg={'dark'} sticky={"top"} expanded className="d-flex flex-column sidebar"
                style={{
                    height: '100vh'
                }}

        >
            <LinkContainer to={'/'}>
                <Navbar.Brand className={'ff-montserrat'}><img src={Logo} alt={'logo'}
                                                               height={40}/>Lexpulse</Navbar.Brand>

            </LinkContainer>
            <Nav className={'d-flex flex-column nav-pills w-100 mt-3 justify-content-around mx-0'}>
                <NavItem className={'me-3'}>

                        <Nav.Link as={NavLink} exact to={'/'}><IoGridOutline size={18}/> Dashboard</Nav.Link>

                </NavItem>
                <NavItem className={'me-3'}>
                        <Nav.Link as={NavLink} exact to={'/events'}><IoListOutline size={18}/> Events</Nav.Link>
                </NavItem>
                <NavItem className={'me-3'}>

                        <Nav.Link as={NavLink} exact to={'/payouts'}><IoCash size={18}/> Payouts </Nav.Link>

                </NavItem>

            </Nav>

            <Nav className={'mt-auto nav-pills d-flex w-100 justify-content-around flex-column'}>

                <Nav.Link onClick={() => {
                    localStorage.clear();
                    history('/login');
                }} className={'text-danger'}><IoLogOutOutline size={28}/> Logout</Nav.Link>
            </Nav>

        </Navbar>

    </div>);
};