import React from 'react'
import './ProductList.css'
import ProductItem from './ProductItem';

const ProductList=({products})=> {

    return (
        <ul className="product-list">
          {products.map((product)=>(
              <div>
              <ProductItem  
              product={product}/>
              </div>
          ))}

        </ul>
    )
}

export default ProductList
