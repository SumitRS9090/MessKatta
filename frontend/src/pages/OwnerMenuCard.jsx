import React, { useContext, useState } from 'react'
import { Card, Center, VStack } from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md";
import { Tooltip } from 'react-tooltip'
import { showToast } from './ToastComponent';
import { Spinner } from "@chakra-ui/react"
import LoginContext from '@/context/LoginContext';

export default function OwnerMenuCard({item}) {

    const [update,setUpdate] = useState(false);

    const {setMenuData} = useContext(LoginContext);

    const deleteMenu = async()=>{
        setUpdate(true);
        try{
            let url = String(import.meta.env.VITE_MENU);
            url += `/deleteMenu/${item._id}`;

            let myheaders = new Headers();
            myheaders.append('Content-Type','application/json');
            myheaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`);

            const response = await fetch(url,{
                method:'GET',
                headers:myheaders,
                mode:'cors'
            });

            const json = await response.json();

            if(json.success){
                showToast(json.message,'success');
                setMenuData((prev)=>prev + 1);
            }else 
                showToast(json.message,'error');
        }catch(err){
            console.error('Error occured at OwnerMenuCard',err);
        }
        setUpdate(false);
    }

  return (
    <Card.Root height={{base:300 , sm:300 ,md:300}} zIndex={1} shadow={'lg'} shadowColor={'black'}>
      <Card.Body gap="1">
        <Badge variant="solid" colorPalette="red" position={'absolute'} top={2} right={2}
        data-tooltip-id="my-tooltip" data-tooltip-content="Delete Menu!" _hover={{cursor:'pointer'}}
        onClick={deleteMenu}
        >
            {
                update ? (<Spinner size={'sm'}/>) : (<MdDelete/> )
            }
        </Badge>
        <Tooltip id="my-tooltip" />
        {/* <Card.Title color={'orange.400'} textAlign={'center'}>
            {item.menu}
        </Card.Title>
        <h6>Category:{item.category}</h6>
        <Card.Title textAlign={'center'}>
            &#8377; {item.price}
        </Card.Title> */}
        <Card.Description color={'black'}>
           <span style={{color:'#DD6B20'}}> Menu Name: </span>{item.menu}<br/>
           <span style={{color:'#DD6B20'}}> Price: </span>&#8377; {item.price}<br/>
           <span style={{color:'#DD6B20'}}> Category: </span>{item.category}
        </Card.Description>
        <h6 style={{color:'#DD6B20'}}>Reviews:</h6>
      </Card.Body>
        <VStack height={500} overflowY={'auto'}>
            {
                item.reviewer && item.reviewer.length>=1 ? 
                (
                    item.reviewer.map((op,index)=>{
                        return (
                                <div className='bg-light w-100 text-center rounded' key={index}>
                                <p>{op.name}
                                <br/>{op.description}
                                <br/> Rating : {op.review}
                                </p>
                                </div>
                        )
                    })
                ) 
                : 
                (
                <div className='bg-light'>
                    <h4>No reviews yet...</h4>
                </div>
                )
            }
        </VStack>
    </Card.Root>
  )
}
