import { useState } from 'react'
import { Product } from './Product.jsx'

export function List({products, handleAddToCart, handleRemoveFromCart}) {
    const [isOnCart, setIsOnCart] = useState(false)

    return (
        <main className="col-8">
            <div className="row">
                {products.map((product, index) =>
                    <Product 
                        key={index} 
                        product={product} 
                        handleAddToCart={handleAddToCart} 
                        handleRemoveFromCart={handleRemoveFromCart}
                        isOnCart={isOnCart}
                    />
                )}
            </div>
        </main>
    )
}