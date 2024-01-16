import {Badge, Card, Offcanvas} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectNotifications} from "../podo/NotificationsSlice";
import {AiOutlineCheckCircle} from "react-icons/ai";


export default function Notifications({show, handleClose}) {

    const notifications = useSelector(selectNotifications)
    return (<Offcanvas placement={'end'} show={show} onHide={handleClose} className={'bg-dark text-light'}>
        <Offcanvas.Header closeButton closeVariant={'white'}>
            <Offcanvas.Title className={''}>All Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {
                (notifications.length === 0) ?
                    (
                        <div className={'text-center fillSpace verticalCenter justify-content-center'}>
                           <span className={'mb-3'}> <AiOutlineCheckCircle size={80} className={'text-success'}/></span>
                            <h5>All Caught Up</h5>
                        </div>
                    ) :
                    notifications.map((notification, index) => (
                        <Card key={index} className="border-primary rounded-4 mb-3" bg={'dark'} text={'light'}
                              body={true}>
                            <h6 className="text-primary fw-bold card-title">
                                {notification.title}
                            </h6>
                            <Badge bg={'primary'} className="my-1">
                                {notification.notificationType}
                                {/*meant for date*/}
                            </Badge>
                            <Card.Text className={'limitLines-3'}>
                                {notification.message}
                            </Card.Text>
                        </Card>))

            }

        </Offcanvas.Body>
    </Offcanvas>)
}