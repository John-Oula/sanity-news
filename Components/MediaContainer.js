import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { urlFor } from "../sanity";

export default function MediaContainer({ url }) {
    
    return (
       
          <>
           { 
           url?.alignImage == 'left' || url?.alignImage == 'right' ? <Image className={url?.alignImage} w={`100%`} h={`auto`} m={5} boxSize='20em'
    objectFit='cover'
     fallbackSrc={`https://via.placeholder.com/200`}
                src={urlFor(url)?.url()} />
            :
        
        <Box m={5} overflow={`hidden`} h={300} w={`auto`}>
            <Image className={url?.alignImage} w={`100%`} h={`auto`}  
     fallbackSrc={`https://via.placeholder.com/200`}
                src={urlFor(url)?.url()} />
        </Box>
        }
          </>
      
    )
}