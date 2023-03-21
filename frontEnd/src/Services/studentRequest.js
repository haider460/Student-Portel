import axios from "axios";
import {  toast } from 'react-toastify';
import { baseURL } from "./config";

export const studentRequestForm = async (data) => {
  let res;
  await axios({
    method: "post",
    url: `${baseURL}user/application`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      res = response.data?.response?.requests;
      toast.success( "your application submit successfully");
      
    })
    .catch((err) => {
      toast.warn( "Something went wrong!!");
      res = false;
    });
  return res;
};



export const getStudentRequests = async (studentID) => {
  let res;
  await axios({
    method: "get",
    url: `${baseURL}user/application/${studentID}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
        res = response.data?.response;
        console.log('response.data',response.data?.response?.requests)
    })
    .catch((err) => {
      toast.warn( "Something went wrong!!");
      res = false;
    });
  return res;
};

export const getAllStudentsRequests = async (studentID) => {
  let res;
  await axios({
    method: "get",
    url: `${baseURL}user/application`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      res = response.data
      
        console.log('response.data',response)
    })
    .catch((err) => {
      toast.warn( "Something went wrong!!");
    
      res = false;
    });
  return res;
};

export const SelectProgram = async (body) => {
    try {
        const response = await axios.put(`${baseURL}user/student/program`, body);
       toast.success( "program added successfully");
        return true
    } catch (error) {
      toast.warn( "Something went wrong!!");
        return false
    }
};