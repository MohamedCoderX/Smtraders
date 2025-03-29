import axios from 'axios'
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSucess } from '../slices/productsSlice';
import { deleteProductFail, deleteProductRequest, deleteProductSuccess, newProductFail, newProductRequest, newProductSuccess } from '../slices/productSlice';


const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
export const getProducts = (keyword,category,currentPage,id,name,description,image) => async (dispatch) => {
    try{
        dispatch(productsRequest())
        let link = `${frontendUrl}/products?page=${currentPage}`;
        if(keyword){
            link += `&keyword=${keyword}`
        }
        if(category){
            link += `&category=${category}`
        }
        const {data} = await axios.get(link);
        dispatch(productsSucess(data))
    }catch(error){
//handle error
dispatch(productsFail(error.response.data.message))
    }
}

// export const getProduct = id => async(dispatch)=>{
//     try{
//         dispatch(productsRequest())
//         const{data} = await axios.get(`/api/v1/product/${id}`);
//         dispatch(productsSucess(data))
//     }catch(error){

//     }
// }

export const getAdminProducts =  async (dispatch) => {
    try{
        dispatch(adminProductsRequest())
        
        const {data} = await axios.get(`${frontendUrl}/admin/products`,{withCredentials:true});
        dispatch(adminProductsSuccess(data))
    }catch(error){
//handle error
dispatch(adminProductsFail(error.response.data.message))
    }
}
export const createNewProduct = (productData) => async (dispatch) => {
    try {
        dispatch(newProductRequest());

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        console.log("Sending FormData:", productData); // Debugging

        const { data } = await axios.post(`${frontendUrl}/admin/product/new`, productData, config,{withCredentials:true});   
        
        dispatch(newProductSuccess(data));
    } catch (error) {
        dispatch(newProductFail(error.response?.data?.message || "Server Error"));
        console.error("Product creation error:", error.response?.data);
    }
};


export const deleteProduct  =  id => async (dispatch) => {

    try {  
        dispatch(deleteProductRequest()) 
        await axios.delete(`${frontendUrl}/admin/product/${id}`,{withCredentials:true});
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}