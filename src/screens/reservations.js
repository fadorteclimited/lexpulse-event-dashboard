import {Button, Container, Dropdown, DropdownButton, Form, Table} from "react-bootstrap";
import {IoDocumentOutline, IoEllipsisHorizontalOutline} from "react-icons/io5";
import {dateReader} from "../podo/utils";


export default function Reservations() {

    return (<div className={'px-2'}>
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
    </div>)
}