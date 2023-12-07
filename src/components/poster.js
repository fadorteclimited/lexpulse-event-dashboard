import {Badge, Button, Card, ListGroup} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {statuses} from "../podo/events";


export default function Poster({eventDetails}) {
    let variant;
    switch (eventDetails.status) {
        case statuses.at(0):
            variant = 'success';
            break;
        case statuses.at(1):
            variant = 'info';
            break;
        case  statuses.at(2):
            variant = 'warning';
            break;
        case statuses.at(3):
            variant = 'danger';
            break;
        default:
            variant = 'primary';
            break;
    }
    return (<LinkContainer to={'/events/' + eventDetails.id}>
        <Card className={'h-100 border-0 rounded-4 bg-body shadow-none' }>
            <Card.Img variant={'top'} src={eventDetails.poster} className={'rounded-4 '} alt={eventDetails.name}/>

            <Card.Body className={'px-0'}>
                <Card.Title>{eventDetails.name}</Card.Title>
                <Card.Text className={'limitLines-2 mb-0'}>{eventDetails.description}</Card.Text>
                <ListGroup variant={'flush px-0 mx-0 mb-1 shadow-none'}>
                    <ListGroup.Item className={'d-flex justify-content-between px-0'}>
                        Status: <Badge className={'rounded-pill py-2'} bg={variant}>{eventDetails.status}</Badge>
                    </ListGroup.Item>
                </ListGroup>
                <Button className={' rounded-3'} variant={'outline-primary'}>View Event</Button>
            </Card.Body>
        </Card>
    </LinkContainer>);
}
