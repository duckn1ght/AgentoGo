import { FC } from "react"
import { AuthForm } from "./ui/AuthForm"
import { Controller, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import { requiredEmailValidationRule, requiredValidateMinLength } from "../../components/input-validate"
import { Button } from "../../shared/ui/Button"
import { useNavigate } from "@tanstack/react-router"

type ORGANIZATION_TYPE = "ТОО" | "ИП"

interface AddressDto{
    region:string,
    city:string
}

interface OrganizationDto{
    orgType: ORGANIZATION_TYPE,
    identityNumber : string
}

interface FormType{
    email: string,
    password: string,
    address: AddressDto
    fullName: string,
    phoneNumber: string,
    organization: OrganizationDto
}

export const Register:FC = function Register(){

    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState:{isValid}
    } = useForm<FormType>({
        defaultValues:{
            email: "",
            password: "",
            address: {},
            fullName: "",
            phoneNumber: "",
            organization: {}
        },
        mode:"onChange"
    })
    return <AuthForm onSubmit={(form) => {
        console.log(form)
    }}>
        <Controller 
            name="email"
            control={control}
            rules={requiredEmailValidationRule}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Электронная почта"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="password"
            control={control}
            rules={requiredValidateMinLength(6)}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Пароль"}
                    fullWidth={true}
                    variant="standard"
                    type="password"
                />
            )}
        />
        <Controller 
            name="address.region"
            control={control}
            rules={requiredValidateMinLength(2)}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Регион"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="address.city"
            control={control}
            rules={requiredValidateMinLength(2)}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Город"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="phoneNumber"
            control={control}
            rules={requiredValidateMinLength(2)}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Город"}
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