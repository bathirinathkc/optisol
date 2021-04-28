import React ,{useEffect,useState} from 'react';
import * as config from '../../Config/Config';
import { useHistory,useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

/**
 * Declaring Porps as "FormValues"
 *  * @param name as string
 *  * @param email as string
 *  * @param position as string
 * @returns 
 */
interface FormValues {
    name: string,
    email: string,
    position: string
};

/**
 * Assigning FormValues as "defaultValues"
 *  * @param name as string
 *  * @param email as string
 *  * @param position as string
 * @returns 
 */
const defaultValues: FormValues = {
    name: "",    
    email: "",
    position: ""    
};

/**
 * Funciton the fetch and edit the selected employee
 * @returns 
 */
const EditEmployee: React.FC<FormValues> = () => {

    // Declare new state variable as "retEmp"
    const [values, setValues] = useState(defaultValues as FormValues);

    // To get the id from params
    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        document.title = `Edit - Employee`;
        getData();
    }, []);

    /**
     * Funciton fetch the selected employee
     */
    const getData = async () => {
        await axios.get(`${config.siteUrl}/${id}`).then(res => {
            setValues(res.data);
        });
    };
    
    /**
     * Funciton to bind form values
     */
    const handleChange = (event: any) => {
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    };

    // Declaration of header
    const headers = { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With'
    };

    /**
     * Funciton to update the selected employee
     */
    const handleSubmit = (event:any) => {
        event.preventDefault();
        axios.put(`${config.siteUrl}/${id}`, values, {headers}).then(data => {
              history.goBack();
        });
    }

    return <>
        <h3>Edit Employee</h3>
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" defaultValue={values.name} placeholder="Enter name" onChange={(e) => handleChange(e)} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" defaultValue={values.email} placeholder="Enter email" onChange={(e) => handleChange(e)} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" name="position" defaultValue={values.position} placeholder="Enter position" onChange={(e) => handleChange(e)} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
}

export default EditEmployee;