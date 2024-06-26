import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import './style.scss';

// import Img from "../../../componets/lazyLoadImage/Img";
import ContentWrapper from "../../../componets/contentWrapper/ContentWrapper";


const Herobanner =() => {
  const[background, setBackground] =useState("");
  const[query,setQuery] = useState("");
  const navigate = useNavigate();
  const {url} = useSelector(( state) => state.home);
  const {data,loading} = useFetch("/movie/upcoming");
  useEffect(() => {
   const bg = url.backdrop+
   data?.results[Math.floor(Math.random() * 
    20)]?.backdrop_path;

    setBackground(bg);
  }, [data]);
  
  

  

  const serchQueryHandler = (event) =>{
    if(event.key === "Enter" && query.length > 0){
        navigate(`/search/${query}`);
    }

  }

 

  return (
    <>
   <div className="herobanner">
     {!loading && <div className='backdrop-img'>
        <img src={background} />
      </div>}
      <div className="opacity-layer">

      </div>


      <ContentWrapper>
      <div className="heroBannerContent " >
        <span className='title'>Welcome.</span>
        <span className='subTitle'>Millions of Movies,TV shows and people to discover.
        Explore now.</span> 
         <div className='searchInput'>
          <input type="text" placeholder='Search for a movie or TV show....'
          onChange={(e)=> setQuery(e.target.value)}
          onKeyUp={serchQueryHandler}/>
          <button>Search</button>
        </div>



      </div>

      </ContentWrapper>


   
      
   
   </div>
    </>
   
  );
};

export default Herobanner;
