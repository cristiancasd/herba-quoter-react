

export const temporalQuoterToNewQuoter = async (activeQuoter, products, skuToDelete=undefined) => {
    let products2={}
        let totalValue=0
        let totalPV=0
        Object.entries(activeQuoter.products).forEach(([key, value]) => {
            const product=products.find(product=>product.sku==key)
            if(skuToDelete!=key){ 
                products2[key]={
                    quantity: value.quantity,
                    title: product.title,
                    unitPrice: product.pricepublic, 
                    total: value.quantity*product.pricepublic
                }
                totalValue+=value.quantity*product.pricepublic;
                totalPV+=value.quantity*product.pv;
            }
        });

        const newQuoterActive={ 
            ...activeQuoter,
            products: products2,
            total: totalValue,
            pv: totalPV.toFixed(2),
        }

        return newQuoterActive;

}