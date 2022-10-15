import { json } from "react-router-dom";
import { API_URL } from "./constants";
import { Fetch } from "./fetch_function";
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
export const GetAnnouncements = async ({ id, Role }) => {
    const res = await Fetch(`${API_URL}/announcements/all`)
    const jsonRes = await res.json();
    return jsonRes;
}
export const GetAllCompanies = async ({ id }) => {
    return [{ title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22' }
        , { title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22' },
    { title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22', },
    { title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22', }]

}
export const GetCompanies = async ({ id }) => {
    console.log(('Companies fetching..'));
    return [{ title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22', status: 'applied' }
        , { title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22', status: 'rejected' },
    { title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22', status: 'shortlisted' },
    { title: 'Microsoft India', role: 'Software Engineering', sal: 200000, createdAt: '02/12/22', status: 'applied' }

    ]
}
export const Signup = async ({ name, email, password, rollno }) => {

    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            id: rollno,
            departmentId: 1,
            name,
            phone: '8978294995',
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