import React, { useEffect,useState } from "react";
import MemeCard from "../components/Card";
import { getAllmemes } from "../api/memes";
const HomePage=()=>{
    const[data,setdata]=useState([]);
    useEffect(()=>{
        getAllmemes().then((memes)=>setdata(memes.data.memes))
    },[])
    return (
        <div className="row">
    {data.map((ele, index) => (
      <MemeCard key={index} img={ele.url} title={ele.name} />
    ))}
  </div>
    )
}
export default HomePage