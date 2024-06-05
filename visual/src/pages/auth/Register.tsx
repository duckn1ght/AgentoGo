import { FC } from "react"
import { AuthForm } from "./ui/AuthForm"
import { Controller, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import { requiredEmailValidationRule, requiredValidateMinLength } from "../../components/input-validate"
import { Button } from "../../shared/ui/Button"
import { apiService } from "../../services/api/ApiService"
import { useNavigate } from "@tanstack/react-router"

interface FormType{
    username:string,
    password:string,
    lastName:string,
    email:string,
    firstName:string
}

export const Register:FC = function Register(){

    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState:{isValid}
    } = useForm<FormType>({
        defaultValues:{
            username:"",
            password:"",
            lastName:"",
            email:"",
            firstName:""
        },
        mode:"onChange"
    })
    return <AuthForm onSubmit={handleSubmit(async (form) => {
        const response = await apiService.post<string>({
            url:"/auth/register",
            dto:form
        })
        if(response.data){
            navigate({to: "/login"})
        }
    })}>
        <Controller 
            name="username"
            control={control}
            rules={requiredValidateMinLength(6)}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Логин"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="firstName"
            control={control}
            rules={requiredValidateMinLength(2)}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Имя"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="lastName"
            control={control}
            rules={requiredValidateMinLength(2)}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Фамилия"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="email"
            control={control}
            rules={requiredEmailValidationRule}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Email"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="password"
            control={control}
            rules={requiredValidateMinLength(7)}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    type="password"
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Пароль"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Button disabled={!isValid} type="submit">
            {"Зарегистрироваться"}
        </Button>
    </AuthForm>
}