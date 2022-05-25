
import { Product } from "./Interfaces";
import firestore from "@react-native-firebase/firestore";

const PRODUCT_COLLECTION = 'product'

export async function getProducts(ids: number[]): Promise<Product[]> {
    try{
        if(ids && ids.length > 0){

        }
    }catch(error){
        console.log(error);
        
    }
    return[]
}