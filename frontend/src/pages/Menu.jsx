import React, { useContext, useEffect, useState } from 'react'
import OwnerMenuCard from './OwnerMenuCard'
import LoginContext from '@/context/LoginContext';
import { Spinner, Text, VStack } from '@chakra-ui/react';
import Aos from 'aos';

export default function Menu() {
    
    const [menu,setMenu] = useState(false);

    const {getMenuData} = useContext(LoginContext);
    const [done,setDone] = useState(false);

    useEffect(()=>{
        Aos.init({
            duration:500,
            delay:200
        });
    });

    useEffect(()=>{
        const fetchMenu = async()=>{
            try{
                let url = String(import.meta.env.VITE_MENU);
                url += '/getMessMenu';
        
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
        
                const response = await fetch(url,{
                    method:'GET',
                    headers:myHeaders,
                    mode:'cors'
                });
        
                const json = await response.json();

                if(json.data)
                    setMenu(json.menus);
                else 
                    setMenu({});
                setDone(true);
            }catch(err){
                console.error('Error at FetchMenu',err);
            }
        }
        fetchMenu();
    },[getMenuData]);


  return (
    <div className='container-fluid'>
        <h3>All Menus</h3>
        <div className='row mt-2'>
            {
                done === false ? 
                (
                    <VStack colorPalette='orange'>
                      <Spinner color="colorPalette.600" size={'lg'} mt={5}/>
                      <Text color="colorPalette.600">Loading...</Text>
                    </VStack>
                ) 
                : 
                (
                    done && menu && menu.length>=1 ? 
                    (
                        menu.map((item,index)=>{
                            return(
                                <div className='col-sm-12 col-md-3 mt-2' data-aos='zoom-in' key={index}>
                                    <OwnerMenuCard item={item}/>
                                </div>
                            )
                        })
                    ) 
                    : 
                    (
                    <h1>
                        No Menus yet ...
                    </h1>
                    )
                )
            }
            
        </div>
    </div>
  )
}
