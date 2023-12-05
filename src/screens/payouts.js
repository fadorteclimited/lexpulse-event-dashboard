import {Button, Col, Container, Row} from "react-bootstrap";
import {faker} from "@faker-js/faker";
import {getRandomInt} from "../podo/utils";

export default function Payouts() {
    let calcBal = getRandomInt(20000,800);
    let payoutModel = {
        balance: faker.commerce.price({min: calcBal, max:30000,symbol:'$'}),
        availableBalance: faker.commerce.price({min: 800, max:calcBal,symbol:'$',}),


    }

    return (<Container fluid className={'py-3'}>
        <Row>
            <Col>
                <h5>Accounts</h5>

            </Col>
            <Col md={'4'}>
                <Container fluid className={'rounded-4 py-3 bg-body px-3'}>
                    <h5>Total Balance</h5>
                    <h6>  <small className="text-body-secondary fw-bold ff-montserrat">{payoutModel.balance}</small>
                    </h6>
                    <h5>Available Balance </h5>
                    <h6>  <small className="text-body-secondary fw-bold ff-montserrat">{payoutModel.availableBalance}</small>
                    </h6>
                    <Button variant={'primary'}>Withdraw</Button>
                  </Container>
            </Col>
        </Row>
    </Container>)
}