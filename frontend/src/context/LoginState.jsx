import React, { useState } from "react";
import LoginContext from "./LoginContext";

export default function LoginState(props) {
  const [data, setData] = useState([]);

  const [getMenuData,setMenuData] = useState(0);

  const [filterMenu,setFilterMenu] = useState([]);

  const getMenu = async (category) => {
    try {
      let url = String(import.meta.env.VITE_MENU);
      url += "/getMenu";

      let myHeaders = new Headers();
      myHeaders.append('Content-Type','application/json');
      myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`);
      const res = {
        category:category
      };
      const response = await fetch(url, {
        method: "POST",
        headers:myHeaders,
        mode:'cors',
        body:JSON.stringify(res)
      });

      const json = await response.json();
      
      //console.log(json);

      if(json.success){
        setData(json.data);
      }else 
        console.log('Error occured',json.error);

    } catch (err) {
      console.error("Error at getMenu", err);
    }
  };

  const searchMenu = async(data)=>{
    try{
      let url = String(import.meta.env.VITE_MENU);
      url += '/filter';

      const myHeaders = new Headers();
      myHeaders.append('Content-Type','application/json');
      myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`);

      const res = {
        name:data.name
      };

      const response = await fetch(url,{
        headers:myHeaders,
        method:'POST',
        body:JSON.stringify(res),
        mode:'cors'  
      });

      const json = await response.json();

      if(json.data){
        setFilterMenu(json.result);
        return 1;
      }else{ 
        return 0;
      }
    }catch(err){
      console.error('Error at search',err);
    }
  }
  return (
    <LoginContext.Provider value={{data,getMenu,getMenuData,setMenuData,searchMenu,filterMenu}}>{props.children}</LoginContext.Provider>
  );
}
