import axios from 'axios';

const baseURL = 'https://api.gfycat.com/v1';
const client_ID= '2_hKcgjQ';
const client_Secret='cc5IKK_H5UUHKKpsqLEMT1ppTpj_J1l8rkXKfHKYXuWHBwdL9HMHSqCUR2-XHwnb';

export const getToken = async ()=>{
    let credentials = {
        grant_type:"client_credentials",
        client_id: client_ID,
        client_secret:client_Secret
    };
   return axios.post(baseURL + '/oauth/token',credentials)
};

export const getTrendingGifs = async (token:string)=>{
   return axios.get(baseURL + '/reactions/populated?tagName=trending&gfyCount=10',{
    headers:{
        'Authorization': token
    }
   })
};

export const searchGifs = (text:string,token:string)=>{
    return axios.get(baseURL + `/gfycats/search?search_text=${text}&count=100`,{
        headers:{
            'Authorization':token
        }
    })
};