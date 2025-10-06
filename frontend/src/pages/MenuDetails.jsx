import React, { useContext, useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import { Card, Heading, Stack } from "@chakra-ui/react"
import { useLocation } from "react-router-dom";
import LoginContext from "@/context/LoginContext";
import { Badge } from "@chakra-ui/react"
import { HiStar } from "react-icons/hi"
import { Textarea } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useForm, Controller } from "react-hook-form";
import { Rating } from "@/components/ui/rating"
import { Button } from "@/components/ui/button"
import { showToast } from "./ToastComponent";
import Carousel from 'react-bootstrap/Carousel';
import { FiMapPin } from "react-icons/fi";
import AOS from 'aos';

export default function MenuDetails() {
    const location = useLocation();
    const {index,flag} = location.state || {};



    useEffect(()=>{
      AOS.init({
        duration:500,
        delay:100
      });
    },[]);

      const {
        register,
        handleSubmit,
        formState: { errors },
        reset:resetForm
      } = useForm();

    const {data,filterMenu} = useContext(LoginContext);

    const [value, setValue] = useState(0);
    const [display,setDisplay] = useState(false);


    const check = (flag)=>{
      if(flag === 1){
        for(let i=0;i<data[index].reviewer.length;i++){
          if(data[index].reviewer[i].name === localStorage.getItem('name'))
              return true;
      }
      return false;
      }
      else{
        for(let i=0;i<filterMenu[index].reviewer.length;i++){
          if(filterMenu[index].reviewer[i].name === localStorage.getItem('name'))
              return true;
      }
      return false;
      }
    }

    const submit = async(val)=>{
        try{
            //console.log(data[index],val);
            let url = String(import.meta.env.VITE_MENU);
            url += `/addReview/${data[index]._id}`;

            let myheaders = new Headers();
            myheaders.append('Content-Type','application/json');
            myheaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`);

            const res = {
                name:localStorage.getItem('name'),
                description:val.description,
                review:value
            };
            //console.log(result);
            const response = await fetch(url,{
                method:'POST',
                headers:myheaders,
                mode:'cors',
                body:JSON.stringify(res)
            });

            const json = await response.json();
            if(json.success){
                showToast(json.message,'success');
                setDisplay(true);
            }else 
                showToast(json.error,'error');
            //console.log(json);
        }catch(err){
            console.error('Error at Review Submit',err);
        }
    }

    const viewLocation=(flag)=>{
      let url = 'https://www.google.com/maps/place';
      if(flag === 1)
        url += `/${data[index].profile.address}`;
      else  
        url += `${filterMenu[index].profile.address}`
      //let url = `https://www.google.com/maps/place/`;
      window.open(url,"_blank");
    }

  return (
    <div className="container-fluid background">
      <UserNavbar />

      <div className="container mt-5">
        <div className="row mt-5" data-aos='fade-up'>
        <div className="col-md-8 col-sm-12 mt-5">
          <Card.Root size="md" position={'relative'}>
            <Badge variant="solid" colorPalette="orange" position={'absolute'} top={2} right={2}>
              <HiStar /> {
              flag === 1 ?
              Math.round(data[index].review)
              : Math.round(filterMenu[index].review)
              }
            </Badge>
            <Card.Header>
              <Heading size="md" color={'orange.400'}>{flag === 1 ? data[index].profile.messName : filterMenu[index].profile.messName}</Heading>
            </Card.Header>
            <Card.Body>
            <h5>{flag==1 ? data[index].menu : filterMenu[index].menu}</h5>
            <h5>&#8377; {flag==1 ? data[index].price : filterMenu[index].price}</h5>
            <hr/>
               <p><span style={{color:'#DD6B20'}}>About: </span>{flag==1 ? data[index].profile.description : filterMenu[index].profile.description }</p>
               <p><span style={{color:'#DD6B20'}}>Address: </span>{flag==1 ? data[index].profile.address : filterMenu[index].profile.address}</p>
                <h6 style={{display:'flex',alignItems:'center'}} className="effect" onClick={()=>viewLocation(flag)}>
                   <span> <FiMapPin style={{fontSize:'20'}}/> </span> &nbsp;  Find Location on Map
                </h6>
            </Card.Body>
          </Card.Root>
          </div>
          <div className="mt-5 col-md-4 col-sm-12">
          <Card.Root height={{base:300 , sm:300 ,md:300}}>
            <Card.Header>
              <Heading size="md">Review</Heading>
            </Card.Header>
            <Card.Body>
                {
                    check(flag) || display ? 
                    (
                    <Card.Title display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                        <img className="blink-image" src="/complete.png" width={150} height={80}/> Already Reviewed !
                    </Card.Title>
                    ) : (
                        <Stack gap="4" w="full">
                            <form onSubmit={handleSubmit(submit)}>
                            <Field label="Review Message" 
                                invalid={!!errors.description}
                                errorText={errors.description?.message}
                            >
                              <Textarea placeholder="Review Message" 
                                {...register("description", { required: "Review Message is required" })}                              
                              />
                            </Field>
                            <Rating colorPalette='orange' mt={1} size="lg" value={value} onValueChange={(e)=>setValue(e.value)}/>
                            <br/>
                            <Button size='md' variant='subtle' color='white' background='orange.400' type='submit'>Submit</Button>
                            </form>
                      </Stack>
                    )
                }
            </Card.Body>
          </Card.Root>
          </div>
        </div>
        <hr/>
        <div className="container">
            <h1 style={{color:'#DD6B20'}}>Reviews</h1>
                {
                  flag === 1 ? (
                    data[index].reviewer && data[index].reviewer.length>=1 ? 
                    (
                    <Carousel data-aos='fade-down' pause='hover' className="custom-carousel" indicators={false}>
                        {
                            //console.log(data[index].reviewer)
                            data[index].reviewer.map((item)=>{
                                return (
                                    <Carousel.Item className="text-center" key={item._id}>
                                        <h2 className="text-black">{item.name}</h2>
                                        <Rating readOnly colorPalette='orange' mt={1} size="md" value={item.review || 3}/>
                                        <h5 className="text-black">{item.description}</h5>
                                    </Carousel.Item>
                                );
                            })
                        }
                    </Carousel>                   
                    ): 
                    (
                     <div className="container bg-light rounded">
                        <h3>No reviews yet...</h3>
                        <h6>Be the first one to review.....</h6>
                     </div>
                    )
                  ):
                  (
                    filterMenu[index].reviewer && filterMenu[index].reviewer.length>=1 ? 
                    (
                    <Carousel pause='hover' className="custom-carousel" indicators={false}>
                        {
                            //console.log(data[index].reviewer)
                            filterMenu[index].reviewer.map((item)=>{
                                return (
                                    <Carousel.Item className="text-center" key={item._id}>
                                        <h2>{item.name}</h2>
                                        <Rating readOnly colorPalette='orange' mt={1} size="md" value={item.review || 3}/>
                                        <h5>{item.description}</h5>
                                    </Carousel.Item>
                                );
                            })
                        }
                    </Carousel>                   
                    ): 
                    (
                     <div className="container bg-light rounded">
                        <h3>No reviews yet...</h3>
                        <h6>Be the first one to review.....</h6>
                     </div>
                    )
                  )
                }
            
        </div>   
      </div>
    </div>
  );
}
