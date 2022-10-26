import { createSlice } from "@reduxjs/toolkit";
const tempUser={
    id: 'erewrewr',
    fullname:'carlos eduardo'
}


const tempCategory = {
    id: '32432423',
    title: 'proteínas',
    description: 'Salud Muscular',  
    user:tempUser,
}

const tempCategory2 = {
    id: '32432424',
    title: 'Digestivos',
    description: 'salud digestiva',
    user:tempUser,
}

const tempProduct =   {
    id: '000',
    title: 'PDM',
    pricepublic: 0,
    price15: 0,
    price25: 0,
    price35: 0,
    price42: 0,
    price50: 0,
    pv: 34.95,
    sku: 'SAD',
    image:'https://img.wattpad.com/d2c55dcd8f4e72fa33e8494e7aba4ebe1817a566/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6c71664d796c47764c64447668413d3d2d3333303437393730372e313438343330633166643337643561323433383030333131313432382e706e67?s=fit&w=720&h=720',
    description: 'Full saludable',
    user:tempUser,
    category: tempCategory
};

const tempProduct2 =   {
    id: '111',
    title: 'rebuild',
    pricepublic: 0,
    price15: 0,
    price25: 0,
    price35: 0,
    price42: 0,
    price50: 0,
    pv: 34.95,
    sku: 'SAD',
    image:'https://storage.gra.cloud.ovh.net/v1/AUTH_296c7803aa594af69d39b970927c8fb9/media/avatars/ZO/ZOTgUANIPkhZeU81.jpeg',
    description: 'Full saludable',
    user:tempUser,
    category: tempCategory
};

const tempProduct3 =   {
    id: '2222',
    title: 'aloe',
    pricepublic: 0,
    price15: 0,
    price25: 0,
    price35: 0,
    price42: 0,
    price50: 0,
    pv: 34.95,
    sku: 'SAD',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXIs-bmBdr7REAvqq3aZMYiudg0v27L0EXA&usqp=CAU',
    description: 'Full saludable',
    user:tempUser,
    category: tempCategory2
};


export const quoterSlice = createSlice({
    name: 'quoter',

    initialState:{
        products:[tempProduct,tempProduct2,tempProduct3],
        categories:[tempCategory, tempCategory2],       
        errorMessageQuoter: null,
        statusQuoter:'communicating',

        activeProduct: null,
        activeCategory: tempCategory,

        activeProductByCategory: [tempProduct],

        activeQuoter: null, //true se puede ver los productos por medio de modals
        selectionType: null, // Saber si trabajar con productos o categorías

        isSaving: null, //guardando en la base de datos

        productsLoaded: null,
        categoriesLoaded: null,
    },

    reducers:{
        setCategories: (state, {payload}) => {
            state.statusQuoter='ok';
            state.categoriesLoaded='ok';
            state.categories=payload;
        },

        setProducts: (state, {payload}) => {
            state.statusQuoter='ok';
            state.productsLoaded='ok';
            state.products= payload;
        },


        onAddNewProduct: ( state, { payload }) => {
            state.statusQuoter='ok';
            state.products.push( payload );
            state.activeProduct = null;
            state.selection='product';
        },
        onUpdateProduct: ( state, { payload } ) => {
            state.statusQuoter='ok';
            state.selection='product';
            state.products = state.products.map( product => {
                if ( product.id === payload.id ) {
                    return payload;
                }
                return product;
            });
        },
        onAddNewCategory: ( state, { payload }) => {
            state.statusQuoter='ok';
            state.selection=undefined;
            state.categories.push( payload );
            state.activeCategory = null;
            state.selection='category'
        },
        onUpdateCategroy: ( state, { payload } ) => {
            state.statusQuoter='ok';
            state.selection='category'
            state.category = state.category.map( category => {
                if ( category.id === payload.id ) {
                    return payload;
                }
                return category;
            });
        },

        setActiveProduct: ( state, { payload } ) => {
            state.statusQuoter='ok';
            state.selectionType='product';
            state.activeProduct=payload;
            state.activeCategory={};           
        },

        setActiveCategory: ( state, { payload } ) => {
            state.statusQuoter='ok';
            state.selectionType='category';
            state.activeProduct={};
            state.activeCategory=payload;           
        },

        communicatingBackend: (state) => { 
            state.statusQuoter='communicating'; 
            state.errorMessageQuoter=undefined;
            //state.selection='category'
        },

        communicatingBackendCategory: (state) => { 
            state.statusQuoter='communicating'; 
            state.errorMessageQuoter=undefined;
            //state.selection='category'
        },

        communicatingBackendProduct: (state) => { 
            state.statusQuoter='communicating'; 
            state.errorMessageQuoter=undefined;
            //state.selection='product'
        },
        clearErrorMessage: (state)=>{
            state.errorMessageQuoter= undefined;
        }
    },
})

export const { 
    setActiveProduct,
    setActiveCategory,
    communicatingBackend,
    setCategories,
    setProducts,
    clearErrorMessage,

 } = quoterSlice.actions