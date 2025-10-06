import React, { useEffect, useState } from "react";
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea, Flex, Box, Icon } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { showToast } from "./ToastComponent";
import { Spinner, Text, VStack } from "@chakra-ui/react"
import Aos from "aos";

export default function UpdatePage() {

  const [details,setDetails] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues:{
      name:details.name || "",
      description:details.description || "",
      address:details.address || "",
      location:details.location || ""
    } 
  });

  const [updated,setUpdated] = useState(false);
  const [done,setDone] = useState(false);
  const [load,setLoad] = useState(0);

  useEffect(()=>{
    Aos.init({
      duration:500,
      delay:200
    });
  },[]);

  useEffect(()=>{
      const fetchData = async()=>{
        try{
          let url = String(import.meta.env.VITE_PROFILE);
          url += '/getProfile';

          let myheaders = new Headers();
          myheaders.append('Content-Type','application/json');
          myheaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`);

          const response = await fetch(url,{
            method:'GET',
            headers:myheaders,
            mode:'cors'
          });

          const json = await response.json();

          //console.log(json);

          if(json.data){
            setUpdated(true);

            setDetails({
              name:json.profile.messName,
              description:json.profile.description,
              address:json.profile.address,
              location:json.profile.location
            });
            reset({
              name:json.profile.messName,
              description:json.profile.description,
              address:json.profile.address,
              location:json.profile.location
            });

          }else{ // profile detail not filled
            setUpdated(false);
          }
          setDone(true);
        }catch(err){
          console.error('Error at UpdateData Useeffect',err);
        }
      }
      fetchData();

  },[]);

  const updateProfile = async (data) => {
    try{
      setLoad((prev)=>prev+1);
      let url = String(import.meta.env.VITE_PROFILE);
      url += '/addProfile';
  
      let myheaders = new Headers();
      myheaders.append('Content-Type','application/json');
      myheaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`);
      
      const res = {
        messName:data.name,
        description:data.description,
        address:data.address,
        location:data.location
      };  
      
      const response = await fetch(url,{
        method:'POST',
        headers:myheaders,
        mode:'cors',
        body:JSON.stringify(res)
      });

      const json = await response.json();

      if(json.success){
        showToast(json.message,'success');
        setUpdated(true);
      }else
        showToast(json.message,'error');
      setLoad(0);
    }catch(err){
      console.error('Update Profile Error',err);
    }
  };

  return (
    <div className="container-fluid">

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
        <div className="container d-flex justify-content-center align-items-center p-2">
        <form
          className="p-2 text-center bg-light rounded shadow-lg z-1 "
          onSubmit={handleSubmit(updateProfile)}
          data-aos='fade-up'
        >
          <Fieldset.Root minWidth={{ sm: 300, md: 400 }}>
            <Stack>
              <Fieldset.Legend>Update Mess Profile</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide following details.
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field
                label="Name"
                required
                invalid={!!errors.name}
                errorText={errors.name?.message}
              >
                  <Input
                    type="text"
                    required
                    readOnly={updated === true ? true : false}
                    {...register("name", { required: "Name is Required" })}
                    placeholder="Enter your name"
                  />
            
              </Field>

              <Field
                label="Description"
                required
                invalid={!!errors.description}
                errorText={errors.description?.message}
              >
                <Textarea
                  placeholder="Description"
                  variant="outline"
                  readOnly={updated === true ? true : false}
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
              </Field>

              <Field
                label="Address"
                required
                invalid={!!errors.address}
                errorText={errors.address?.message}
              >
                <Textarea
                  placeholder="Address"
                  variant="outline"
                  readOnly={updated === true ? true : false}
                  {...register("address", { required: "Address is required" })}
                />
              </Field>

              <Field
                label="Location"
                required
                invalid={!!errors.location}
                errorText={errors.location?.message}
              >
                <Textarea
                  placeholder="Location"
                  variant="outline"
                  readOnly={updated === true ? true : false}
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
              </Field>
            </Fieldset.Content>

            <Button
              type="submit"
              colorPalette={"teal"}
              alignSelf="flex-center"
              rounded={5}
              mt={2}
              disabled = {(updated === true ? true : false) || (load >= 1 ? true : false)}
            >
              {load >= 1 ? <Spinner size={'sm'}/> : 'Update Details'}
            </Button>
            <Button
            colorPalette={"green"}
            alignSelf="flex-center"
            rounded={5}
            mt={2}
            disabled={updated===true ? false : true}
            onClick={()=>setUpdated(false)}
            >
              Edit Details
            </Button>
          </Fieldset.Root>
        </form>
      </div>
      )
    }

     
    </div>
  );
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhc3MxMzBAZ21haWwuY29tIiwiX2lkIjoiNjc2NDExZDE4YTg1Yjc3MTYxMGEwNjY3IiwiaWF0IjoxNzM0NjExNDMwLCJleHAiOjE3MzQ2OTc4MzB9.MGlUByK9uDdfpkHL6UBf5nKqsI_ki6ZsCIldOp-Ug0M
