import axios from "axios";
import { toast } from "react-toastify";

const APIURL = "http://localhost:3000/api/";

export const handleRegistration = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`${APIURL}register`, data)
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export const handleLoginSerive = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`${APIURL}login`, data)
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export const handleFacultyRegistration = async (data) => {
    console.log(data)
    try {
        const token = localStorage.getItem('token');
        console.log(token)
        const response = await axios.post(`${APIURL}createFaculty`,
            data,

            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        console.log(response.data);
        toast("Created Successfully",{type:'success',autoClose: 2000,})
    }
    catch (err) {
        toast("Something went Wrong",{type:'error',autoClose: 2000,})
        console.log(err);
    }
}


export const handleStudentRegistration = async (data) => {
    console.log(data)
    try {
        const token = localStorage.getItem('token');
        console.log(token)
        const response = await axios.post(`${APIURL}createStudent`,
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        console.log(response.data);
        toast("Student Created successfull",{type:'success',autoClose: 2000,})
        return true;
    }
    catch (err) {
        toast("Something went Wrong",{type:'error',autoClose: 2000,})
        console.log(err);
        return false;
    }
}