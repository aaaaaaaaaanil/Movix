import { useState ,useEffect } from 'react'
import { fecthDataFromApi } from './utils/api'
import { getApiConfiguration,getGenres } from './utils/store/homeSlice'
import { useSelector,useDispatch } from 'react-redux'
import { BrowserRouter, Routes,Route} from "react-router-dom";

import Header from "./componets/header/Header";
import Footer from "./componets/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";




// import './App.scss'




function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state ) =>state.home);
  console.log(url);
  const [count, setCount] = useState(0)

   useEffect(() => {
    fetchApiConfig();
    genresCall();

   },[])

  const fetchApiConfig = () => {
       fecthDataFromApi("/configuration")
    .then((Response) =>{
      console.log(Response);

      const url = {
        backdrop : Response.images.secure_base_url + "original",
        poster : Response.images.secure_base_url + "original",
        profile : Response.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration
      (url));
    });
  };



  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fecthDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data)
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item))
    });


    dispatch(getGenres(allGenres));

    

  };

  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route  path="/"  element={<Home />}/>
    <Route path="/:mediaType/:id" element={<Details/>}/>
    <Route path="/search/:query" element={<SearchResult/>}/>
    <Route path="/explore" element={<Explore/>}/>
    <Route path="*" element={<PageNotFound/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
  );
}

export default App;


// const urlP = 'http://api.themoviedb.org/3/movie/823464';
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     accept: 'application/json',
    //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDNmMGIwNmQwZjk1OTdhMTdmYTk2ODRjMDNlYTc2YyIsInN1YiI6IjY2MjhiNjY2MjU4ODIzMDE0YjkxMTBmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dL835DR8DQE74Vu_4xcuvmZh8c1c0Cfoznydgmv3lco'
    //   }
    // };
    
    // fetch(urlP, options)
    //   .then(res => {res.json()
    // console.log(fetch,res)})
    //   .then(json => console.log(json))
    //   .catch(err => console.error('error:' + err));


    // const_genres = data?.genres?.map((g) => g.id);
