import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import UserNavbar from "./UserNavbar";
import { HStack, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import MenuCard from "./MenuCard";
import LoginContext from "@/context/LoginContext";
import Aos from "aos";

export default function SearchMenu() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm();

  useEffect(()=>{
    Aos.init({
      duration:500,
      delay:200
    })
  },[]);

  const {searchMenu,filterMenu} = useContext(LoginContext);
  const [done,setDone] = useState(false);
  const [load,setLoad] = useState(0);
  let res;
  const search = (data) => {

    const findMenu = async()=>{
      try{      
        res = await searchMenu(data);
        if(res == 0)
          setDone(true);
        else{
          if(filterMenu.length>=1)
            setDone(true);
          else 
            setDone(false);
        }
      }catch(err){
        console.error('Error at search function',err);
      }
    }
    setLoad((prev)=>prev+1);
    findMenu();
    setLoad((prev)=>prev-1);
  };

  useEffect(()=>{
    if(res==1 && filterMenu.length>=1)
      setDone(true);
    else if(res==1 && filterMenu.length==0)
      setDone(false);
    else // res = 0  
      setDone(false);
  },[filterMenu]);

  return (
    <div className="container-fluid background">
      <UserNavbar />
      <VStack marginTop={20} data-aos='fade-up'>
        <Form onSubmit={handleSubmit(search)}>
          <HStack width="full" gap={5}>
              <Input
                placeholder="Search Food"
                variant={"outline"}
                size={"lg"}
                required
                minLength={3}
                colorPalette={'teal'}
                width='full'
                {...register("name", { required: "Food name is required" })}
              />{" "}   

            <Button variant="subtle" backgroundColor={'#fb923c'} color={'white'} type="submit">
              {load >= 1 ? <Spinner size={'sm'}/> : 'Search'}
            </Button>

          </HStack>
        </Form>
      </VStack>
      <div className="container">
            {
              done ? (
                <VStack colorPalette='orange'>
                  <Spinner color="colorPalette.600" size={'lg'} mt={5}/>
                  <Text color="colorPalette.600">Loading...</Text>
                </VStack>
              ):(
                <div className="row mt-2">
                  {
                    filterMenu.length>=1 ? 
                    (
                      <div className="col-sm-12 col-md-3">
                        {
                          filterMenu.map((item,index)=>{
                            return <MenuCard item={item} index={index} key={index} flag={2} data-aos='zoom-in'/>
                          })
                        }
                      </div>
                    ) 
                    : 
                    (
                      <h3>No Result</h3>
                    )
                  }
                </div>
              )
            }
      </div>
    </div>
  );
}
