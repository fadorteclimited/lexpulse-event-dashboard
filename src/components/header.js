import {
    Button, Image, Nav, Navbar, NavbarCollapse, NavbarOffcanvas, NavItem, NavLink, Offcanvas
} from "react-bootstrap";
import {
    IoChatboxEllipsesOutline,
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
import Notifications from "./notifications";
import {useDispatch, useSelector} from "react-redux";
import {getNotifications, selectFullState} from "../podo/NotificationsSlice";


export default function Header() {
    const [navProfile, setNavProfile] = useState({
        id: getRandomInt(300),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        image: faker.image.avatar(),
    })
    const [showNotifications, setShowNotifications] = useState(false);
    let history = useNavigate();
    const notify = useSelector(selectFullState);
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('user') === null){
            history('/login')
        } else {
            setNavProfile(JSON.parse(localStorage.getItem('user')));
            if (!notify.hasError && !notify.hasRun){
                dispatch(getNotifications());
            }
        }

    },[history])

    const closeNotifications = () => setShowNotifications(false)

    return (<Navbar variant={'dark'} bg={'dark'} collapseOnSelect expand={'lg'} className={'sticky-top pb-1'} sticky={'top'}>
        <LinkContainer to={'/'}>
        <Navbar.Brand className={'mobileOnly ff-montserrat'}><img src={Logo} alt={'logo'}
                                                                  height={40}/>Lexpulse</Navbar.Brand></LinkContainer>

        <NavItem className={'ms-auto mobileOnly me-2'}>
            <Button variant={'dark'} onClick={setShowNotifications.bind(this, true)}>
                <IoNotificationsOutline size={18}/>
            </Button>
        </NavItem>
        <NavItem className={'mx-0'} >
            <div className={'desktopOnly'}>
                <Breadcrumbs />
            </div>
        </NavItem>
        {/*<Navbar.Brand className={'ps-2'}>Events</Navbar.Brand>*/}
        <Notifications show={showNotifications} handleClose={closeNotifications}/>

        <NavbarCollapse className={'desktopOnly'}>
            <Nav className={'ms-auto'}>

                <NavItem className={'mx-0'} >
                    <Button variant={'dark'} onClick={setShowNotifications.bind(this, true)}>
                        <IoNotificationsOutline size={18}/>
                    </Button>
                </NavItem>
                <NavItem className={'mx-0'}>
                    <Button  variant={'dark'}>
                        <IoChatboxEllipsesOutline size={18}/>
                    </Button>
                </NavItem>
                <NavItem className={'mx-0 '}>
                  <LinkContainer to={'/profile'} exact>
                      <NavLink> <span>{navProfile.firstName} {navProfile.lastName}
                          <Image className={'ms-1 object-fit-cover'} style={{maxHeight: '25px'}}
                                 src={navProfile.image} alt={'avatar'} roundedCircle/>
                    </span></NavLink>
                  </LinkContainer>
                    {/*    <LinkContainer*/}
                    {/*        to={'/profile'}><NavDropdown.Item className={''}>View Profile</NavDropdown.Item></LinkContainer>*/}
                    {/*    <LinkContainer to={'/support'}><NavDropdown.Item>*/}
                    {/*        Support*/}
                    {/*    </NavDropdown.Item></LinkContainer>*/}

                    {/*</NavDropdown>*/}
                </NavItem>
            </Nav>
        </NavbarCollapse>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`}/>
        <NavbarOffcanvas className={'bg-dark navbar-dark mobileOnly'} placement={'end'}
                         id={'offcanvasNavbar-expand-lg'} backdrop={showNotifications}>
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
                    {/*<NavItem className={'me-3'}>*/}
                    {/*    <LinkContainer to={'/payouts'}>*/}
                    {/*        <NavLink><IoCash size={18}/> Payouts </NavLink>*/}
                    {/*    </LinkContainer>*/}
                    {/*</NavItem>*/}
                    <NavItem className={'me-3'}>
                        <LinkContainer to={'/profile'}>
                            <NavLink><IoPersonOutline size={18}/> Account </NavLink>
                        </LinkContainer>
                    </NavItem>
                    <div className={'mt-auto'}>
                        <Nav className={'mt-auto w-100 '}>
                            <hr className={''}/>
                            <Nav.Link onClick={() => {
                                localStorage.clear();
                                history('/login');
                            }} className={'text-danger'}><IoLogOutOutline size={28}/> Logout</Nav.Link>
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