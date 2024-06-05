import { RegisterOptions } from "react-hook-form"

export const requiredField = {
    required: "Это поле обязательное"
}

export const requiredValidateMinLength = (length: number): RegisterOptions =>{
    return {
        ...requiredField,
        validate: (value) => value.length > length || `Минимум ${length} символов`
    }
}
export const requiredEmailValidationRule ={
    ...requiredField,
    validate: (value:string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || "Некорректный email"
    }
}

export const requiredPhoneValidationRule = {
    ...requiredField,
    validate: (value:string) => {
        const phoneRegex = /^(\+7|8)?9\d{9}$/;
        return phoneRegex.test(value) || "Некорректный номер телефона"
    } 
}