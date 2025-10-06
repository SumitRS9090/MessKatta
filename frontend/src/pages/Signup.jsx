import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Flex, Spinner } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { HStack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "./ToastComponent";
import Aos from "aos";

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
      setLoad(true);
      let url = String(import.meta.env.VITE_LOGIN);
      url += '/signup';
      const res = {
        name:data.name,
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

      if(json.success){
        showToast(json.message,'success');
      }else 
        showToast(json.message,'error');

      resetForm();
      setLoad(false);
      navigate('/login');
    }catch(err){  
      console.error('Error at Signup',err);
    }
  };

  const [load, setLoad] = useState(false);

  return (
    <div className="container-fluid background">
      <h1 className="text-center" style={{ color: "#dd6b20" }}>
        Mess Katta
      </h1>
      <div className="mt-3 d-flex justify-content-center align-items-center p-2" data-aos='fade-up'>
        <div
          className="container border shadow-lg rounded bg-light"
          style={{
            maxWidth: "350px"
          }}
        >
          <h1 className="text-center">Sign Up</h1>
          <form onSubmit={handleSubmit(submit)}>
            <br />
            <Field
              label="Name"
              invalid={!!errors.name}
              errorText={errors.name?.message}
            >
              <Input
                placeholder="Name"
                required
                type="text"
                minLength={4}
                {...register("name", { required: "Name is required" })}
              />
            </Field>
            <br />
            <Field
              label="Email address"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                placeholder="Email"
                required
                type="email"
                {...register("email", { required: "Email is required" })}
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
                  <HStack gap="6">
                    Role:
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
            <br />
            <Field
              label="Create Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <PasswordInput
                placeholder="Password"
                minLength={4}
                maxLength={8}
                {...register("password", { required: "Password is Required" })}
              />
            </Field>
            <br />
            <Flex
              justify="center" // Centers horizontally
              align="center" // Centers vertically
            >
              <Button
                variant={"solid"}
                color="white"
                backgroundColor="orange.400"
                size="lg"
                width="100%"
                rounded="2%"
                type="submit"
                isDisabled={load}
              >
                {load ? <Spinner size="sm" /> : "Login"}
              </Button>
            </Flex>
            <br />
            <h6 className="text-center mb-3 effect">
              Already have an account?
              <Link
                to="/login"
                style={{ color: "orange", textDecoration: "none" }}
              >
                &nbsp;Login
              </Link>
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
}
