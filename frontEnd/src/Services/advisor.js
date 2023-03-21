import axios from "axios";
import { baseURL } from "./config";
import {  toast } from 'react-toastify';


export const ScheduleMeeting = async (email) => {
    try {
        const response = await axios.get(`${baseURL}user/meet/student/${email}`);
			toast.success("meeting Schedule successfully");
        return true
    } catch (error) {
        toast.warn( "Something went wrong!!");
        return false
    }
};

export const updateStudentProgramStatus = async (requestId, status) => {
    try {
        const response = await axios.put(`${baseURL}user/program/update/${requestId}`, { status });
        toast.success( `program ${status} succesfully`);
        
        return response.data?.response

    } catch (error) {
        toast.warn( "Something went wrong!!");
        return false
    }
};