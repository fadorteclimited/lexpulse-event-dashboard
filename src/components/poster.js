import {Badge, Button, Card} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


export default function Poster({eventDetails}) {

            let status;
    let variant;
    if (eventDetails.approved){
        status = 'Selling';
        variant = 'success';
    } else {
        status = 'Reviewing';
        variant = 'info';
    }

    return (<LinkContainer to={'/events/' + eventDetails._id}>
        <Card className={'h-100 border-0 rounded-4 bg-body shadow-none' }>
            <Card.Img variant={'top'} src={eventDetails.image.at(0)} className={'rounded-4 ar-43'} alt={eventDetails.name}/>

            <Card.Body className={'px-2'}>
                <Card.Title>{eventDetails.eventName}</Card.Title>
                <Card.Text className={'limitLines-2 mb-0'}>{eventDetails.description}</Card.Text>
                <Card.Text className={'d-flex justify-content-between mt-3'}>
                        Status: <Badge className={'py-2'} bg={variant}>{status}</Badge>
                    </Card.Text>
                <Button className={' rounded-3'} variant={'outline-primary'} onClick={() => console.log.bind(this,eventDetails)}>View Event</Button>
            </Card.Body>
        </Card>
    </LinkContainer>);
}
