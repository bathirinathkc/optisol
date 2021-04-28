import React ,{useEffect,useState} from 'react';
import * as config from '../../Config/Config';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";

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
 * Function to create employee
 * @returns 
 */
const CreateEmployee: React.FC<FormValues> = () => {

    // Declare new state variable as "values"
    const [values] = useState(defaultValues as FormValues);

    useEffect(() => {
        document.title = `Create - Employee`;
    }, []);

    // Declaring validation
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const history = useHistory();

    // Declaration of header
    const headers = { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With'
    };

    /**
     * Funciton to create employee
     */
    const onSubmit = (data) => {
        axios.post(`${config.siteUrl}`, data, { headers }).then(data => [
            history.goBack()
        ]);
    };

    return <>
        <h3>Create Employee</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    defaultValue={values.name} 
                    placeholder="Enter name"  
                    {...register("name", 
                        {
                            required: true,
                            maxLength: 20,
                            pattern: /^[A-Za-z0-9]+$/i
                        }
                    )} 
                />
                <Form.Text className="text-muted">
                    {errors?.name?.type === "required" && <p>Name is required</p>}
                    {errors?.name?.type === "maxLength" && (
                        <p>Name cannot exceed 20 characters</p>
                    )}
                    {errors?.name?.type === "pattern" && (
                        <p>Alphabetical characters only</p>
                    )}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email"  
                    defaultValue={values.email} 
                    {...register("email", 
                        {
                            required: true,
                            pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i
                        }
                    )} 
                />
                <Form.Text className="text-muted">
                    {errors?.email?.type === "required" && <p>Email is required</p>}
                    {errors?.email?.type === "pattern" && (
                        <p>Email is invalid</p>
                    )}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control 
                    type="text" 
                    defaultValue={values.position} 
                    placeholder="Enter position" 
                    {...register("position", 
                        {
                            required: true,
                        }
                    )} 
                />
                <Form.Text className="text-muted">
                    {errors?.position?.type === "required" && <p>Position is required</p>}
                </Form.Text>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
}

export default CreateEmployee;