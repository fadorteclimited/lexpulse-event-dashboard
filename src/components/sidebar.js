import {Nav, Navbar, NavItem, NavLink} from "react-bootstrap";
import Logo from '../logo.png'
import {
    IoCash, IoCogOutline, IoGridOutline, IoListOutline, IoLogOutOutline
} from "react-icons/io5";
import {LinkContainer} from "react-router-bootstrap";

export default function Sidebar() {


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
                    <LinkContainer to={'/'}>
                        <NavLink><IoGridOutline size={18}/> Dashboard</NavLink>
                    </LinkContainer>
                </NavItem>
                <NavItem className={'me-3'}>
                    <LinkContainer to={'/events'}>
                        <NavLink><IoListOutline size={18}/> Events</NavLink>
                    </LinkContainer>
                </NavItem>
                <NavItem className={'me-3'}>
                    <LinkContainer to={'/payouts'}>
                        <NavLink><IoCash size={18}/> Payouts </NavLink>
                    </LinkContainer>
                </NavItem>

            </Nav>

            <Nav className={'mt-auto nav-pills d-flex w-100 justify-content-around flex-column'}>
                <NavItem>
                    <NavLink><IoCogOutline size={28}/> Settings</NavLink>
                </NavItem>
                <LinkContainer to={'/login'}>
                    <NavLink><IoLogOutOutline size={28}/> Logout</NavLink>
                </LinkContainer>
            </Nav>

        </Navbar>

    </div>);
};