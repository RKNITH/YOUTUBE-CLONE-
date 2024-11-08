import React, { useEffect, useState } from 'react'
import { useTheme } from '../../useContextHook/useTheme'
import { useAppContext } from '../../useContextHook/useContextApi';
import { Link, useParams } from 'react-router-dom';
import { fetchApiForYoutubeData } from '../../utils/fetchApi';
import Sidebar from '../SidebarSection/Sidebar';
import { formatPublishTime, formatViewCount } from '../../utils/helper';

const SearchVideoResult = () => {
  const[searchResult,setSearchResult]= useState([])
  const {isDarkMode} = useTheme();
  const {setLoading} = useAppContext()
  const {searchQuery} = useParams();
  
  const fetchSearchVideos = async() =>{
    setLoading(true)
    try {
       const data = await fetchApiForYoutubeData("search",{
        part:"snippet",
        regionCode:"IN",
        q:searchQuery,
        type: "video",
        maxResults:10
       })
        const videoIds= data.items.map((item) => item.id.videoId).join(",")
        const videoDetailsResponse = await fetchApiForYoutubeData("videos",{
          part:"snippet,contentDetails,statistics",
          id:videoIds
        })

       setSearchResult(videoDetailsResponse?.items)
    } catch (error) {
      console.error(error,'fetching error searching videos')
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(() =>{
      fetchSearchVideos()
  },[searchQuery])



  return (
    <div className='flex w-full h-full'>
      <div className='flex-shrink-0 overflow-y-auto'>
           <Sidebar/>
      </div>
       <div className={`flex-grow overflow-y-auto ${isDarkMode? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"}`}>
           <div className='p-4'>
              {
                searchResult?.map((result) =>(
                  <div className='flex flex-col md:flex-row mb-8'>
                    <Link to={`/video/${result?.snippet?.categoryId}/${result.id}`}>
                    <img
                     src={result?.snippet?.thumbnails.medium?.url}
                     alt={result?.snippet?.title}
                     className='w-full h-auto object-cover rounded-md mb-2'
                    />
                    </Link>
                   <div className='md:ml-4 md:w-2/3'>
                       <h3 className='text=lg font-bold'>{result?.snippet?.title}</h3>
                       <div className={`text-sm ${isDarkMode ? "text-gray-400": "text-gray-600"}`}>
                        {result?.snippet?.channelTitle}
                       </div>
                       <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {formatViewCount(result?.statistics?.viewCount)} views . {formatPublishTime(result?.snippet?.publishedAt)}
                        </div>

                        <p className='mt-2'>
                          {result?.snippet?.description.slice(0,100)}
                        </p>

                   </div>
                    </div>
                ))
              }
           </div>

       </div>
    </div>
  )
}

export default SearchVideoResult