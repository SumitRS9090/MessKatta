
import React, { useContext, useEffect, useState } from 'react'

import MenuCard from './MenuCard';
import LoginContext from '@/context/LoginContext';
import { Spinner, Text, VStack } from "@chakra-ui/react"
import UserNavbar from './UserNavbar';
import { useLocation } from 'react-router-dom';
import Aos from 'aos';

export default function UserHome({category}) {

    const {data,getMenu} = useContext(LoginContext);
    const location = useLocation();
    useEffect(()=>{
        const fetchData = async() =>{
            await getMenu(category);
            //console.log('Menu');
        }
        fetchData();
    },[location]);

    useEffect(()=>{
      Aos.init({
        duration:500
      });
    },[]);

  return (
    <div className='container-fluid background'>
        <UserNavbar/>
    <div className='container mt-5'>
        <div className='row mt-5'>

            <h1 className='text-center mt-2'>Today's Menu</h1>
            {
                data  && data.length>0 ? (
                    data.map((item,index)=>{
                        return(
                            <div     data-aos="zoom-in" data-aos-offset="200" data-aos-delay="100" className='col-xl-3 col-md-4 col-sm-12 mt-2' key={item._id}>
                                <MenuCard item={item} index={index} flag={1}/>
                            </div>
                        ) 
                    })
                ) 
                :(
                        <VStack colorPalette="orange">
                          {
                            data && data.length === 0 ? 
                            (
                              <VStack colorPalette='orange'>
                                <h3 style={{color:'#DD6B20'}} className='mt-3'>No Menu Found</h3>
                              </VStack>
                              
                            ) 
                            :(
                              <VStack colorPalette='orange'>
                                <Spinner color="colorPalette.600" size={'lg'} mt={5}/>
                                <Text color="colorPalette.600">Loading...</Text>
                              </VStack>
                            )
                          }
                        </VStack> 
                )
            }
        </div>
    </div>

    </div>
  )
}
