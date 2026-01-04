import { useEffect, useState } from "react"
import usersRepo from '../../Repos/usersRepo.js'
import GenericTableComponent from '../GenericTableComponent.jsx'



const Customers = () => {

    const [users, setUsers] = useState([])
    const [customerTableRow, setCustomerTableRow] = useState({
        fullName: '',
        joinedAt: '',
        products: [{ name: '', qty: 0, date: '' }]
    })



    useEffect(() => {

        const unsubscribe = usersRepo.getAllUsers((usersFromDb) => {
            setUsers(usersFromDb);
        });
        return () => unsubscribe();
    }, [])


    useEffect(() => {
        const newRow = users.map((user) => ({  /// [fName, joined,prod:[]]
            fName: user.firstName,
            joined: user.joinedAt,
            prod: user.products,
        }));
        console.log(newRow)
        
        // setCustomerTableRow(...customerTableRow , newRow);
    }, [users]);



    const createTableRow = (users) => {
        console.log(customerTableRow)
        console.log(tableRow)
    }

    const prodTable = null

    const headers = [
        { key: "fName", label: "Full Name" },
        { key: "joined", label: "Joined At" },
        { key: "products", label: "Products" }
    ];


    const tableRow2 = [
        { name: 'Watch', qty: '1', date: '1/1/23' }
    ];

    const headersProductsTable = [
        { key: "name", label: "Products" },
        { key: "qty", label: "Qty" },
        { key: "date", label: "Date" }
    ];



    return (
        <div className='categories'>

            <h1>Customers</h1>
            <GenericTableComponent headers={headers} tableRow={customerTableRow} />
        </div>
    )
}

export default Customers