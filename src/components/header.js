import {Button, Dropdown, Image, Nav, Navbar, NavbarCollapse, NavItem} from "react-bootstrap";
import {
    IoChatboxEllipsesOutline,
    IoNotificationsOutline
} from "react-icons/io5";
import {faker} from "@faker-js/faker";


export default function Header() {

    return (<Navbar variant={'dark'} bg={'dark'} collapseOnSelect expand={'lg'}>

        <NavbarCollapse className={''}>
            <Nav className={'ms-auto'}>
                <NavItem>
                    <Button variant={'secondary'}>
                        <IoNotificationsOutline size={18}/>
                    </Button>
                </NavItem>
                <NavItem>
                    <Button variant={'secondary'}>
                        <IoChatboxEllipsesOutline size={18}/>
                    </Button>
                </NavItem>
                <NavItem>
                    <Dropdown>
                        <Dropdown.Toggle variant={'secondary'}>
                            <span>{faker.person.fullName()} <Image className={'ms-1 object-fit-cover'} style={{
                                maxHeight: '20px'
                            }} src={faker.image.avatar()}
                                                  alt={'avatar'} roundedCircle/></span>
                        </Dropdown.Toggle>
                    </Dropdown>
                </NavItem>
            </Nav>
        </NavbarCollapse>
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