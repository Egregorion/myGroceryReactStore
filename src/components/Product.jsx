export function Product({product, handleAddToCart, handleRemoveFromCart, isOnCart}){
    if(isOnCart){
        return (
            <article className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={product.image} className="img-fluid" alt={product.nom} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{product.nom}</h5>
                            <p className="card-text">{product.prix}€</p>
                        </div>
                        <div>
                            <button onClick={() => handleRemoveFromCart(product)}>-</button>
                            <span>{product.quantity ? product.quantity : 0}</span>
                            <button onClick={() => handleAddToCart(product)}>+</button>
                        </div>
                    </div>
                </div>
            </article>
        )
    } else {
        return (   
            <article className="card col-12 col-md-3">
                <img src={product.image} className="card-img-top" alt={product.nom}/>
                <div className="card-body">
                    <h5 className="card-title">{product.nom}</h5>
                    <p className="card-text">{product.prix}€</p>
                </div>
                <div>
                    <button onClick={() => handleRemoveFromCart(product)}>-</button>
                    {/* Ceci est un if / else  */}
                    <span>{product.quantity ? product.quantity : 0}</span>
                    <button onClick={() => handleAddToCart(product)}>+</button>
                </div>
            </article>
        )
    }    
}