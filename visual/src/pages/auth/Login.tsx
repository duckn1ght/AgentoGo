import { FC } from "react"
import { AuthForm } from "./ui/DefaultForm"
import { Controller, useForm } from "react-hook-form"
import { TextField} from "@mui/material"
import { Button } from "../../shared/ui/Button"
import { requiredEmailValidationRule, requiredValidateMinLength } from "../../components/input-validate"
import { Link, useNavigate } from "@tanstack/react-router"
import { apiService } from "../../services/api/ApiService"
import { useAuth } from "../../features/auth"
import { Typography } from "../../shared/ui/Typography"
import { COLORS_TEXT } from "../../shared/ui/colors"

interface FormType{
    email:string,
    password:string
}

export const Login:FC = function Login(){

    const navigate = useNavigate()
    const {setToken} = useAuth()
    const {
        handleSubmit,
        control,
        formState:{isValid, isSubmitting}
    } = useForm<FormType>({
        defaultValues:{
            email:"",
            password:""
        },
        mode:"onChange"
    })
    return <AuthForm onSubmit={handleSubmit( async(form) => {
        const ip = await fetch("http://ipwho.is/").then((response) => response.json()).then((data) => data)
        const response = await apiService.post<string>({
            url:"/auth/login",
            dto:{
                ...form,
                date: new Date().toISOString(),
                authPoint: ip.city,
                authManager: ""
            }
        }).catch((response) =>{
            if (response.status === 401){
                throw alert("Неверный логин или пароль")
            }
            throw alert("Такого пользователя не существует")
        })
        
        if(response.data){
            setToken(response.data)
            navigate({to:"/"})
        }
    })}>
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
                    type="password"
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Пароль"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Button disabled={!isValid || isSubmitting} type="submit">
            {"Войти"}
        </Button>
        <div className="mt-2">
            <Link to="/forgot-password">
                <Typography align="center" className={`${COLORS_TEXT.main400}`}>Забыли пароль?</Typography>
            </Link>
        </div>
    </AuthForm>
}