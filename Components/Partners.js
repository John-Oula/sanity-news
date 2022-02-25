import React from 'react';
import {Box, Center, Flex, Heading, Image, SimpleGrid} from "@chakra-ui/react";
import {urlFor} from "../sanity";


function Partners({data}) {


    return (
        <Box width={`100%`}>
            <Box width={`inherit`} bg={`#ffdb58`} p={4}>
                <Center>
                    <Heading as={`h6`} size={`sm`}>
                        Our Partners & Network
                    </Heading>
                </Center>
            </Box>
            <SimpleGrid p={4}  minChildWidth='120px' spacing='10px'>
                {
                    data != undefined && data.partner.slice(0,10).map((each,index) =>{
                        return(

                                <Flex key={each._id} flexGrow={1} >
                                    <Box  mr={4}  width={200} height={200}>
                                        <Image fallbackSrc={`https://via.placeholder.com/200`} src={urlFor(each.image).url()} width={`auto`} h={`auto`} />
                                    </Box>

                                </Flex>

                        )
                    })
                }

            </SimpleGrid>
        </Box>
    );
}

export default Partners;