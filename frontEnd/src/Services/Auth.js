import axios from "axios";
import { baseURL } from "./config";
import {  toast } from 'react-toastify';

export const login = async (data) => {
  let res;
  await axios({
    method: "post",
    url: `${baseURL}user/login`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log('response.data.messages',response.data.message)
      res = response.data.user;
    })
    .catch((err) => {
      toast.warn( "Something went wrong!!");
      res = false;
    });
  return res;
};