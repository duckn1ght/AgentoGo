import { TextField } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import  { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { requiredEmailValidationRule, requiredValidateMinLength, requiredPhoneValidationRule, requiredField } from '../../../components/input-validate';
import { apiService } from '../../../services/api/ApiService';
import { AuthForm } from '../../auth/ui/DefaultForm';
import { useAuth } from '../../../features/auth';
import { Button } from '../../../shared/ui/Button';
import { Profile } from '../../../features/models/Profile';

export interface AddressDto{
    region:string,
    street:string
}

export interface OrganizationDto{
    identityNumber : string
}

interface FormType{
    email: string,
    address: AddressDto
    fullName: string,
    phoneNumber: string,
    organization: OrganizationDto
}

export const EditProfile: FC = function EditProfile() {
    const {history} = useRouter()
    const {user, setUser} = useAuth() 
    const {
        handleSubmit,
        control,
        formState:{isValid, isSubmitting}
    } = useForm<FormType>({
        defaultValues:{
            email: user?.email || "",
            address: {
                region: user?.address.region || "",
                street: user?.address.street || ""
            },
            fullName: user?.fullName || "",
            phoneNumber: user?.phoneNumber || "",
            organization: {
                identityNumber: user?.organization.identityNumber || ""
            }
        },
        mode:"onChange"
    })


    return <AuthForm onSubmit={handleSubmit(async (form )=>{
        await apiService.patch<string>({
            url:"/profile",
            dto:{...form}
        }).then(async () =>{
            const response = await apiService.get<Profile>({
                url: "/profile",
            });
            setUser(response.data);
            history.back()
        }) 
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