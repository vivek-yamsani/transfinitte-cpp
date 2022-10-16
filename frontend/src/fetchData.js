import { json } from "react-router-dom";
import { API_URL } from "./constants";
import { Fetch } from './fetch_function'
export const Logins = async ({ rollno, password }) => {//actual way to fetch data
    console.log("From login");
    // const res = await fetch(`${API_URL}/users/login`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         email,
    //         password,
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // });
    // const jsonRes = await res.json();
}
export const getStatus=async ({id})=>{
    const res = await Fetch(`${API_URL}/companies/get/:${id}`)
    const jsonRes = await res.json();
    return jsonRes;
}
export const GetAnnouncements = async ({ id, Role }) => {
    const res = await Fetch(`${API_URL}/announcements/all`)
    const jsonRes = await res.json();
    return jsonRes;
}
export const GetDepartments = async () => {
    const res = await Fetch(`${API_URL}/departments/`);
    const jsonRes = await res.json();
    return jsonRes;
}

export const AddAnnouncement=async({title,description,departments})=>{
    const res=await Fetch(`${API_URL}/announcements/create`,
    JSON.stringify({
        title,
        description,
        departments,
    }),
    'POST',
    )
    const jsonRes=await res.json();

    return { status: res.status, "data": jsonRes }
}

export const GetAllCompanies = async ({ id,role }) => {
    return [{ title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22' }
    ,{ title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22' },
    { title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22', },
    { title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22', }]
}
//     else res=await AddCompany({name:companyName,cgpa_criteria:cgpaCriteria,description:discription,eligible_departments:eligibleDepartments, role})

export const addCompany=async ({ name, cgpa_criteria, eligible_departments, description, role })=>{
    const res=await Fetch(`${API_URL}/companies/create`,
    JSON.stringify({
        name, cgpa_criteria, eligible_departments, description, role
    }),
    'POST',
    )
    const jsonRes=await res.json();
    console.log("in add company response is",jsonRes);
    return {status:res.status,"data":jsonRes}
}

export const GetCompanies = async ({ id ,role}) => {
    const res = await Fetch(`${API_URL}/companies/all`)
    const jsonRes = await res.json();
    console.log("from get companies:",jsonRes);
    return jsonRes;
}
export const Signup = async ({ name, email, password, rollno ,cgpa}) => {

    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            id: rollno,
            name,
            phone: '8978294995',
            cgpa,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return (res.status);
}



export const Login = async ({ rollno, password }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            password,
            id: rollno,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const jsonRes = await res.json();
    localStorage.setItem('token', jsonRes.token)
    return { status: res.status, "data": jsonRes }
}