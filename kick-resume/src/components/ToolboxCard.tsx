"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";


const ToolboxCard =  () => {

const [data, setData] = useState([]);
useEffect( () =>{
    async function fetchData(){
        try {
            const respons = await axios.get("https://fakestoreapi.com/products");
            setData(respons.data);
          } catch (error) {
            console.log("Error", error);
          }

    }

    fetchData();
})

  console.log(data);
  

  return <div className="bg-red-400">{}</div>;
};

export default ToolboxCard;
