import React,{useState, useEffect} from 'react';
import ErrorModal from '../../Shared/UIelements/ErrorModel';
import LoadingSpinner from '../../Shared/UIelements/LoadingSpinner';
import { useHttpClient } from '../../Shared/hooks/http-hook';

const UserName=(props)=>{
    const userId=props.uid;
    const [loadedName,setLoadedName]=useState();
    const {isLoading,error,sendRequest,clearError}=useHttpClient();
    useEffect(()=>{
        const  fetchName=async()=>{
        try {
           const responseData= await sendRequest(
               `${process.env.REACT_APP_BACKEND_URL}/users/getName/${userId}`
           );
           setLoadedName(responseData.name)
        } catch (error) {
             }
       };
       fetchName();
    },[sendRequest,userId])
return (

    <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && <LoadingSpinner/>}
     {loadedName}
    </React.Fragment>
)
}

export default UserName