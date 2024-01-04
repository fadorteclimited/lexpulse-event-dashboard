import {
    Button, Image, Nav, Navbar, NavbarCollapse, NavbarOffcanvas, NavDropdown, NavItem, NavLink, Offcanvas
} from "react-bootstrap";
import {
    IoCash,
    IoChatboxEllipsesOutline,
    IoCogOutline,
    IoGridOutline,
    IoListOutline,
    IoLogOutOutline,
    IoNotificationsOutline, IoPersonOutline,
} from "react-icons/io5";
import {faker} from "@faker-js/faker";
import Logo from '../assets/logo.png'
import {LinkContainer} from "react-router-bootstrap";
import Breadcrumbs from "./breadcrumbs";
import {getRandomInt} from "../podo/utils";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Header() {
    const [navProfile, setNavProfile] = useState({
        id: getRandomInt(300),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        image: faker.image.avatar(),
    })
    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user') === null){
            history('/login')
        } else {
            setNavProfile(JSON.parse(localStorage.getItem('user')))
        }

    },[history])

    return (<Navbar variant={'dark'} bg={'dark'} collapseOnSelect expand={'lg'} className={'sticky-sm-top pb-1'}>
        <LinkContainer to={'/'}>
        <Navbar.Brand className={'mobileOnly ff-montserrat'}><img src={Logo} alt={'logo'}
                                                                  height={40}/>Lexpulse</Navbar.Brand></LinkContainer>
        <NavItem className={'ms-auto mobileOnly me-2'}>
            <Button variant={'dark'}>
                <IoNotificationsOutline size={18}/>
            </Button>
        </NavItem>
        <NavItem className={'mx-0'} >
            <div className={'desktopOnly'}>
                <Breadcrumbs />
            </div>
        </NavItem>
        {/*<Navbar.Brand className={'ps-2'}>Events</Navbar.Brand>*/}
        <NavbarCollapse className={'desktopOnly'}>
            <Nav className={'ms-auto'}>

                <NavItem className={'mx-0'} >
                    <Button variant={'dark'}>
                        <IoNotificationsOutline size={18}/>
                    </Button>
                </NavItem>
                <NavItem className={'mx-0'}>
                    <Button  variant={'dark'}>
                        <IoChatboxEllipsesOutline size={18}/>
                    </Button>
                </NavItem>
                <NavItem className={'mx-0 '}>
                    <NavDropdown
                        title={<span>{navProfile.firstName} {navProfile.lastName}
                            <Image className={'ms-1 object-fit-cover'} style={{maxHeight: '25px'}}
                                   src={navProfile.image} alt={'avatar'} roundedCircle/>
                    </span>} menuVariant={'dark'} className={'me-0'}>
                        <LinkContainer
                            to={'/profile'}><NavDropdown.Item className={''}>View Profile</NavDropdown.Item></LinkContainer>
                        <LinkContainer to={'/support'}><NavDropdown.Item>
                            Support
                        </NavDropdown.Item></LinkContainer>

                    </NavDropdown>
                </NavItem>
            </Nav>
        </NavbarCollapse>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`}/>
        <NavbarOffcanvas className={'bg-dark navbar-dark mobileOnly'} placement={'end'}
                         id={'offcanvasNavbar-expand-lg'}>
            <Offcanvas.Header closeButton closeVariant={'white'}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                    <Navbar.Brand className={'mobileOnly ff-montserrat'}><img src={Logo} alt={'logo'} height={40}/>Lexpulse</Navbar.Brand>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={'mobileOnly'}>
                <Nav className={'ms-auto d-flex flex-column flex-fill justify-content-between'}>
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
                    <NavItem className={'me-3'}>
                        <LinkContainer to={'/account'}>
                            <NavLink><IoPersonOutline size={18}/> Account </NavLink>
                        </LinkContainer>
                    </NavItem>
                    <div className={'mt-auto'}>
                        <Nav className={'mt-auto w-100 '}>
                            <hr className={''}/>
                            <NavItem>
                                <NavLink><IoCogOutline size={28}/> Settings</NavLink>
                            </NavItem>
                            <LinkContainer to={'/login'}>
                                <NavLink><IoLogOutOutline size={28}/> Logout</NavLink>
                            </LinkContainer>
                        </Nav>
                    </div>
                </Nav>
            </Offcanvas.Body>

        </NavbarOffcanvas>

    </Navbar>)
}

// export function Sidebar() {
//     const [show, setShow] = useState(true);
//
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//
//     return ( <Offcanvas show={show} onHide={handleClose} >
//         <Offcanvas.Header closeButton>
//             <Offcanvas.Title>lexpulse</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//             <Button onClick={handleShow}>open</Button>
//             <p className="mb-0">
//                 This is content within an <code>.offcanvas-lg</code>.
//             </p>
//         </Offcanvas.Body>
//     </Offcanvas>)
// }