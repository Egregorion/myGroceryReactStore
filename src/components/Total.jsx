export function Total({amount, count}) {

    return (
        <button type="button" className="btn btn-primary position-relative">
            Montant total : {amount} €
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {count}
            <span className="visually-hidden">produits dans le panier</span>
            </span>
        </button>
    )    
}