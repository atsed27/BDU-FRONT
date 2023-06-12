import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData.js'
import { useSelector } from 'react-redux';
const TrendCard = () => {
    let { lostAndFounds, loading } = useSelector((state) => state.lfReducer);
    lostAndFounds = lostAndFounds?.filter((lf)=> lf.status==="unSolved")
  return (
   <div className="TrendCard">
       <h3>Lost or Found Things</h3>


       {lostAndFounds?.map((data, id)=>{
            return(
                <div className="trend" key={id}>
                    {/* <span>#{data.name}</span> */}
                    <span># {data?.lostAndFoundText}</span>
                </div>
            )
       })}
   </div>
  )
}

export default TrendCard