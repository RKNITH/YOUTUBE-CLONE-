import React, {useContext,createContext,useEffect,useState} from "react";
import { fetchApiForYoutubeData } from "../utils/fetchApi";


export const Context = createContext();

export const AppContext = ({children}) => {
    const [selectedCategory,setSelectedCategory]= useState('0')
    const [loading,setLoading]= useState(false);
    const [videoData,setVideoData]= useState([])
    const [mobileMenu,setMobileMenu]= useState(false);

    const fetchYoutubeData= async(params) =>{
    setLoading(true);
    try {
        const res= await fetchApiForYoutubeData('videos',params);
        setVideoData(res?.items)
    } catch (error) {
        console.error(error,'error fetching youtube results');
    }
    finally{
         setLoading(false)
    }
    }

    useEffect(() =>{
        if(selectedCategory){
            if(selectedCategory === '0'){
                fetchYoutubeData({
                    part:'snippet,contentDetails,statistics',
                    regionCode: 'IN',
                    maxResults:10,
                    chart:"mostPopular",
                })
            }
            else{
                fetchYoutubeData({
                    part:'snippet,contentDetails,statistics',
                    chart:"mostPopular",
                    regionCode: 'IN',
                    maxResults:10,
                    videoCategoryId:selectedCategory
                })
            }
        }
    },[selectedCategory])

    return (
        <Context.Provider
         value= {{
            selectedCategory,
            setSelectedCategory,
            setMobileMenu,
            mobileMenu,
            videoData,
            loading,
            setLoading
         }}
        >
    {children}
        </Context.Provider>
    )
}


export const useAppContext = ()=>{
    return useContext(Context)
}