import {Badge, Button, Col, Container, Dropdown, DropdownButton, Form, Row, Table} from "react-bootstrap";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Events, getEvent, getSoldTickets} from "../podo/events";
import {IoDocumentOutline, IoEllipsisHorizontalOutline, IoShareOutline} from "react-icons/io5";
import LoadingScreen from "../components/LoadingScreen";
import {dateReader, getRandomInt} from "../podo/utils";
import {useNavigate} from "react-router-dom";


export default function EventScreen() {
    let {id} = useParams();
    const [details, setDetails] = useState(null);
    const [date, setDate] = useState(Date.now());
    const [unsold, setUnsold] = useState(0);
    const [sold, setSold] = useState(0);
    const [soldTickets, setSoldTickets] = useState([]);

    let history = useNavigate();
    useEffect(() => {
        const filler = Events().at(0);
       getEvent(id).then((successObj) => {
           if (successObj.success){
               let dets = successObj.data.event;
               setDetails({
                   ...filler,
                   ...dets,
               })
               let _date = new Date(dets.eventDate);
               setDate(_date);
               let count = 0;
               let count2 = 0;
               for (let index in dets.ticketInfo) {
                   count += dets.ticketInfo.at(index).ticketsLeft
                   count2 += dets.ticketInfo.at(index).ticketsAvailable
                   setUnsold(count);
                   setSold(count2 - count);
               }

               setSoldTickets(getSoldTickets(dets.ticketInfo, _date))
           } else {
               history('/events')
           }
       });

    }, [id, history])

    if (details === null) {

        return (<LoadingScreen className={'h-100'}/>)
    } else {
        let status;
        let variant;
        if (details.approved){
            status = 'Selling';
            variant = 'success';
        } else {
            status = 'Reviewing';
            variant = 'info';
        }

        // const exportData = () => {
        //     const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        //         JSON.stringify(Events())
        //     )}`;
        //     const link = document.createElement("a");
        //     link.href = jsonString;
        //     link.download = "data.json";
        //
        //     link.click();
        // };

        return (<Container fluid className={'py-3 px-2'}>
            <div className={'d-md-flex flex-row mb-0 px-4'}>
               <span className={'d-flex flex-row verticalCenter'}>
                   <h3 className={'text-primary mb-0'}>{details.eventName}</h3>
                   <div className={'ms-2 verticalCenter'}><Button size={'sm'} variant={'outline-secondary'}>{details.category}</Button></div>
               </span>
                <div className={'ms-auto'}>
                    <Button variant={'outline-primary'} >Edit</Button>
                    <Button className={'ms-2'} variant={'outline-primary'}><IoShareOutline/> Share</Button>
                    <Button className={'ms-2'} variant={'primary'}>Visit</Button>
                </div>
            </div>

            <Container fluid className={'rounded-2 '}>
                <Row lg={'3'} md={'1'} sm={'1'} xs={'1'} className={''}>
                    <Col>
                        <Container fluid className={'mt-3 rounded-4 w-100 ar-square p-0'}>
                            <img src={details.image.at(0)} alt={details.eventName}
                                 className={'ar-square w-100 object-fit-cover rounded-3'}/>
                        </Container>
                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                            <h5>Description</h5>
                            <p className={'limitLines-2'}>{details.description}</p>
                        </Container>
                    </Col>
                    <Col>
                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3 d-flex flex-column mb-3'}>
                            <h5>Date</h5>
                            <p>{date.toString()}</p>
                        </Container>
                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                            <h5>Stats</h5>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Attending: </small>{sold}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Interested: </small>{getRandomInt(200)}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Unsold Tickets: </small>{unsold}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Status: </small><Badge className={' py-2'}
                                                                             bg={variant}>{status}</Badge></span>
                        </Container>

                    </Col>
                    <Col>

                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                            <h5>Location</h5>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Name: </small>{details.location}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Address Line 1: </small>{details.venue.address.line1}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Address Line 2: </small>{details.venue.address.line2}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>District: </small>{details.venue.address.district}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>City: </small>{details.venue.address.city}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Country: </small>{details.country}</span>

                        </Container>
                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                            <h5>Tickets</h5>
                            <Table size={'sm'} className={''} responsive>
                                <thead>
                                <tr>
                                    <td><strong>Name</strong></td>
                                    <td><strong>Price</strong></td>
                                    <td><strong>Available</strong></td>
                                    <td><strong>Left</strong></td>
                                </tr>
                                </thead>
                                <tbody>

                                {details.ticketInfo.map((_price) => (<tr key={_price._id}>
                                    <td>{_price.ticketType}</td>
                                    <td>{details.currency} {_price.price.toFixed(2)}</td>
                                    <td>{_price.ticketsAvailable}</td>
                                    <td>{_price.ticketsLeft}</td>
                                </tr>))}
                                </tbody>
                            </Table>
                        </Container>

                    </Col>

                </Row>
            </Container>
            <div className={'px-2'}>
                <Container className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                    <div className={'d-md-flex flex-row mb-0 '}>
                        <h3 className={'text-primary'}>Reservations</h3>
                        <div className={'ms-auto d-flex flex-row'}>

                            <div className={''} style={{
                                maxWidth: '250px'
                            }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className=" mr-sm-2"
                                /></div>

                            <Button className={'ms-2'} variant={'outline-primary'}><IoDocumentOutline/> Print</Button>


                        </div>
                    </div>
                    <div>
                        <Table responsive hover className={' mt-2'}>
                            <thead>
                            <tr>
                                <th scope="col"><strong>#</strong></th>
                                <th scope="col"><strong>Name</strong></th>
                                <th scope="col"><strong>Phone</strong></th>
                                <th scope="col"><strong>Option</strong></th>
                                <th scope="col"><strong>Purchase Date</strong></th>
                                <th scope="col"><strong>Actions</strong></th>
                            </tr>

                            </thead>
                            <tbody>
                            {soldTickets.map((_sold, index) => (<tr>
                                <td>{index + 1}</td>
                                <th scope="row">{_sold.name}</th>
                                <td>{_sold.phone}</td>
                                <td>{details.ticketInfo.at(_sold.option).ticketType}</td>
                                <td>{dateReader({date: _sold.date, weekDay: true})}</td>
                                <td><DropdownButton variant={'link'} title={<IoEllipsisHorizontalOutline size={25}/>}>
                                    <Dropdown.Item>Refund</Dropdown.Item>
                                    <Dropdown.Item>View Profile</Dropdown.Item>
                                    <Dropdown.Item>Change Ticket option</Dropdown.Item>
                                </DropdownButton></td>
                            </tr>))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        </Container>);
    }
}