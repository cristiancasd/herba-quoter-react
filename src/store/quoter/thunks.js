import { quoterApi , quoterApiNode} from "../../api";
import { adapteQuoter, adapteQuotersArray } from "../../helpers/adapteQuoters";

import { adapteVariablesToNumber } from "../../helpers/adapteVariablesToNumber";
import { communicatingBackend, setActiveProductToEdit,
    setActiveProduct, onUpdateProduct,setProducts,onAddNewProduct,
    setActiveCategory, onUpdateCategory,setCategories,onAddNewCategory,
    setInitialProduct,
    
    onSuccessMessage, clearSuccessMessage,
    onErrorMessage, clearErrorMessage, 

      setQuoterProcess,
      //onUpdateQuoter,
      //setActiveQuoter,
      setQuoters,
      setInitialQuoter,
      onAddNewQuoter,
      //setActiveQuoterToEdit,
      onDeleteQuoter,
      onUpdateQuoters,
      setQuotersDefault,
      setQuoterSelected,
      onDeleteProduct,
      onDeleteCategory
    } from "./quoterSlice";

/******************************** Loading Inital Data  **********************************************/

export const startLoadingProducts=()=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{ 
            const {data} = await quoterApi.get('/products');
            console.log('/----sdsds-data****** PRODUCTS',data)
            const {user, isactive, category, ...resto}=data[0];
            const productToEdit={ ...resto, categoryId: category.id};
            dispatch(setActiveProductToEdit(productToEdit));
            dispatch(setInitialProduct(data[0]));
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

export const startLoadingQuotersDefault=(products)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            const {data} = await quoterApiNode.get('/quoters/default/');
            console.log('data ... InitialQuoters', data)
            const quotersAdapted= adapteQuotersArray(data, products)
            dispatch(setQuotersDefault(quotersAdapted))
            dispatch(setInitialQuoter({...quotersAdapted[0], isDefaultQuoter: true}))
            dispatch(setQuoterSelected({...quotersAdapted[0], isDefaultQuoter: true}))
        }catch(error){
            console.log('error startLoadingQuotersDefault', error)
            dispatch(onErrorMessage('error loading Quoters Default, talk with the admin'))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false))
    }
}

export const startLoadingQuoters=(idUser, products)=>{
    console.log('******buscando quoters del usuario idUser', idUser)
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{ 
            const {data} = await quoterApiNode.get('/quoters/idUser/'+idUser);
            console.log('****** Quoters by user', data)
            const quotersAdapted= adapteQuotersArray(data, products)
            dispatch(setQuoters(quotersAdapted))
            if(quotersAdapted.length>0){
                //dispatch(setInitialQuoter(quotersAdapted[0]))
                //dispatch(setQuoterSelected(quotersAdapted[0]))
                //dispatch(setActiveQuoterToEdit(quotersAdapted[0]))
            }
            
            //dispatch(setActiveQuoter(data[0]))
        }catch(error){
            const errorMessage=existError(error, 'loading loading quoters')
            dispatch(onErrorMessage(errorMessage))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false))
    }
}


/******************************** Categories Manage **********************************************/

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
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
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

export const startDeleteCategory= (idCategoryToDelete)=>{
    return async (dispatch) =>{
        try{
            const {data} = await quoterApi.delete('/categories/'+idCategoryToDelete);
            dispatch(onDeleteCategory(idCategoryToDelete))
            dispatch(onSuccessMessage(`category deleted`));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            console.log('error es ', error)
            const errorMessage=existError(error,'Category ', `id: ${idCategoryToDelete}`)
            dispatch(onErrorMessage(errorMessage))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}



/******************************** Products Manage **********************************************/

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

export const startDeleteProduct=(idProductToDelete)=>{
    return async (dispatch) =>{
        try{
            console.log('to delete ', '/products/'+idProductToDelete)
            const {data} = await quoterApi.delete('/products/'+idProductToDelete);
            console.log('data response delete ', {data});
            console.log(' dispatch(onDeleteQProduct');
            dispatch(onDeleteProduct(idProductToDelete))
            console.log(' Success message');
            dispatch(onSuccessMessage(`Product deleted`));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            console.log('error es ', error)
            const errorMessage=existError(error,'Product ', `id: ${idProductToDelete}`)
            dispatch(onErrorMessage(errorMessage))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}

export const startUploadingFiles = (files=[], activeProduct, ) => {


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


/******************************** Quoters Manage **********************************************/


export const startCreateQuoter=(quoter, products)=>{
    console.log('___________quoter to save, ',quoter)
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            const {data} = await quoterApiNode.post('/quoters/create', {...quoter, image:""});
            const quoterAdapted= adapteQuoter(data[0], products)
            console.log('data response ', {quoterAdapted})
            //dispatch(setActiveQuoter(quoterAdapted));
            dispatch(onAddNewQuoter(quoterAdapted))
            dispatch(onSuccessMessage('Quoter created'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            console.log('error es ', error)
            //console.log('error axios ', error.response.data)
          
            let errorToShow='';
            (error.response.data.errors)
                ?errorToShow= error.response.data.errors.map(err=>{
                    return err.msg
                 })
                : errorToShow=error.response.data.message

            dispatch(onErrorMessage(errorToShow.toString()))

            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}

export const startUpdateQuoter=(quoter, products)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            const {data}= await quoterApiNode.put('/quoters/edit/'+quoter.id, {image:"", ...quoter });
            console.log('data before adapte ', data)
            const quoterAdapted= adapteQuoter(data, products);
            console.log('data response ', {quoterAdapted})
            dispatch(onUpdateQuoters(quoterAdapted));
            dispatch(onSuccessMessage('Quoter updated'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            console.log('error', error)
            console.log('error.response', error.response)
            console.log('error.response.data', error.response.data)

            dispatch(onErrorMessage('error deleting quoter'))

            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);

        }
        dispatch(communicatingBackend(false));  

    }
}

export const startDeleteQuoter=(idQuoterToDelete)=>{
    return async (dispatch) =>{
        try{
            console.log('to delete ', '/quoters/delete/'+idQuoterToDelete)
            const {data} = await quoterApiNode.delete('/quoters/delete/'+idQuoterToDelete);
            console.log('data response delete ', {data});
            console.log(' dispatch(onDeleteQuoter');
            dispatch(onDeleteQuoter(idQuoterToDelete))
            console.log(' Success message');
            dispatch(onSuccessMessage(`Quoter deleted`));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            console.log('error es ', error)
            console.log('error.response es ', error.response)

            let errorToShow='';

            if(error.response){
                if(error.response.status==404)  errorToShow= 'route backend not found'
                if(error.response.status!==404){
                    (error.response.data.errors)
                        ?errorToShow= error.response.data.errors.map(err=>{
                            return err.msg
                        })
                        : errorToShow=error.response.data.message
                }
                
            }else{
                errorToShow= 'error, talk with the admin'
            }
           
            dispatch(onErrorMessage(errorToShow.toString()))

            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}

export const startUploadingImageQuoter=(files=[], products=[])=>{
    return async(dispatch, getState)=>{
        dispatch(communicatingBackend(true));
 
        const {activeQuoter} = getState().quoter;
        const formData=new FormData();

        formData.append('archivo',files[0]);

        try{
            console.log('form data es ',formData)
            const {data} = await quoterApiNode.put('/files/edit/'+activeQuoter.id, formData);
            const quoterAdapted= adapteQuoter(data, products)
            dispatch(onUpdateQuoters(quoterAdapted));
            dispatch(onSuccessMessage('Quoter Image upload'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            console.log('error', error)
            dispatch(onErrorMessage('error upload image'))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false));
    }
}




/******************************** Common Function **********************************************/
const existError=(error, type='', detail='')=>{
    console.log('error  existError', error); 
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
