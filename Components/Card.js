import React from 'react';
import {Box, Image, Flex} from "@chakra-ui/react";
import {urlFor} from "../sanity";

function Card({post}) {
    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
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
                    isTruncated
                >
                    {post?.company}
                </Box>
                <Box
                    mt='1'
                    fontWeight='light'
                    as='h6'
                    lineHeight='tight'
                    isTruncated
                >
                    {post?.summary}
                </Box>


            </Box>
        </Box>
    );
}

export default Card;