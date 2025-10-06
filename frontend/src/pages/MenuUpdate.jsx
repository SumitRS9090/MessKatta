import React, { useEffect, useState } from "react";
import { Button, createListCollection, Fieldset, Input, Spinner, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Textarea, Flex, Box, Icon } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { showToast } from "./ToastComponent";
import Aos from "aos";

export default function MenuUpdate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(()=>{
    Aos.init({
      duration:500,
      delay:200
    });
  },[]);

  const updateMenu = async (data) => {
    try {
        setLoad((prev)=>prev+1);
        let url = String(import.meta.env.VITE_MENU);
        url += '/addMenu/';

        let myheaders = new Headers();
        myheaders.append('Content-Type','application/json');
        myheaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`);

        const res = {
            menu:data.menu,
            price:parseFloat(data.price),
            category:data.category
        }

        const response = await fetch(url,{
            method:'POST',
            headers:myheaders,
            body:JSON.stringify(res),
            mode:'cors'
        });

        const json = await response.json();

        if(json.success){
            showToast(json.message,'success');
            reset();
        }else 
            showToast(json.message,'error');
        setLoad(0);
    } catch (err) {
      console.error("Error at update Menu", err);
    }
  };

  const menuCategory = createListCollection({
    items:[{label:'Veg',value:'Veg'},{label:'Non Veg',value:'Non Veg'},{label:'Vegan',value:'Vegan'}]
    });

  const [load,setLoad] = useState(0);

  return (
    <div className="container">
      <div className="container d-flex justify-content-center align-items-center p-2">
        <form
          className="p-2 text-center bg-body-tertiary rounded shadow-lg z-1"
          onSubmit={handleSubmit(updateMenu)}
          data-aos='fade-up'
        >
          <Fieldset.Root minWidth={{ sm: 300, md: 400 }}>
            <Stack>
              <Fieldset.Legend>Update Menu</Fieldset.Legend>
            </Stack>

            <Fieldset.Content>
              <Field
                label="Menu Name"
                required
                invalid={!!errors.messName}
                errorText={errors.messName?.message}
              >
                <Input
                  type="text"
                  required
                  {...register("menu", {
                    required: "Menu Name is required",
                  })}
                  placeholder="Menu Name"
                />
              </Field>

              <Field
                label="Price"
                required
                invalid={!!errors.price}
                errorText={errors.price?.message}
              >
                <Input
                  placeholder="Price"
                  variant="outline"
                  type="number"
                  {...register("price", {
                    required: "price is required",
                  })}
                />
              </Field>

              <Field
                label="Category"
                required
              >
                <SelectRoot size={'md'} collection={menuCategory} {...register('category',{required:'Category is required'})}>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {menuCategory.items.map((menuCat,index) => (
                      <SelectItem item={menuCat} key={index}>
                        {menuCat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
            </Fieldset.Content>

            <Button
              type="submit"
              colorPalette={"teal"}
              alignSelf="flex-center"
              rounded={5}
              mt={2}
              disabled={load >= 1 ? true : false}
            >
              {load >= 1 ? (<Spinner size={'sm'}/>): 'Update Menu'}    
            </Button>
          </Fieldset.Root>
        </form>
      </div>
    </div>
  );
}
