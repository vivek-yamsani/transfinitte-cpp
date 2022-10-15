import { json } from "react-router-dom";
import { API_URL } from "./constants";
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
export const GetAnnouncements = async ({ id }) => {
    console.log(('Announcements fetching..'));
    return [{title:'Announcement1',desc:"Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised i"},{title:'Announcement2',desc:'this is announcement 2'},{title:'Announcement3',desc:'this is announcement 3'},{title:'Announcement1',desc:'this is announcement 1'}
    ,{title:'Announcement2',desc:'this is announcement 2'},{title:'Announcement3',desc:'this is announcement 3'}
    ,{title:'Announcement2',desc:'this is announcement 2'},{title:'Announcement3',desc:'this is announcement 3'}
    ,,{title:'Announcement2',desc:'this is announcement 2'},{title:'Announcement3',desc:'this is announcement 3'}
    ,{title:'Announcement2',desc:'this is announcement 2'},{title:'Announcement3',desc:'this is announcement 3'}
    
]
}
export const GetAllCompanies=async ({id})=>{
    return [{title:'Microsoft India',role:'Software Engineering',sal:200000,createdAt:'02/12/22'}
    ,{title:'Microsoft India',role:'Software Engineering',sal:200000,createdAt:'02/12/22'},
    {title:'Microsoft India',role:'Software Engineering',sal:200000,createdAt:'02/12/22',},
    {title:'Microsoft India',role:'Software Engineering',sal:200000,createdAt:'02/12/22',}]
       
}
export const GetCompanies = async ({ id }) => {
    console.log(('Companies fetching..'));
    return [{title:'Microsoft India',role:'Software Engineering',sal:200000,createdAt:'02/12/22',status:'applied'}
    ,{title:'Microsoft India',role:'Software Engineering',sal:200000,createdAt:'02/12/22',status:'rejected'},
    {title:'Microsoft India',role:'Software Engineering',sal:200000,createdAt:'02/12/22',status:'shortlisted'},
    {title:'Microsoft India',role:'Software Engineering',sal:200000,createdAt:'02/12/22',status:'applied'}
    
]
}
export const Signup=async({name,email,password,rollno})=>{
    
    const res=await fetch(`${API_URL}/auth/register`,{
        method:'POST',
        body:JSON.stringify({
            email,
            password,
            id:toString(rollno),
            departmentId:1,
            name,    
            phone:'8978294995',        
        }),
        headers: {
                    'Content-Type': 'application/json',
                }
    })
    return (res.status);
} 
export const Login=async({rollno,password})=>{
    const res=await fetch(`${API_URL}/auth/login`,{
        method:'POST',
        body:JSON.stringify({
            password,
            id:rollno,        
        }),
        headers: {
                    'Content-Type': 'application/json',
                }
    })
    const jsonRes=await res.json();
    return {status:res.status,"data":jsonRes}
}