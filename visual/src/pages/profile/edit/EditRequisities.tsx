import { TextField } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import  { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { requiredField } from '../../../components/input-validate';
import { apiService } from '../../../services/api/ApiService';
import { AuthForm } from '../../auth/ui/DefaultForm';
import { useAuth } from '../../../features/auth';
import { Button } from '../../../shared/ui/Button';
import { Profile } from '../../../features/models/Profile';


interface FormType{
    bankName:string
    identityCode: string
    bankCode: string
    benCode: string
}

export const EditRequisities: FC = function EditRequisities() {
    const {history} = useRouter()
    const {user, setUser} = useAuth() 
    const {
        handleSubmit,
        control,
        formState:{isValid, isSubmitting}
    } = useForm<FormType>({
        defaultValues:{
            bankName: user?.requisities?.bankName || "",
            identityCode: user?.requisities?.identityCode || "",
            bankCode: user?.requisities?.bankCode || "",
            benCode: user?.requisities?.benCode || ""
        },
        mode:"onChange"
    })


    return <AuthForm onSubmit={handleSubmit(async (form )=>{
        if(user?.requisities){
            await apiService.patch<string>({
                url:"/profile/requisities/"+ user?.requisities?.id,
                dto:{...form}
            })
        }
        else{
            await apiService.post<string>({
                url:"/profile/requisities/",
                dto:{...form}
            })

        }
        const response = await apiService.get<Profile>({
            url: "/profile",
        });
        setUser(response.data);
        history.back()
    })}>
        <Controller 
            name="bankName"
            control={control}
            rules={requiredField}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"Название банка"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="identityCode"
            control={control}
            rules={requiredField}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"ИИК"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="bankCode"
            control={control}
            rules={requiredField}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"БИК"}
                    fullWidth={true}
                    variant="standard"
                />
            )}
        />
        <Controller 
            name="benCode"
            control={control}
            rules={requiredField}
            render={( {field, fieldState: {error} }) =>(
                <TextField 
                    {...field}
                    error={Boolean(error?.message)}
                    helperText= {error?.message}
                    label={"КБЕ"}
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
            {user?.requisities ? (<Button disabled={!isValid || isSubmitting} type="submit">
                {"Сохранить"}
            </Button>)
            :
            (<Button disabled={!isValid || isSubmitting} type="submit">
                {"Создать"}
            </Button>)   
        }
        </div>
    </AuthForm>
};