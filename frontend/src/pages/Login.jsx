import React, { useEffect, useState } from "react";
import { Tabs } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Flex ,Spinner} from "@chakra-ui/react";
import {PasswordInput} from "@/components/ui/password-input"
import { useForm, Controller} from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { Radio, RadioGroup } from "@/components/ui/radio";
import { HStack } from "@chakra-ui/react";
import { showToast } from "./ToastComponent";
import Aos from "aos";

export default function Login() {
  
  const navigate = useNavigate();

  const {
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors},
    control,
    reset:resetForm
  } = useForm();

  useEffect(()=>{
    Aos.init({
      duration:500,
      delay:200
    });
  },[]);

  const submit = async(data) => {
      try{
          localStorage.clear();
          setLoad(true);
          let url = String(import.meta.env.VITE_LOGIN);
          url +='/login';
          const res = {
            email:data.email,
            password:data.password,
            role:data.role
          };

          const response = await fetch(url,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(res),
            mode:'cors'
          });

          const json = await response.json();
          //console.log(json);
          setLoad(false);
          if(json.success){
            showToast(json.message,'success');
            localStorage.setItem('token',json.token);
            localStorage.setItem('name',json.name);
            localStorage.setItem('role',json.role);
            resetForm();
            if(json.role === 'customer')
              navigate('/userhome');
            else 
              navigate('/ownerhome');
          }
          else 
            showToast(json.message,'error');
      }catch(err){
        console.error('Error while submiting login',err);
      }
  };

  const[load,setLoad] = useState(false);


  return (
    <div className="container-fluid background">
      <h1 className="text-center" style={{ color: "#dd6b20" }}>
        Mess Katta
      </h1>
      <div className="mt-3 d-flex justify-content-center align-items-center p-2" data-aos='fade-up'>
        
          <form onSubmit={handleSubmit(submit)} className="p-3 border shadow-lg rounded" style={{backgroundColor:"white"}}>   

            <Field label="Email address"
              invalid={!!errors.password}
              errorText={errors.password?.message}            
            >
              <Input placeholder="Email" required type="email" 
              {...register("email", { required: "Email is Required" })}
              />
            </Field>
            <br />
            <Field label="Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}            
            >
              <PasswordInput placeholder="Password" required type="password" 
              {...register("password", { required: "Password is Required" })}
              />
            </Field>
            <br />
            <Controller
              name="role"
              control={control}
              defaultValue="customer"
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <RadioGroup
                  {...field} // Connects the field with react-hook-form
                  onChange={(value) => field.onChange(value)}
                  colorPalette={"orange"}
                  size={"sm"} // Update value on change
                >
                  <HStack gap="5">
                    Login As:
                    <Radio value="customer" variant="outline">
                      &nbsp;Customer
                    </Radio>
                    <Radio value="owner" variant="outline">
                      &nbsp;Owner
                    </Radio>
                  </HStack>
                </RadioGroup>
              )}
            />  
            <br/>
            <Flex
              justify="center" // Centers horizontally
              align="center" 
            >
              <Button
                variant={"solid"}
                color="white"
                backgroundColor="orange.400"
                size="lg"
                width="100%"
                rounded="2%"
                type='submit'
                disabled={load}
              >
               {load ? <Spinner size='sm'/> : 'Login'}
              </Button>
            </Flex>
            <br />
            <h6 className="text-center mb-2">Don't have an account? 
              <Link to='/signup' style={{color:'orange',textDecoration:'none'}}> &nbsp;Sign up</Link>
            </h6>
            </form>
      </div>
    </div>
  );
}
