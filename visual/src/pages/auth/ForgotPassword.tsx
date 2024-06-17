import { TextField } from '@mui/material';
import  { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { requiredEmailValidationRule} from '../../components/input-validate';
import { AuthForm } from './ui/DefaultForm';
import { Button } from '../../shared/ui/Button';
import { apiService } from '../../services/api/ApiService';


interface FormType{
    email: string,
}

export const ForgotPassword: FC = function ForgotPassword() {
    const {
        handleSubmit,
        control,
        formState:{isValid, isSubmitting}
    } = useForm<FormType>({
        defaultValues:{
            email: "",
        },
        mode:"onChange"
    })


    return <AuthForm onSubmit={handleSubmit(async (form )=>{
        const response = await apiService.post<string>({
            url: "/auth/forgot-password",
            dto: form
        })
        if(response.status === 403){
            alert("Пользователь с таким email не найден")
        }
        else if(response.status === 201){
            alert("Мы отправили сообщение на почту")
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
        <Button disabled={!isValid || isSubmitting} type="submit">
            {"Отправить запрос"}
        </Button>
    </AuthForm>
};