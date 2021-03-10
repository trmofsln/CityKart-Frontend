import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import ErrorModal from '../../Shared/UIelements/ErrorModel';
import LoadingSpinner from '../../Shared/UIelements/LoadingSpinner';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import ProductList from '../ProductsPages/ProductList';
import './FetchAllProduct.css';

 
    const UserProducts=()=>{
        const userId=useParams().user;
        const [loadedProducts,setLoadedProducts]=useState([]);
        const [NewProducts,setNewProducts]=useState([]); // is use to display only searched Products on screen
        const {isLoading,error,sendRequest,clearError}=useHttpClient();
        useEffect(()=>{
            const  fetchProducts=async()=>{
            try {
               const responseData= await sendRequest(
                   `${process.env.REACT_APP_BACKEND_URL}/products/user/${userId}`
               );
               setLoadedProducts(responseData.product);
               setNewProducts(responseData.product);
            } catch (error) {
                 }
           };
           fetchProducts();
        },[sendRequest,userId])

        const searchProducts = (event) => {
            const query = event.target.value.toLowerCase();
            const searchResults = loadedProducts.filter(product => product.title.toLowerCase().includes(query));
            setNewProducts(searchResults);
        }

    return (

        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && <LoadingSpinner asOverlay/>}
        <label className="inputStyle-label">Type Here to Search Products: </label>
        <input className="inputStyle-textarea" onChange={searchProducts} />
         {NewProducts &&<ProductList products={NewProducts} />}
        </React.Fragment>
    )
}

export default UserProducts
