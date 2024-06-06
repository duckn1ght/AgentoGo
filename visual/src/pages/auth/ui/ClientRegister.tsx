import { TextField, Typography, Select, MenuItem, Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import  { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { requiredEmailValidationRule, requiredValidateMinLength, requiredPhoneValidationRule, requiredField } from '../../../components/input-validate';
import { apiService } from '../../../services/api/ApiService';
import { AuthForm } from './AuthForm';

const organizationTypes = ["ИП", "ТОО"]

export interface AddressDto{
    region:string,
    city:string,
    street:string
}

export interface OrganizationDto{
    orgType: string,
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

export const ClientRegister: FC = function ClientRegister() {
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState:{isValid}
    } = useForm<FormType>({
        defaultValues:{
            email: "",
            password: "",
            address: {
                region:"",
                city:"",
                street:""
            },
            fullName: "",
            phoneNumber: "",
            organization: {
                orgType:"",
                identityNumber:""
            }
        },
        mode:"onChange"
    })


    return <AuthForm onSubmit={handleSubmit(async (form )=>{
        const response = await apiService.post<string>({
            url:"/auth/register/client",
            dto:{...form}
        })

        if(response.data){
            navigate({to:"/login"})
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
            name="address.street"
            control={control}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Улица (не обязательно)"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="phoneNumber"
            control={control}
            rules={requiredPhoneValidationRule}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Номер телефона"}
                    fullWidth={true}
                    variant="standard"
                />   
            )}
        />
        <Controller 
            name="fullName"
            control={control}
            rules={requiredField}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"ФИО"}
                    fullWidth={true}
                    variant="standard"
                />   
            )}
        />
        <Typography>Информация об организации</Typography>
        <Controller 
            name="organization.orgType"
            control={control}
            rules={requiredField}
            render={( {field: {value, onChange} }) =>(
                <Select
                    value={value}
                    onChange={onChange}
                >
                    {organizationTypes.map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            )}
        />
        <Controller 
            name="organization.identityNumber"
            control={control}
            rules={requiredField}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"ИИН/БИН"}
                    fullWidth={true}
                    variant="standard"
                />   
            )}
        />
        
        <Button disabled={!isValid} type="submit">
            {"Зарегистрироваться"}
        </Button>
    </AuthForm>
};