export const Fetch = async (url, data, method) => {
    const token = localStorage.getItem('token');
    const results = await fetch(url, {
        headers:{
            token,
            'Content-Type': 'application/json',
        },
        method,
        body: data
    })

    return results;
}