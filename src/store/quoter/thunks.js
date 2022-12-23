import { quoterApi } from "../../api";
import { adapteVariablesToNumber } from "../../helpers/adapteVariablesToNumber";
import { communicatingBackend, setActiveProductToEdit,
    setActiveProduct, onUpdateProduct,setProducts,onAddNewProduct,
    setActiveCategory, onUpdateCategory,setCategories,onAddNewCategory,
    
    onSuccessMessage, clearSuccessMessage,
    onErrorMessage, clearErrorMessage, 

      setQuoterProcess,
      onUpdateQuoter,
      onCreateQuoter,
      setActiveQuoter} from "./quoterSlice";


export const startLoadingProducts=()=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{ 
            const {data} = await quoterApi.get('/products');
            const {user, isactive, category, ...resto}=data[0];
            const productToEdit={ ...resto, categoryId: category.id};
            dispatch(setActiveProductToEdit(productToEdit));
            dispatch(setActiveProduct(data[0]));
            dispatch(setProducts(data));   
        }catch(error){
            const errorMessage=existError(error, 'loading products ');
            dispatch(onErrorMessage(errorMessage))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false))
        
    }
}

export const startLoadingCategories=()=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{ 
            const {data} = await quoterApi.get('/categories');
            dispatch(setCategories(data))
        }catch(error){
            const errorMessage=existError(error, 'loading categories ')
            dispatch(onErrorMessage(errorMessage))

            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false))
    }
}

export const startUpdateProduct=(product, category)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
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
            dispatch(onSuccessMessage('Product Updated'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);

        }catch(error){
            const errorMessage= existError(error,'Product ', `id: ${product.id}`);
            dispatch(onErrorMessage(errorMessage));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false));
    }
}

export const startCreateProduct=(product)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{            
            const {id, ...productToCreate}=product;
            const dataAdapted= adapteVariablesToNumber(productToCreate);
            const {data} = await quoterApi.post('/products', dataAdapted);
            dispatch(setActiveProduct(data));
            const {user, category, ...resto }=data;
            dispatch(setActiveProductToEdit({...resto, categoryId:category.id})) 
            dispatch(onAddNewProduct(data))
            dispatch(setQuoterProcess('View'));  
            dispatch(onSuccessMessage('Product created'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            
            const errorMessage=existError(error,'Product ', `title: ${product.title}`)
            console.log('onErrorMessage ,', errorMessage)
            dispatch(onErrorMessage(errorMessage))

            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}

export const startCreateCategory=(category)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            const {data} = await quoterApi.post('/categories', category);
            dispatch(setActiveCategory(data));
            dispatch(onAddNewCategory(data))
            dispatch(setQuoterProcess('View'));
            dispatch(onSuccessMessage('Category created'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            console.log('error es ', error)
            
            const errorMessage= existError(error,'Category ', `title: ${category.title}`);
            dispatch(onErrorMessage(errorMessage))
            
            /*if(error.response.status==410)
                dispatch(onErrorMessage(`Categoria ${category.title} ya existe pero fue eliminado, debes reestablecerlo o usar otro nombre`))

            if(error.response.status==400){
                dispatch(onErrorMessage(error.response.data.message.toString()))
            } */
   
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}

export const startCreateQuoter=(quoter)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        dispatch(onCreateQuoter(quoter))
        dispatch(setQuoterProcess('View'));
        dispatch(communicatingBackend(false));  
        dispatch(onSuccessMessage('Quoter created'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
    }
}

export const startUpdateQuoter=(quoter)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        dispatch(onUpdateQuoter(quoter))
        dispatch(setQuoterProcess('View'));
        dispatch(communicatingBackend(false));  
        dispatch(onSuccessMessage('Quoter Updated'));
        setTimeout(()=>{
            dispatch(clearSuccessMessage());
        },10);
    }
}


export const startUpdateCategory=(category)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            const {id, isactive, user, ...categoryToUpdate}=category;
            const {data} = await quoterApi.patch('/categories/'+id, categoryToUpdate);
            dispatch(setActiveCategory(data))
            dispatch(onUpdateCategory(data));
            dispatch(onSuccessMessage('Category updated'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
                  

        }catch(error){

            const errorMessage= existError(error, 'category ', `id: ${category.id} `)
            dispatch(onErrorMessage(errorMessage))
        
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false));
    }
}

export const startUploadingFiles = (files=[], activeProduct,) => {


    const formData=new FormData();
    formData.append('file',files[0]);

    return async(dispatch, getState)=>{
        dispatch(communicatingBackend(true));        
        const {id}=activeProduct;
        try{
            const {data} = await quoterApi.patch('/files/product/'+id, formData);

            const productUpdated={
                ...activeProduct,
                image: data.image,
                user: data.user,
            }

            const {user, category, ...resto }=productUpdated;

            dispatch(setActiveProduct(productUpdated))
            dispatch(setActiveProductToEdit({...resto, categoryId:category.id}))  
            dispatch(onUpdateProduct(productUpdated));      
            dispatch(onSuccessMessage('Image uploaded'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        
        
        }catch(error){
            const errorMessage=existError(error,'Image ')
            dispatch(onErrorMessage(errorMessage))

            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }

        dispatch(communicatingBackend(false));
    }
}




const existError=(error, type='', detail='')=>{
    console.log('error register ', error); 
    if (error.response){
        if(error.response.status==403) return `Not available for your role`
        if(error.response.status==404) return `${type}${detail} don't exist in the data base`;
        if(error.response.status==410) return `${type}${detail} was deleted, you must talk to the admin to reactivate it`
        if(error.response.status==400) return error.response.data.message.toString()
        return 'error'
    }else{
        return 'Network error'
    }             
}
