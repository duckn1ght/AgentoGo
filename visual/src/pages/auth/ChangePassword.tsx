import { TextField } from '@mui/material';
import  { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { requiredPasswordValidationRule } from '../../components/input-validate';
import { AuthForm } from '../auth/ui/DefaultForm';
import { Button } from '../../shared/ui/Button';
import { apiService } from '../../services/api/ApiService';
import { useNavigate } from '@tanstack/react-router';

interface FormType{
    newPassword:string;
    acceptNewPassword:string;
}

export const ChangePassword: FC = function ChangePassword() {
    const [newPasswordValue, setNewPasswordValue] = useState<string>("")
    const navigate = useNavigate()
    const {
        handleSubmit,
        control,
        formState:{isValid, isSubmitting}
    } = useForm<FormType>({
        defaultValues:{
            newPassword: "",
            acceptNewPassword: ""
        },
        mode:"onChange"
    })

    return <AuthForm 
    onSubmit={handleSubmit(async (form )=>{
        const pathData = location.pathname.split("/")
        const token = pathData[pathData.length - 1]

        const response = await apiService.patch<string>({
            url:`/auth/reset-password`,
            dto: {
                password: form.newPassword,
                token: token
            }
        })
        if(response.data){
            navigate({to: "/login"})
        }
    })}>
        <Controller 
            name="newPassword"
            control={control}
            rules={requiredPasswordValidationRule}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Новый пароль"}
                    fullWidth={true}
                    variant="standard"
                    type="password"
                    onChange={(e) => {
                        field.onChange(e);
                        setNewPasswordValue(e.target.value);
                      }}
                />
            )}
        />
        <Controller 
            name="acceptNewPassword"
            control={control}
            rules={
                {   required:"Это поле обязательно",
                    validate: (value:string) => value === newPasswordValue || "Пароли должны совпадать"
                }
            }
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Подтвердите новый пароль"}
                    fullWidth={true}
                    variant="standard"
                    type="password"
                />
            )}
        />
            <Button disabled={!isValid || isSubmitting} type="submit">
                {"Сменить пароль"}
            </Button>
    </AuthForm>
};