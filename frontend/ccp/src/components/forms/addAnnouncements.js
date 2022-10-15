import React, { useState, setState, useEffect } from 'react';
import { CheckboxGroup, Stack, Text, Checkbox, Wrap, WrapItem, Toast, } from '@chakra-ui/react';
import './style.css'
import { useToast } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { AddAnnouncement } from '../../fetchData';
import { GetDepartments } from '../../fetchData';
function AddCompany() {
    const toast=useToast();
    const [companyName, setCompanyName] = useState('');
    const [cgpaCriteria, setCGPACriteria] = useState(0.0);
    const [eligibleDepartments, setEligibleDepartments] = useState([]);
    const [discription, setDiscription] = useState('');
    let options = [{ id: 1, name: 'CSE' }, { id: 1, name: 'CSE' }, { id: 1, name: 'CSE' }, { id: 1, name: 'CSE' }, { id: 1, name: 'CSE' }, { id: 1, name: 'CSE' }, { id: 1, name: 'CSE' }, { id: 1, name: 'CSE' }, { id: 1, name: 'CSE' }]
    const [temp,setoptions]=useState(options)
    options = temp.map((item) => {
        return (
            <Checkbox
                onChange={(e) => (e.target.checked ? (setEligibleDepartments([...eligibleDepartments, { id: item.id }])) : (setEligibleDepartments(eligibleDepartments.filter((x) => x.id != item.id))))}
                colorScheme='blue'

            >{item.name}</Checkbox>)
    })

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "companyName") {
            setCompanyName(value);
        }
        if (id === "cgpaCriteria") {
            setCGPACriteria(value);
        }
        if (id === "eligibleDepartments") {
            setEligibleDepartments(value);
        }
        if (id === "description") {
            setDiscription(value);
        }

    }
    useEffect(async ()=>{
        const depts=await GetDepartments();
        console.log("All depts",depts);
        setoptions(depts);
    },[])
    const handleSubmit = async () => {
    const res= await AddAnnouncement({title:companyName,description:discription,departments:eligibleDepartments})
    const statusCode=res.status;
    const message=res.data.message;
    console.log("status code response",res);
        toast(
            {
                status: statusCode==200?'success':'error',
                variant: 'left-accent',
                position: 'bottom-right',
                title: message,
                isClosable: true,
            }
        )
}

    return (
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" htmlFor="companyName">Company Name </label>
                    <input className="form__input" type="text" value={companyName} onChange={(e) => handleInputChange(e)} id="companyName" placeholder="Company Name" />
                </div>
                <div className="username">
                    <label className="form__label" htmlFor="cgpaCriteria">CGPA Criteria </label>
                    <input type="text" name="" id="cgpaCriteria" value={cgpaCriteria} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="CGPA Criteria" />
                </div>
                <p>Departments:</p>
                <Wrap spacing={5}>
                    {options}
                </Wrap>

                <div className="username">
                    <label className="form__label" htmlFor="description">Description</label>
                    <textarea className="form__input" id="description" value={discription} onChange={(e) => handleInputChange(e)} placeholder="Description" />
                </div>  

                <div className="footer">
                    <Button onClick={() => handleSubmit()} type="submit" colorScheme={'teal'} mt='10' >AddCompany</Button>
                </div>
        </div>
            </div>
    )
}

export default AddCompany