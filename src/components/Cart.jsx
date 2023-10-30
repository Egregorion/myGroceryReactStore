import { useState, useEffect } from "react"
import { Product } from './Product.jsx'
import { Total } from './Total.jsx'

export function Cart({products, handleAddToCart, handleRemoveFromCart}) {
    const [totalAmount, setTotalAmount] = useState(0)
    const [productsCount, setProductsCount] = useState(0)
    const [isOnCart, setIsOnCart] = useState(true)

    //on pourrait être tenté de faire directement les set dans le useEffect mais de cette manière on écrase constamment le résultat, donc on va séparer la logique et calculer le total à partir de 0 à chaque fois
    useEffect(() => {

        let total = 0
        let count = 0

        products.map((item) => {
            
            total += item.prix * item.quantity
            count += item.quantity
                
        })
        //puis on set les valeurs    
        setTotalAmount(total)
        setProductsCount(count)

    },[products])

    return (
        <aside className="col-4">
            {products.map((product, index) =>
                <Product 
                    key={index} 
                    product={product}
                    handleAddToCart={handleAddToCart} 
                    handleRemoveFromCart={handleRemoveFromCart}
                    isOnCart={isOnCart}
                />
            )}
            <Total 
                products={products} 
                amount={totalAmount} 
                count={productsCount}
            />
        </aside>
    )
}