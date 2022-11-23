import { quoterApi } from "../../api";
import { adapteVariablesToNumber } from "../../helpers/adapteVariablesToNumber";
import { communicatingBackend, setActiveProductToEdit,
    setActiveProduct, onUpdateProduct,setProducts,onAddNewProduct,
    setActiveCategory, onUpdateCategory,setCategories,onAddNewCategory,
    
    clearErrorMessage,
      onErrorMessage, 
      setIsSaving, setQuoterProcess} from "./quoterSlice";


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
                dispatch(onErrorMessage(error.response.data.message.toString()))

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
            dispatch(onErrorMessage(error.response.data.message.toString()))

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
            console.log('error en startCreateProduct es ', error)
            
            if(error.response.status==410)
                dispatch(onErrorMessage(`Producto ${product.title} ya existe pero fue eliminado, debes reestablecerlo o usar otro nombre`))

            if(error.response.status==400){
                dispatch(onErrorMessage(error.response.data.message.toString()))
            }

            
        setTimeout(()=>{
            dispatch(clearErrorMessage());
        },10);
        }
    }
}

export const startCreateCategory=(category)=>{
    return async(dispatch) =>{
        console.log('estoy en startCreateCategory')
        dispatch(communicatingBackend())
        try{
            console.log('voy a enviar la categoria al backend ', {category})
            const {data} = await quoterApi.post('/categories', category);
            console.log('recibo la data ', {data})
            dispatch(setActiveCategory(data));
            dispatch(onAddNewCategory(data))
            dispatch(setQuoterProcess('edit'));
              
            //dispatch(setActiveProduct(data))
        }catch(error){
            console.log('error es ', error)
            
            if(error.response.status==410)
                dispatch(onErrorMessage(`Categoria ${category.title} ya existe pero fue eliminado, debes reestablecerlo o usar otro nombre`))

            if(error.response.status==400){
                dispatch(onErrorMessage(error.response.data.message.toString()))
            }

            
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(setIsSaving(false)); 
    }
}

export const startUpdateCategory=(category)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend())
        try{
            const {id, isactive, user, ...categoryToUpdate}=category;
            const {data} = await quoterApi.patch('/categories/'+id, categoryToUpdate);
            dispatch(setActiveCategory(data))
            dispatch(onUpdateCategory(data));
            dispatch(setIsSaving(false));        

        }catch(error){
            console.log('error es ', error)
            if(error.response.status==403)
                dispatch(onErrorMessage(`no tienes los permisos para hacer esta función`))

            if(error.response.status==404)
                dispatch(onErrorMessage(`Categoría con id ${category.id} no existe en la base de datos`))

            if(error.response.status==410)
                dispatch(onErrorMessage(`Categoría con id ${category.id} fue eliminado, hablar con el admin para reestablecerlo`))

            if(error.response.status==400)
                dispatch(onErrorMessage(error.response.data.message.toString()))
            

        dispatch(setIsSaving(false));
        setTimeout(()=>{
            dispatch(clearErrorMessage());
        },10);
        }
    }
}

export const startUploadingFiles = (files=[], activeProduct,) => {

    console.log('startUploadingFiles  files[0]',files[0]  )

    const formData=new FormData();
    formData.append('file',files[0]);

    return async(dispatch, getState)=>{
        dispatch(setIsSaving(true));        
        const {id}=activeProduct;
        try{
            const {data} = await quoterApi.patch('/files/product/'+id, formData);
            console.log( 'data de imagen', data)

            const productUpdated={
                ...activeProduct,
                image: data.image,
                user: data.user,
            }

            const {user, category, ...resto }=productUpdated;

            dispatch(setActiveProduct(productUpdated))
            dispatch(setActiveProductToEdit({...resto, categoryId:category.id}))  
            dispatch(onUpdateProduct(productUpdated));      
        
        
        }catch(error){
            console.log('error subiendo imagen ....', error)
            if(error.response.status==403)
                dispatch(onErrorMessage(`no tienes los permisos para hacer esta función`))

            if(error.response.status==404)
                dispatch(onErrorMessage(`Categoría con id ${category.id} no existe en la base de datos`))

            if(error.response.status==410)
                dispatch(onErrorMessage(`Categoría con id ${category.id} fue eliminado, hablar con el admin para reestablecerlo`))

            if(error.response.status==400)
                dispatch(onErrorMessage(error.response.data.message.toString()))

        setTimeout(()=>{
            dispatch(clearErrorMessage());
        },10);

        }
        
        //const {activeNote} = getState().journal;
        
        //const {image}=await fileUpload(files[0])  // Si fuera solo un archivo
        /* const productoToUpdate {
            ...setActiveProduct,
            image
        }*/
        



        //dispatch(setPhotosToActiveNote(imageUrl)); 
        dispatch(setIsSaving(false));

    }
}




