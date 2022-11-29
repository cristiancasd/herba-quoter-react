import { SaveOutlined, Update } from "@mui/icons-material";
import { Box, Button, Container, Divider, Grid, List, ListItem, Stack, TextField, Typography,  } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { temporalQuoterToNewQuoter } from "../../helpers/temporalQuoterToNewQuoter";
import { setActiveQuoter, setIsAddProductQuoterProcess } from "../../store/quoter/quoterSlice";
import { AddProductQuoterItem } from "../components/AddProductQuoterItem";
 

export const ViewAddProductsQuoter = () => {

    const{products, activeQuoter}= useSelector(state=> state.quoter);
    const dispatch=useDispatch()

    const updateQuoter=async()=>{
        const newQuoterActive= await temporalQuoterToNewQuoter(activeQuoter, products)
        dispatch(setActiveQuoter(newQuoterActive));
        dispatch(setIsAddProductQuoterProcess(false));
    }

    return(
        <Container maxWidth="sm">
            <Button 
                variant="outlined"
                onClick={updateQuoter}
                color='primary' sx={{padding:2}}>
                <Update sx={{fontSize: 30, mr:1}}/>
                    Apply Changes
            </Button>
        
            <List>
                {
                    products.map(product=> 
                        <AddProductQuoterItem key={product.id}{...product} />              
                    )
                }
            </List>
         
            <Button 
                variant="outlined"
                onClick={updateQuoter}
                sx={{padding:2}}>
                <Update sx={{fontSize: 30, mr:1}}/>
                    Apply Changes
            </Button>
        </Container>   
    )
}

