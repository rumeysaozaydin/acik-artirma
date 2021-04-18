import React from 'react';
import axios from 'axios';

import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config/index';

export function usePost(endpoint, token, body, setState=undefined,callback=undefined) {
 
    axios
      .post(`${BASE_URL}${endpoint}`, body, {
        headers: {
          Authorization: `bearer ${token}`
        },
      })
      .then(({data}) => {
        if(setState){
          setState(data);
        }
        if(callback){
          callback();
        }
      })
      .catch(function (error) {
          console.log("INSIDE USEPOST CATCH")
          console.log(error.message);
      });
}