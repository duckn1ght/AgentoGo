import { TextField, Select, MenuItem } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import  { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { requiredEmailValidationRule, requiredValidateMinLength, requiredPhoneValidationRule, requiredField } from '../../components/input-validate';
import { apiService } from '../../services/api/ApiService';
import { AuthForm } from './ui/DefaultForm';
import { Typography } from '../../shared/ui/Typography';
import { Button } from '../../shared/ui/Button';

const organizationTypes = ["ИП", "ТОО", "Физическое лицо", "АО", "ТДО", "КТ", "ПТ", "ПК"]
export enum ROLE_TYPE {
    CLIENT = "клиент",
    PROVIDER = "поставщик"
}
export enum POSITION{
    MERCHANDAISER = "товаровед",
    MANAGER = "менеджер",
    OPERATOR = "оператор",
    LEADER = "руководитель"
}

export interface AddressDto{
    region:string,
    city:string,
    street:string
}

export interface OrganizationDto{
    imgUrl: string,
    name: string,
    type: string,
    identityNumber : string
}

interface FormType{
    email: string,
    password: string,
    address: AddressDto
    fullName: string,
    phoneNumber: string,
    role: ROLE_TYPE,
    date: string,
    position: POSITION,
    organization: OrganizationDto
}

export const Register: FC = function Register() {
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState:{isValid, isSubmitting}
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
                type:"",
                identityNumber:""
            }
        },
        mode:"onChange"
    })


    return <AuthForm onSubmit={handleSubmit(async (form )=>{
        const response = await apiService.post<string>({
            url:"/auth/register",
            dto:{
                email: form.email,
                password: form.password,
                address:{
                    region: form.address.region,
                    city: form.address.city,
                    street: form.address.street
                },
                fullName: form.fullName,
                phoneNumber: form.phoneNumber,
                organization: {
                    imgUrl: "",
                    name: "",
                    type: form.organization.type,
                    identityNumber: form.organization.identityNumber
                },
                role: ROLE_TYPE.CLIENT,
                position: POSITION.LEADER,
                passwordChangeDate: new Date().toISOString()
            }
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
            name="organization.type"
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
        
        <Button disabled={!isValid || isSubmitting} type="submit">
            {"Зарегистрироваться"}
        </Button>
    </AuthForm>
};