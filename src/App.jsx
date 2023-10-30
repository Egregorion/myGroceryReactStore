import { useEffect, useState } from 'react'
import { List } from './components/List.jsx'
import { Cart } from './components/Cart.jsx'
import './App.css'

function App() {
  
  const [listProducts, setListProducts] = useState([])
  const [cartProducts, setCartProducts] = useState([])

  useEffect(()=>{
    fetch('https://api.npoint.io/68bf5db20a3c236f68ed')
    .then((res) => res.json())
    .then(data => setListProducts(data))
  }, [])


  //Ajout au panier
  const addToCart = (product) => {
    //On met à jour la liste des produits avec la quantité
    const updatedListProducts = listProducts.map((item) => {
      //on cherche le bon produit dans la boucle 
      if(item.nom === product.nom){
        //si sa quantité est déjà supérieure à 0, on l'augmente
        if(item.quantity > 0 ){
          return {...item, quantity:item.quantity+1}
          //sinon on la met à 1
        }else{
          return {...item, quantity:1}
        }
      } 
      //enfin on renvoie l'élément
      return item
      //à ce stade, j'ai un nouveau tableau mis à jour que je vais pouvoir envoyer à setListProducts, il ne reste qu'à mettre en place la même chose pour le panier
    })

    const updatedCartProducts = cartProducts.map((item) => {
      if(item.nom === product.nom){
        if(item.quantity > 0 ){
          return {...item, quantity:item.quantity+1}
        }else{
          return {...item, quantity:1}
        }
      } 
      return item
    })

    //Verification de la présence du produit dans le panier
    const existingCartProduct = cartProducts.find((item) => item.nom === product.nom)
    //Si le produit ne se trouve pas dans le panier, on l'ajoute lui et on lui ajoute une propriété quantity à 1 (encore une fois avec le spread operator)
    if(!existingCartProduct){
      //equivalent à cartProducts.push()
      setCartProducts([...cartProducts, {...product, quantity:1}])
      setListProducts(updatedListProducts)
    }else{
      setCartProducts(updatedCartProducts)
      setListProducts(updatedListProducts)
    }
  }

  /*
  var : peut être utilisée partout dans le code, peut être redéfinie et réattribuée
  let : n'est accessible qu'après son initialisation/déclaration, peut être redéfinie mais pas réattribuée
  const : n'est accessible qu'après son initialisation et ne peut être ni redéfinie ni réattribuée
  */

  //équivalent à function removeFromCart(product) {} 
  const removeFromCart = (product) => {
  //De même que précédemment
    const updatedListProducts = listProducts.map((item) => {
      if(item.nom === product.nom){
        if(item.quantity > 0 ){
          return {...item, quantity:item.quantity-1}
        }else{
          return {...item, quantity:0}
        }
      } 
      return item
    })

    const updatedCartProducts = cartProducts.map((item) => {
      if(item.nom === product.nom){
        if(item.quantity > 0 ){
          return {...item, quantity:item.quantity-1}
        }
      } 
      return item
    })

    //ici on vient filtrer le panier par rapport à la quantité du produit
    const filteredCart = updatedCartProducts.filter((item) => item.quantity > 0);

    //à ce stade, les produits pour lesquels la quantité est à 0 ont été retiré du tableau filteredCart que je peux simplement envoyer à setCartProducts
    setCartProducts(filteredCart)
    setListProducts(updatedListProducts)
  }
  

  return (
    <section className='container'>
      <div className="row">
        <List 
          products={listProducts} 
          handleAddToCart={addToCart}
          handleRemoveFromCart={removeFromCart}
        />
        <Cart 
          products={cartProducts} 
          handleAddToCart={addToCart}
          handleRemoveFromCart={removeFromCart}
        />
      </div>  
    </section>
  )
}

export default App
