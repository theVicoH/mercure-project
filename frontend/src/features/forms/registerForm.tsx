import { SubmitHandler, useForm } from "react-hook-form";

import { RegisterFormData } from "../types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";

const RegisterForm : React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const { mutateAsync } = useMutation(async (data : FormData) => {
    const url = import.meta.env.VITE_REACT_APP_API_URL;
    const response = await fetch(`${url}/user/register`, {
      method: 'POST',
      body: data,
    });
    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      throw new Error(`Échec de la connexion : ${responseData.msg}`);
    }
  })
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('pseudo', data.pseudo);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('photo', data.photo[0]);
    await mutateAsync(formData)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("firstName")} placeholder="firstname" type="text"/>
      <Input {...register("lastName")} placeholder="lastname" type="text"/>
      <Input {...register("pseudo")} placeholder="pseudo" type="text"/>
      <Input {...register("email")} placeholder="email" type="email"/>
      <Input {...register("password")} placeholder="password" type="password"/>
      <Input {...register("photo")} placeholder="photo" type="file"/>
      <Button type="submit" />
    </form>
  );
}

export default RegisterForm;