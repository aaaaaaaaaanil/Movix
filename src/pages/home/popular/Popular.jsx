import React, { useState } from 'react'
import ContentWrapper from '../../../componets/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../componets/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../componets/carousel/Carousel';
// import "./style.scss"


const Popular = () => {
  const [endpoint,setendpoint] = useState("movie")


  const {data,loading} = useFetch(`/${endpoint}/popular`);


    const onTabChange = (tab) => {
      setendpoint (tab === "Movies" ? "movie" : "tv");

    };
    
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'> What's Popular</span>
            <SwitchTabs data ={["Movies","Tv Shows"]} onTabChange={onTabChange}/>


        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}
        endpoint={endpoint}/>
  
      
    </div>
    
  )
}

export default Popular;
