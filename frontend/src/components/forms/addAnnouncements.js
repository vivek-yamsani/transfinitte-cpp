import React, { useState, setState, useEffect } from 'react';
import { CheckboxGroup, Stack, Text, Checkbox, Wrap, WrapItem, Toast, } from '@chakra-ui/react';
import './style.css'
import { useToast } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { AddAnnouncement } from '../../fetchData';
import { GetDepartments } from '../../fetchData';
import { addCompany } from '../../fetchData'
function AddCompany() {
    const toast = useToast();
    const location = useLocation();
    const purpose=location.state.purpose;
    const pagename = (purpose === 'announce') ? 'Announcement' : 'Company';
    const [companyName, setCompanyName] = useState('');
    const [cgpaCriteria, setCGPACriteria] = useState(0.0);
    const [eligibleDepartments, setEligibleDepartments] = useState([]);
    const [role, setRole] = useState('');
    const [discription, setDiscription] = useState('');
    let options = []
    const [temp, setoptions] = useState(options)
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
        if (id === "cgpa_criteria")
            setCGPACriteria(value)
        if (id === "role")
            setRole(value);

    }
    useEffect(() => {
        GetDepartments().then((data)=>{
            setoptions(data)
            console.log("options",data);
        }
        );
    }, [])
    const handleSubmit = async () => {
        let res;
        if (purpose === 'announce')
            res = await AddAnnouncement({ title: companyName, description: discription, departments: eligibleDepartments })
        else res = await addCompany({ name: companyName, cgpa_criteria: cgpaCriteria, description: discription, eligible_departments: eligibleDepartments, role })
        const statusCode = res.status;
        const message = res.data.message;
        console.log("status code response", res);
        toast(
            {
                status: statusCode == 200 ? 'success' : 'error',
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
                    <label className="form__label" htmlFor="companyName">{pagename} Title </label>
                    <Textarea bg={'Background'} resize={'both'} className="form__input" type="text" value={companyName} onChange={(e) => handleInputChange(e)} id="companyName" placeholder="Title" />
                </div>
                <p>Departments:</p>
                <Wrap spacing={5}>
                    {options}
                </Wrap>

                <div className="username">
                    <label className="form__label" htmlFor="description">Description</label>
                    <Textarea bg={'Background'} resize={'both'} id="description" value={discription} onChange={(e) => handleInputChange(e)} placeholder="Description" />
                </div>

                {
                    (purpose === 'company') && (
                        <div className="username">
                            <label className="form__label" htmlFor="cgpa_criteria">cgpa criteria</label>
                            <Textarea className="form__input" id="cgpa_criteria" value={cgpaCriteria} onChange={(e) => handleInputChange(e)} placeholder="CGPA Criteria" />
                        </div>)

                }
                {
                    (purpose === 'company')&&(
                            <div className="username">
                            <label className="form__label" htmlFor="role">Job Role</label>
                            <Textarea className="form__input" id="role" value={role} onChange={(e) => handleInputChange(e)} placeholder="Role" />
                        </div> 
                    )
                }

                <div className="footer">
                    <Button onClick={() => handleSubmit()} type="submit" colorScheme={'teal'} mt='10' >Add {pagename}</Button>
                </div>
            </div>
        </div>
    )
}

export default AddCompany