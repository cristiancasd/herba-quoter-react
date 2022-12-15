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

const activeQuoterExample={
    id:'123',
    title: 'Plan bajar peso',
    description: 'Es el plan mínimo para bajar de peso en un mes',
    img:'',
    products:{
        '2869':{
            title: 'Bebida Herbal',
            quantity: 1,
            unitPrice:173000,
            total: 173000,
            pv: 34.95
        },

        '0146':{
            title: 'Batido nutricional',
            quantity: 2,
            unitPrice:132000,
            total: 132000*2,
            pv: 23.95*2
        },
    },
    total:132000*2+173000,
    pv: 23.95*2+34.95,
}

const activeQuoterExample2={
    id:'124',
    title: 'Energía',
    description: 'Energizante y proteína',
    img:'',
    products:{
        '2871':{
            title: 'NRG',
            quantity: 1,
            unitPrice:79000,
            total: 79000,
            pv:14.75
        },
        '2868':{
            title: 'Rebuild Strenght',
            quantity: 1,
            unitPrice:277000,
            total: 277000,
            pv:52.1
        },
    },
    total:277000+79000,
    pv: 52.1+14.75,
    
    
}

export const quoterSlice = createSlice({
    name: 'quoter',

    initialState:{
        //products:[tempProduct,tempProduct2,tempProduct3],
        //categories:[tempCategory, tempCategory2],  
        products:[],
        categories:[],
        orderProducts:{},
        activeProductToEdit: null,
        activeProduct: null,
        activeCategory: null,        
        statusQuoter:'communicating',
        productsLoaded: null,
        categoriesLoaded: null,
        quoterProcess: 'edit',
        errorMessage: undefined,
        successMessage: undefined,
        //isSaving: false,
        mobileOpen: false,
        isScreenCel: false,
        selection:'product',


        isAddProductQuoterProcess: false,
        quoters:[activeQuoterExample, activeQuoterExample2],
        activeQuoter:activeQuoterExample,
        activeQuoterToEdit:{
            title: activeQuoterExample.title,
            description: activeQuoterExample.description
        },

        temporalQuoter:{},

    },

    reducers:{


        setLoadedProductsCategories: (state, {payload}) => {
            productsLoaded= null;
            categoriesLoaded= null;
        },

        setCategories: (state, {payload}) => {
            state.categories=payload;
            state.statusQuoter='ok';
            state.categoriesLoaded='ok';            
        },

        setProducts: (state, {payload}) => {
            state.products= payload;
            state.statusQuoter='ok';
            state.productsLoaded='ok';            
        },

        setOrderProducts: (state, {payload}) =>{
            state.orderProducts=payload
        },

        onAddNewProduct: ( state, { payload }) => {
            state.statusQuoter='ok';
            state.productsLoaded='ok';
            state.categoriesLoaded='ok';
            state.products.push( payload );
            //state.activeProduct = undefined;
            //state.selection='product';
        },
        onUpdateProduct: ( state, { payload } ) => {
            state.products = state.products.map( product => {
                if ( product.id === payload.id ) {
                    return payload;
                }
                return product;
            });
            state.statusQuoter='ok';
            state.productsLoaded='ok';
            state.categoriesLoaded='ok';
            //state.selection='product';
        },
        onAddNewCategory: ( state, { payload }) => {
            state.statusQuoter='ok';
            state.productsLoaded='ok';
            state.categoriesLoaded='ok';
            state.categories.push( payload );
            //state.activeCategory = undefined;
            //state.selection='category'
        },
        onUpdateCategory: ( state, { payload } ) => {
            state.categories = state.categories.map( category => {
                if ( category.id === payload.id ) {
                    return payload;
                }
                return category;
            });
            state.statusQuoter='ok';
            state.productsLoaded='ok';
            state.categoriesLoaded='ok';
            //state.selection='category'
            
        },

        setActiveProduct: ( state, { payload } ) => {
            state.quoterProcess= 'edit';
            state.statusQuoter='ok';
            state.selection='product';
            state.activeProduct=payload;
            state.activeCategory=undefined;           
        },

        setActiveProductToEdit: ( state, { payload } ) => {
            state.activeProductToEdit=payload;                      
        },

        setActiveCategoryToAdd: ( state, { payload } ) => {
            state.activeCategory=payload;                       
        },

        setActiveCategory: ( state, { payload } ) => {
            state.quoterProcess= 'edit';
            state.statusQuoter='ok';
            state.selection='category';
            //state.activeProduct={};
            state.activeProduct=undefined;
            state.activeCategory=payload;           
        },

        setQuoterProcess: ( state, { payload } ) => {
            state.quoterProcess=payload;                      
        },

        communicatingBackend: (state, { payload }) => { 
            //state: ok, communicating
            payload
                ? state.statusQuoter='communicating'
                : state.statusQuoter='ok'
            //state.errorMessage=undefined;
            
        },

        onErrorMessage: (state, {payload})=>{
            state.errorMessage= payload;
        },
        clearErrorMessage: (state)=>{
            state.statusQuoter='ok';
            state.errorMessage= undefined;
        },
        onSuccessMessage: (state, {payload})=>{
            state.successMessage= payload;
        },
        clearSuccessMessage: (state)=>{
            state.successMessage= undefined;
        },



        /*setIsSaving: (state, {payload})=>{
            state.isSaving=payload;
        },*/
        handleMobileOpen: (state, {payload})=>{
            console.log('estoy en handleMobileOpen ')
            state.mobileOpen= payload
        },
        setScreenCel: (state, {payload})=>{
            console.log('estoy en setScreenCel ', )
            state.isScreenCel= payload;
        },

        setDeleteQuoterProduct:(state, {payload})=>{
            console.log('estoy en setDeleteQuoterProduct ', )
            let newProductsList={...state.activeQuoter.products}
            delete newProductsList[payload]
            state.activeQuoter= {
                ...state.activeQuoter,
                products: {...newProductsList}
            };
        },
        
        setActiveQuoter:(state, {payload})=>{
            console.log('estoy en setActiveQuoter');
            //state.quoterProcess= 'edit';
            state.activeQuoter=payload
           // (payload=='') 
             //   ? state.activeQuoter=undefined
               // : state.activeQuoter=payload
            console.log('activeQuote es ', state.activeQuoter)
        },
        setActiveQuoterToEdit:(state, {payload})=>{
            state.activeQuoterToEdit=payload;          
        },

        setIsAddProductQuoterProcess: (state, {payload})=>{
            state.isAddProductQuoterProcess=payload;         
        },

        setProductsActiveQuoter:(state,{payload})=>{
            console.log('estoy en setProductsActiveQuoter ,', {payload})
            const {sku, quantity, total}=payload;
            quantity>0
                ? state.activeQuoter.products[sku]= {...state.activeQuoter.products[sku], quantity, total }
                : delete state.activeQuoter.products[sku];
        }, 

        /*resetTemporalQuoter:(state)=>{
            console.log('estoy en resetTemporalQuoter ,')
            state.temporalQuoter={}
        },*/

        onUpdateQuoter: ( state, { payload } ) => {
            state.quoters = state.quoters.map( quoter => {
                if ( quoter.id === payload.id ) {
                    return payload;
                }
                return quoter;
            });
            state.statusQuoter='ok';
            //state.productsLoaded='ok';
        },


        onCreateQuoter: ( state, { payload } ) => {
            payload.id='new'+ state.quoters.length;
            state.quoters=[...state.quoters, payload];
            state.statusQuoter='ok';
            //state.productsLoaded='ok';

            //Todo hacerlo el thunk
            state.activeQuoter=payload,
            state.activeQuoterToEdit={title: payload.title, description: payload.description}
        },
    },
})

export const { 
    setOrderProducts,
    setActiveProduct,
    setActiveCategory,
    communicatingBackend,
    setCategories,
    setProducts,
    onErrorMessage,
    onSuccessMessage,
    clearErrorMessage,
    clearSuccessMessage,
    setActiveProductToEdit,
    
    setQuoterProcess,
    onUpdateProduct,
    onUpdateCategory,
    onAddNewProduct,
    onAddNewCategory,
    //setIsSaving,
    handleMobileOpen,
    setScreenCel,
    setActiveCategoryToAdd, 
    setDeleteQuoterProduct,
    setActiveQuoter,
    setActiveQuoterToEdit,
    setIsAddProductQuoterProcess,
    setProductsActiveQuoter,
    //resetTemporalQuoter,
    onUpdateQuoter,
    onCreateQuoter

 } = quoterSlice.actions