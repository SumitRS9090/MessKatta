import React from 'react'
import { Card, Center } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@chakra-ui/react"
import { HiStar } from "react-icons/hi"
import { useNavigate } from 'react-router-dom'

export default function MenuCard({item,index,flag}) {

  const navigate = useNavigate();

  const next = ()=>{
    navigate('/menuDetails',{
      state:{
        index:index,
        flag:flag
      }
    });
  }

  return (
    <Card.Root height={{base:300 , sm:250 ,md:300}}>
      <Card.Body gap="2">
      <Badge variant="solid" colorPalette="orange" position={'absolute'} top={2} right={2}>
        <HiStar /> {Math.round(item.review)}
      </Badge>
        <Card.Title mt="1" color={'orange.400'} textAlign={'center'}>{item.profile.messName}</Card.Title>
        <Card.Title mt="1" textAlign={'center'}>{item.menu}</Card.Title>
        <Card.Title textAlign={'center'}>&#8377; {item.price}</Card.Title>
      </Card.Body>
      <Card.Footer justifyContent="center">
        <Button colorPalette='orange' onClick={next}>Explore</Button>
      </Card.Footer>
    </Card.Root>
  )
}
