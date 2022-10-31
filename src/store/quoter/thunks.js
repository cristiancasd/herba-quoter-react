import { quoterApi } from "../../api";
import { adapteVariablesToNumber } from "../../helpers/adapteVariablesToNumber";
import { communicatingBackend, setActiveProduct, 
    setActiveProductToEdit, clearErrorMessage,
    setCategories, setProducts, onErrorMessage, onUpdateProduct, onAddNewProduct, setIsSaving, setQuoterProcess} from "./quoterSlice";


export const startLoadingProducts=()=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend())
        try{
            const {data} = await quoterApi.get('/products');
            const {user, isactive, category, ...resto}=data[0];
            const productToEdit={ ...resto, categoryId: category.id};
            dispatch(setActiveProductToEdit(productToEdit));
            dispatch(setActiveProduct(data[0]));
            dispatch(setProducts(data));   
        }catch(error){
            console.log('error es ', error);
            
            if(error.response.status==404)
                dispatch(onErrorMessage('No hay productos en la base de datos'));

            if(error.response.status==400)
                dispatch(onErrorMessage(error.response.data.message.toString))

        setTimeout(()=>{
            dispatch(clearErrorMessage());
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
            console.log('error es ', error);
            (error.response.data.message.length===1)
                ? dispatch(onErrorMessage(error.response.data.message[0]))
                : dispatch(onErrorMessage(error.response.data.message))

        setTimeout(()=>{
            dispatch(clearErrorMessage());
        },10);
        }
    }
}

export const startUpdateProduct=(product, category)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend())
        try{
            const {id, isactive, ...productToUpdate}=product;
            const dataAdapted= adapteVariablesToNumber(productToUpdate);
            const {data} = await quoterApi.patch('/products/'+id, dataAdapted);
            let productUpdated={};
            (data.category.id)
                ? productUpdated={...data}
                : productUpdated={...data, category}
            
            dispatch(setActiveProduct(productUpdated))
            const {user, category, ...resto }=productUpdated;
            dispatch(setActiveProductToEdit({...resto, categoryId:category.id}))  
            dispatch(onUpdateProduct(productUpdated));
            dispatch(setIsSaving(false));        

        }catch(error){
            console.log('error es ', error)
            if(error.response.status==403)
                dispatch(onErrorMessage(`no tienes los permisos para hacer esta función`))

            if(error.response.status==404)
                dispatch(onErrorMessage(`Producto con id ${product.id} no existe en la base de datos`))

            if(error.response.status==410)
                dispatch(onErrorMessage(`Producto con id ${product.id} fue eliminado, hablar con el admin para reestablecerlo`))

            if(error.response.status==400){
                dispatch(onErrorMessage(error.response.data.message.toString()))
                
            }

        dispatch(setIsSaving(false));
        setTimeout(()=>{
            dispatch(clearErrorMessage());
        },10);
        }
    }
}

export const startCreateProduct=(product)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend())
        try{
            
            const {id, ...productToCreate}=product;
            const dataAdapted= adapteVariablesToNumber(productToCreate);
            const {data} = await quoterApi.post('/products', dataAdapted);
            dispatch(setActiveProduct(data));
            const {user, category, ...resto }=data;
            dispatch(setActiveProductToEdit({...resto, categoryId:category.id})) 
            dispatch(onAddNewProduct(data))
            dispatch(setQuoterProcess('edit'));
            dispatch(setIsSaving(false));   
            //dispatch(setActiveProduct(data))
        }catch(error){
            console.log('error es ', error)
            
            if(error.response.status==410)
                dispatch(onErrorMessage(`Producto ${product.title} ya existe pero fue eliminado, debes reestablecerlo o usar otro nombre`))

            if(error.response.status==400){
                dispatch(onErrorMessage(error.response.data.message.toString))
            }

            
        setTimeout(()=>{
            dispatch(clearErrorMessage());
        },10);
        }
    }
}


