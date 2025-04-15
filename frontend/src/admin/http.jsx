export const apiUrl = 'http://127.0.0.1:8000/api'


// export const adminToken = () => {
//     const data = JSON.parse(localStorage.getItem('adminInfo'))
//     return data.token;
// }

export const adminToken = () => {
    const user = localStorage.getItem('userInfo');
    if (!user) return null;

    try {
        const parsed = JSON.parse(user);
        if (parsed.role === 'admin') {
            return parsed.token;
        }
        return null;
    } catch (error) {
        return null;
    }
};
