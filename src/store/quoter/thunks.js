import { quoterApi } from "../../api";
import { communicatingBackend, setActiveProduct, setCategories, setProducts } from "./quoterSlice";


export const startLoadingProducts=()=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend())
        try{
            const {data} = await quoterApi.get('/products');
            dispatch(setActiveProduct(data[0]))
            dispatch(setProducts(data))            
        }catch(error){
            console.log('error es ', error)
            //error.response.status==401
            //? dispatch(onLogout('Invalid Credentials'))
            //: dispatch(onLogout(error.response.data.message[0]));
        setTimeout(()=>{
            dispatch(clearErrorMessag());
        },10);
        }
    }
}


export const startLoadingCategories=()=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend())
        try{
            const {data} = await quoterApi.get('/categories');
            dispatch(setCategories(data))
        }catch(error){
            console.log('error es ', error)
            //error.response.status==401
            //? dispatch(onLogout('Invalid Credentials'))
            //: dispatch(onLogout(error.response.data.message[0]));
        setTimeout(()=>{
            dispatch(clearErrorMessage());
        },10);
        }
    }
}