import { TextField } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import  { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { requiredPasswordValidationRule } from '../../../components/input-validate';
import { apiService } from '../../../services/api/ApiService';
import { AuthForm } from '../../auth/ui/DefaultForm';
import { Button } from '../../../shared/ui/Button';
import { tokenService } from '../../../services/storage/Factory';

interface FormType{
    oldPassword:string;
    acceptOldPassword:string;
    newPassword:string;
}

export const EditPassword: FC = function EditPassword() {
    const {history} = useRouter()
    const [oldPasswordValue, setOldPasswordValue] = useState<string>("")
    const {
        handleSubmit,
        control,
        formState:{isValid, isSubmitting}
    } = useForm<FormType>({
        defaultValues:{
            oldPassword: "",
            acceptOldPassword: "",
            newPassword: ""
        },
        mode:"onChange"
    })


    return <AuthForm 
    onSubmit={handleSubmit(async (form )=>{
        await apiService.patch<string>({
            url:"/profile/password",
            dto:{
                oldPassword: form.oldPassword,
                newPassword: form.newPassword
            }
        }).then(async (response) =>{
            if(response.status === 401){
                throw alert("Вы не можете изменить пароль")
            }
            else if(response.status === 409){
                throw alert("Неправильно введен старый пароль")
            }
            tokenService.deleteValue()
            apiService.deleteBearerToken()
            location.reload()
        }) 
    })}>
        <Controller 
            name="oldPassword"
            control={control}
            rules={requiredPasswordValidationRule}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Старый пароль"}
                    fullWidth={true}
                    variant="standard"
                    type="password"
                    onChange={(e) => {
                        field.onChange(e);
                        setOldPasswordValue(e.target.value);
                      }}
                />
            )}
        />
        <Controller 
            name="acceptOldPassword"
            control={control}
            rules={
                {   required:"Это поле обязательно",
                    validate: (value:string) => value === oldPasswordValue || "Пароли должны совпадать"
                }
            }
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Подтвердите старый пароль"}
                    fullWidth={true}
                    variant="standard"
                    type="password"
                />
            )}
        />
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
                />
            )}
        />
    
        <div className="flex justify-content items-center gap-2">
            <Button mode='dark' 
                onClick={() => history.back()}
            >
                {"Отменить"}
            </Button>
            <Button disabled={!isValid || isSubmitting} type="submit">
                {"Сохранить"}
            </Button>
        </div>
    </AuthForm>
};