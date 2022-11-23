import { SaveOutlined, Update } from "@mui/icons-material";
import { Box, Button, Container, Divider, Grid, List, ListItem, Stack, TextField, Typography,  } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveQuoter, setIsAddProductQuoterProcess } from "../../store/quoter/quoterSlice";
import { AddProductQuoterItem } from "../components/AddProductQuoterItem";


export const ViewAddProductsQuoter = () => {

    const{products, temporalQuoter, activeQuoter}= useSelector(state=> state.quoter);
    const dispatch=useDispatch()

    const updateQuoter=()=>{
        let products2={}
        Object.entries(temporalQuoter).forEach(([key, value]) => {
            const product=products.find(product=>product.id==key)
            console.log('product ', product)
            products2[key]={
                quantity: value,
                title: product.title,
                unitPrice: product.pricepublic, 
                total: value*product.pricepublic
            }
        });

        const newQuoterActive={
            ...activeQuoter,
            products: products2
        }
        dispatch(setActiveQuoter(newQuoterActive));
        console.log('products2 ', products2);
        dispatch(setIsAddProductQuoterProcess(false));
    }

    return(
        <Container maxWidth="sm">

            <Button 
                onClick={updateQuoter}
                color='primary' sx={{padding:2}}>
                <Update sx={{fontSize: 30, mr:1}}/>
                          Update Quoter
            </Button>
        
            <List>
                {
                    products.map(product=> 
                        <AddProductQuoterItem key={product.id}{...product} />              
                    )
                }
            </List>
         
            <Button 
                onClick={updateQuoter}
                sx={{padding:2}}>
                <Update sx={{fontSize: 30, mr:1}}/>
                          Update Quoter
            </Button>
        </Container>
        
    )
}

