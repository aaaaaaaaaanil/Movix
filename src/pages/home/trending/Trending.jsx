import React, { useState } from 'react'
import ContentWrapper from '../../../componets/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../componets/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../componets/carousel/Carousel';
import "./style.scss"


const Trending = () => {
  const [endpoint,setendpoint] = useState("day")


  const {data,loading} = useFetch(`/trending/all/${endpoint}`);


    const onTabChange = (tab) => {
      setendpoint (tab === "Day" ? "day" : "week");

    };
    
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'> Trending</span>
            <SwitchTabs data ={["Day","Week"]} onTabChange={onTabChange}/>


        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
  
      
    </div>
    
  )
}

export default Trending;
