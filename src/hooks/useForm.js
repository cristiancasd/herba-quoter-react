import { useEffect, useMemo, useState } from 'react';
 
export const useForm = ( initialForm = {}, formValidations={} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation]=useState({})

    useEffect(() => {
        createValidators()
    }, [formState])

    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])

    const createValidators = () =>{
        const formData=formState    //En RegisterPage enviamos la función con formData
        const formCheckedValues={}
        for(const formField of Object.keys(formValidations)){
            const [fn,errorMessege]=formValidations[formField];
             
                formCheckedValues[`${formField}Valid`]=
                fn(formState[formField])
                    ? null
                    : errorMessege;  
        }
        setFormValidation(formCheckedValues)
        //Usa las funciones y muestra el mensaje de error, ambos definidos en Register Page
    }
    
    // Revisa si existió algún mensaje de error en las validaciones
    const isFormValid = useMemo(() => {
        for(const formValue of Object.keys(formValidation)){
            if (formValidation[formValue] !== null)  return false
        }
        return true
    }
    , [formValidation])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }
    

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
} 