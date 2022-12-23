
export const adaptNewActiveQuoter= ({activeQuoter, products, skuToDelete=undefined, priceDiscountQuoter='pricepublic'}) =>{
        let productsTemporal={}
        let totalValue=0
        let totalPV=0
        Object.entries(activeQuoter.products).forEach(([key, value]) => {
            const product=products.find(product=>product.sku==key)
            if(skuToDelete!=key){ 
                productsTemporal[key]={
                    quantity: value.quantity,
                    title: product.title,
                    unitPrice: product[priceDiscountQuoter], 
                    total: value.quantity*product[priceDiscountQuoter]
                }
                totalValue+=value.quantity*product[priceDiscountQuoter];
                totalPV+=value.quantity*product.pv;
            }
        });
        const newQuoterActive={ 
            ...activeQuoter,
            products: productsTemporal,
            total: totalValue,
            pv: totalPV.toFixed(2),
        }
        return newQuoterActive
}


