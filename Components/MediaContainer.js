import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { urlFor } from "../sanity";

export default function MediaContainer({ url }) {
    return (
       
            <Image w={`100%`} h={`auto`} m={5} boxSize='20em'
    objectFit='cover'
     fallbackSrc={`https://via.placeholder.com/200`}
                src={urlFor(url)?.url()} />
      
    )
}