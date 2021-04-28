import React ,{useEffect,useState} from 'react';
import * as config from '../../Config/Config';
import { Link } from 'react-router-dom';
import {Table,Button,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import { faTrashAlt,faEdit,faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from './Pagination';

/**
 * Declaring Porps as "FormValues"
 * * @param id as numer
 * * @param name as string
 * * @param email as string
 * * @param position as string
 * @returns 
 */
export interface FormValues {
    id: number,
    name: string,
    email: string,
    position: string
};

/**
 * Funciton fetch all employee details
 * @returns 
 */
const Employee: React.FC<FormValues> = () => {

    // Declarations of new state variable 
    const [totalCount, setCount] = useState(0);
    const [setOfEmployee, setEmp] = useState([] as FormValues[]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    useEffect(() => {
        document.title = `Employee`;
        getData();
        paginate(currentPage);
    }, []);

    /**
     * To fetch all employee
     */
    const getData = async () => {
        await axios.get(`${config.siteUrl}`).then(res => {
            setCount(res.data.count);
        });
    };

    /**
     * Function for changing page
     * @param pageNumber 
     */
    const paginate = async (pageNumber: number) =>{
        setCurrentPage(pageNumber);
        await axios.get(`${config.siteUrl}?page=`+pageNumber+`&limit=`+postsPerPage).then(res => {
            setEmp(res.data.items);
        });
    };

    /**
     * To delete the selected employee
     */
    const deleteEmployee = async (id: number) => {
        await axios.delete(`${config.siteUrl}/${id}`).then(res => {
            paginate(currentPage);
        });
    };

    return <>
        <div>
            <Row>
                <Col>
                    <Link to={`CreateEmployee`}>
                        <Button variant="primary" size="sm">
                            Add <FontAwesomeIcon icon={faPlusSquare} />
                        </Button>
                    </Link>
                </Col>
                <Col className="text-right"><h2>Employee Page</h2></Col>
            </Row>

            <Table bordered hover size="sm">
                <thead className="text-center">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {setOfEmployee.length > 0 && setOfEmployee.map(employee => ( 
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.position}</td>
                            <td className="text-center">                         
                                <Link to={`EditEmployee/${employee.id}`}>
                                    <Button variant="primary" size="sm">
                                         <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                </Link>                                
                                {' '}{' '}                               
                                <Button variant="danger" size="sm" onClick={ () => deleteEmployee(employee.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </td>
                        </tr>                                    
                    ))}  
                    {!setOfEmployee.length && <tr className="text-center"><td colSpan={4}>No Employee Found</td></tr>}
                </tbody>
            </Table>
            { totalCount > postsPerPage &&
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={totalCount}
                            paginate={paginate}
                        /> 
                    </Col> 
                </Row> 
            }                              
        </div>
   </>
}


export default Employee;