//import { quoterApi } from "../../api/quoterApi";
import {quoterApi} from "../../api";
import { getEnvVariables } from "../../helpers/getEnvVariables";
import { checkingCredentials, clearErrorMessage, onLogin, onLogout } from "./authSlice";

export const startLoginWithEmailPassword = ({email, password}) => {

    return async(dispatch) =>{
        dispatch(checkingCredentials());
        
        try{
            //const resp=await quoterApi.post ('/auth/login',{email,password})           
            const {data} = await quoterApi.post('/auth/login',{email,password})
            console.log(data)
            const {user}=data;
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); //Hacer manejos de token, calcular cuanto tiempo le queda etc.          
            dispatch(onLogin({name: user.fullname, id: user.id, rol: user.rol, email: email, herbalifeLevel: user.herbalifelevel, country: user.country
            })); 
        
        }catch(error){
            console.log(error);
            error.response.status==401
                ? dispatch(onLogout('Invalid Credentials'))
                : dispatch(onLogout(error.response.data.message[0]));
            
            console.log('disparo contador');

            setTimeout(()=>{
                console.log('reseteo errores');
                dispatch(clearErrorMessage());
            },10);
        }
    }       
}


export const checkingAuthentication = (email,password) => { 
    return async (dispatch) => { 
        dispatch(checkingCredentials());
    } 
} 

export const startGoogleSignIn = () => { 
    return async (dispatch) => { 
        dispatch(checkingCredentials());
    } 
}

export const chekAuthToken = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const token=localStorage.getItem('token');
        if(!token)  dispatch(onLogout());
        try{
            const {data}=await quoterApi.post('auth/check-renew-token');
            const {user}=data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); //Hacer manejos de token, calcular cuanto tiempo le queda etc.          
                dispatch(onLogin({name: user.fullname, id: user.id, rol: user.rol, 
                email: user.email, herbalifeLevel: user.herbalifelevel, country: user.country}))
        }catch(error){
            console.log('hubo error',error)
            localStorage.clear();
             dispatch(onLogout());
        }
    }
    
}

export const startLogout = () => {
    return async (dispatch) => { 
        dispatch(checkingCredentials());
        localStorage.clear();
        dispatch(onLogout());
    }    
}