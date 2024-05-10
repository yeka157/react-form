import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button
} from "@chakra-ui/react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [customerList, setCustomerList] = useState([]);

  const navigate = useNavigate();

  const addCustomer = () => {
    navigate('/add');  
  }

  const getCustomerData = async () => {
    try {
      let url = process.env.REACT_APP_API_URL;
      let res = await Axios.get(url + "customer");
      setCustomerList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="mb-8 font-bold">List of Customer</h1>
        <Button colorScheme="purple" onClick={addCustomer}>Add Customer</Button>
      </div>

      <TableContainer>
        <Table variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Full Name</Th>
              <Th isNumeric>Phone Number</Th>
              <Th>Email</Th>
              <Th>Address</Th>
              <Th>Birth Date</Th>
              <Th>Gender</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customerList.map((value, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{value.name}</Td>
                <Td isNumeric>{value.phone_number}</Td>
                <Td>{value.email}</Td>
                <Td>{value.address}</Td>
                <Td>{value.birthdate}</Td>
                <Td>{value.gender === 1 ? "Male" : "Female"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
