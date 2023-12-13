import {Badge, Button, Col, Container, Dropdown, DropdownButton, Form, Row, Table} from "react-bootstrap";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getEvent, getSoldTickets, statuses} from "../podo/events";
import {IoDocumentOutline, IoEllipsisHorizontalOutline, IoShareOutline} from "react-icons/io5";
import LoadingScreen from "../components/LoadingScreen";
import {dateReader} from "../podo/utils";


export default function EventScreen() {
    let {id} = useParams();
    const [details, setDetails] = useState(null);
    const [date, setDate] = useState(Date.now());
    const [unsold, setUnsold] = useState(0);
    const [soldTickets, setSoldTickets] = useState([])
    useEffect(() => {
        let dets = getEvent(parseInt(id));
        setDetails(dets)
        setDate(Date(dets.date))
        let count = 0
        for (let index in dets.prices) {
            count += dets.prices.at(index).count
            setUnsold(count);

        }

        setUnsold(count - dets.sold);
        setSoldTickets(getSoldTickets(dets.prices))
    }, [id])
    useEffect(() => {


    }, [details])
    if (details === null) {

        return (<LoadingScreen className={'h-100'}/>)
    } else {
        let variant;
        switch (details.status) {
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
        return (<Container fluid className={'py-3 px-2'}>
            <div className={'d-md-flex flex-row mb-0 px-4'}>
                <h3 className={'text-primary'}>{details.name}</h3>
                <div className={'ms-auto'}>
                    <Button variant={'outline-primary'}>Edit</Button>
                    <Button className={'ms-2'} variant={'outline-primary'}><IoShareOutline/> Share</Button>
                    <Button className={'ms-2'} variant={'primary'}>Visit</Button>
                </div>
            </div>

            <Container fluid className={'rounded-2 '}>
                <Row lg={'3'} md={'1'} sm={'1'} xs={'1'} className={''}>
                    <Col>
                        <Container fluid className={'mt-3 rounded-4 w-100 ar-square p-0'}>
                            <img src={details.poster} alt={details.name}
                                 className={'ar-square w-100 object-fit-cover rounded-3'}/>
                        </Container>
                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3 d-flex flex-column mb-3'}>
                            <h5>Date</h5>
                            <p>{date.toString()}</p>
                        </Container>
                    </Col>
                    <Col>
                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                            <h5>General</h5>
                            <strong>Description</strong>
                            <p>{details.description}</p>
                        </Container>
                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                            <h5>Location</h5>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Name: </small>{details.venue.name}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Address Line 1: </small>{details.venue.address.line1}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Address Line 2: </small>{details.venue.address.line2}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>District: </small>{details.venue.address.district}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>City: </small>{details.venue.address.city}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Country: </small>{details.venue.address.Country}</span>

                        </Container>
                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                            <h5>Category</h5>
                            <div className={'d-flex'}><Badge pill bg={'primary'}
                                                             className={'p-2'}>{details.genre}</Badge></div>
                        </Container>

                    </Col>
                    <Col>
                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                            <h5>Stats</h5>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Attending: </small>{details.sold}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Interested: </small>{details.interested}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Unsold Tickets: </small>{unsold}</span>
                            <span className={'d-flex flex-row justify-content-between'}><small
                                className={'fw-bold'}>Status: </small><Badge className={'rounded-pill py-2'}
                                                                             bg={variant}>{details.status}</Badge></span>
                        </Container>
                        <Container fluid className={'p-3 rounded-4 bg-body-tertiary mt-3'}>
                            <h5>Tickets</h5>
                            <Table size={'sm'} className={''}>
                                <thead>
                                <tr>
                                    <td><strong>Name</strong></td>
                                    <td><strong>Price</strong></td>
                                    <td><strong>Total</strong></td>
                                    <td><strong>Sold</strong></td>
                                </tr>
                                </thead>
                                <tbody>

                                {details.prices.map((_price) => (<tr>
                                    <td>{_price.name}</td>
                                    <td>${_price.price.toFixed(2)}</td>
                                    <td>{_price.count}</td>
                                    <td>{_price.count - _price.sold}</td>
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
                                <td>{details.prices.at(_sold.option).name}</td>
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