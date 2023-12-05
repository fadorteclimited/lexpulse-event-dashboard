import {
    Button, Image, Nav, Navbar, NavbarCollapse, NavbarOffcanvas, NavDropdown, NavItem, NavLink, Offcanvas
} from "react-bootstrap";
import {
    IoCash, IoChatboxEllipsesOutline, IoGridOutline, IoListOutline, IoLogOutOutline, IoNotificationsOutline
} from "react-icons/io5";
import {faker} from "@faker-js/faker";
import Logo from '../logo.png'
import {LinkContainer} from "react-router-bootstrap";


export default function Header() {

    return (<Navbar variant={'dark'} bg={'dark'} collapseOnSelect expand={'lg'} className={'sticky-sm-top'}>
        <Navbar.Brand className={'mobileOnly ff-montserrat'}><img src={Logo} alt={'logo'}
                                                                  height={40}/>Lexpulse</Navbar.Brand>
        <NavItem className={'ms-auto mobileOnly me-2'}>
            <Button variant={'secondary'}>
                <IoNotificationsOutline size={18}/>
            </Button>
        </NavItem>
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
                        title={<span>{faker.person.firstName()} {faker.person.lastName()}
                            <Image className={'ms-1 object-fit-cover'} style={{maxHeight: '25px'}}
                                   src={faker.image.avatar()} alt={'avatar'} roundedCircle/>
                    </span>} menuVariant={'dark'} className={'me-0'}>
                        <LinkContainer
                            to={'/account'}><NavDropdown.Item className={''}>Account</NavDropdown.Item></LinkContainer>

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
                <Nav className={'ms-auto w-100 h-100'}>
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
                <Nav className={'mb-auto w-100 '}>
                    <hr className={''}/>
                    <NavItem>
                        <NavLink><IoLogOutOutline size={28}/> Logout</NavLink>
                    </NavItem>
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