import React, { useState,useEffect } from 'react';
import { Row,Col,Button } from 'react-bootstrap';

/**
 * Function for counting no of times
 * @returns 
 */
const Counter: React.FC = () => {

    // Declare new state variable as "count"
    const [count, setCount] = useState(0);

    // useEffect is similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Counter - ${count} times`;
    });

    return <> 
        <Row>
            <Col md={{ span: 4, offset: 4 }}>
                <div className="text-center jumbotron">
                    <h2 >Counter Page</h2>                    
                    <p>You clicked {count} times</p>                    
                    <Button variant="success" onClick={() => setCount(count + 1)}>Click me</Button>
                    {' '}{' '}
                    <Button variant="danger" onClick={() => setCount(0)}>Reset</Button>                       
                </div>
            </Col>
        </Row>               
   </>
}

export default Counter;