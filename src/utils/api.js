import axios from "axios";

const BASE_URL = "http://api.themoviedb.org/3";
const TMBD_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDNmMGIwNmQwZjk1OTdhMTdmYTk2ODRjMDNlYTc2YyIsInN1YiI6IjY2MjhiNjY2MjU4ODIzMDE0YjkxMTBmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dL835DR8DQE74Vu_4xcuvmZh8c1c0Cfoznydgmv3lco"

const headers ={
    Authorization : "Bearer " + TMBD_TOKEN,
    // accept : "application/json"
    
};


 export const fecthDataFromApi = async(url,params)=>{
    try{
console.log(BASE_URL+url)
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params

        });
        return data;

    }
    catch(error){
        console.log(error);
        return error;


    }

}
