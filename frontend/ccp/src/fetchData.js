
export const Login = async ({ rollno, password }) => {//actual way to fetch data
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
