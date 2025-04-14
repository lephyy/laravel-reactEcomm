export const apiUrl = 'http://127.0.0.1:8000/api'


// export const adminToken = () => {
//     const data = JSON.parse(localStorage.getItem('adminInfo'))
//     return data.token;
// }

export const adminToken = () => {
    const admin = localStorage.getItem('admin');
    if (!admin) return null;

    try {
        return JSON.parse(admin).token;
    } catch (error) {
        return null;
    }
};
