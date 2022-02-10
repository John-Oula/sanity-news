import React from "react";
import {Box} from "@chakra-ui/react";

export default function InlineVideo({url}){
    const {_ref} = url.asset
    const assetParts = _ref.split('-') // ["file", "ff...." , "mp4"]
    const id  = assetParts[1]
    const format = assetParts[2]
    return(
       <Box w={`100%`} height={`30%`}>
           <video   controls src={`https://cdn.sanity.io/files/y90icmhk/production/${id}.${format}`}/>
       </Box>
    )
}