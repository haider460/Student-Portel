import axios from "axios";
import { baseURL } from "./config";
import {  toast } from 'react-toastify';


export const updateStudentRequestStatus = async (requestId, status) => {
    try {
        const response = await axios.put(`${baseURL}user/application/${requestId}`, { status });
        toast.success( `Application ${status} succesfully`);
        
        return response.data?.response
    } catch (error) {
        return false
    }
};