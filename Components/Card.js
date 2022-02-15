import React from 'react';
import {Box, Image} from "@chakra-ui/react";
import {PortableText, urlFor} from "../sanity";

function Card({post}) {
    return (
        <Box boxShadow={`lg`} maxW='sm' h={`fit-content`}  borderWidth='1px' borderRadius='lg' overflow='hidden'>
            {post?.cover_image?.asset &&
            <Image fallbackSrc={`https://via.placeholder.com/200`} src={urlFor(post?.cover_image)?.url()}
                   w={`100%`} h={`100%`}/>}


            <Box p='6'>
                <Box display='flex' alignItems='baseline'>

                </Box>

                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'

                >
                    {post?.company}
                </Box>
                <Box
                    mt='1'
                    fontWeight='light'
                    as='h6'
                    lineHeight='tight'

                >

                    {post?.body && <PortableText data={post?.body}/>}

                </Box>


            </Box>
        </Box>
    );
}

export default Card;