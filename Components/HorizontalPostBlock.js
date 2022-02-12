import React, {useEffect, useState} from 'react';
import {Box, Flex, Heading, Image, LinkBox, LinkOverlay, SimpleGrid, Wrap, WrapItem} from "@chakra-ui/react";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {toPlainText, urlFor} from "../sanity";
import NextLink from 'next/link'

function HorizontalPostBlock({post,title}) {
    return (
        <Flex flexDirection={`column`} mb={5} width={`100%`} overflowWrap={`break-word`}>
            <Flex mb={5} width={`inherit`} bg={`#ffd24a`} p={3} alignItems={`center`}>

                <Heading as={`h3`} size={`md`}>{ title }</Heading>
                <ArrowForwardIcon/>
            </Flex>

            <Flex w={`100%`} p={4}>
                <SimpleGrid columns={[1, null, 2]} spacing='4'>


                                    <>
                                        {
                                            post?.slice(0,5).map((one) =>(
                                                <Box key={one._id} >
                                                    <LinkBox  as='article'>
                                                        <NextLink  href={`/post/${one.slug.current}`} passHref>
                                                            <LinkOverlay>
                                                                <Flex flexDirection={[`column`,`column`,`row`,`row`,`row`,]} justifyContent={`center`} alignItems={`center`}>
                                                                    <Box  mr={[0,0,4,4,4]} overflow={`hidden`} h={[`100%`,`10%`,`10%`,`10%`,`15%`,]} w={[`100%`,`10%`,`10%`,`10%`,`15%`,]}  >
                                                                        {one?.image && <Image
                                                                            fallbackSrc={`https://via.placeholder.com/200`}
                                                                            src={urlFor(one?.image)?.url()} w={`100%`}
                                                                            h={`100%`}/>}
                                                                    </Box>

                                                                    <Wrap  mt={[5,5,0,0,0]}  spacing={`5px`} w={`100%`}>
                                                                        <Heading as={`h5`} size={`sm`}>{one.title}</Heading>
                                                                        <br/>
                                                                        <WrapItem color={`#696969`}>
                                                                            {toPlainText(one?.body)?.substring(0,50)}
                                                                        </WrapItem>
                                                                    </Wrap>
                                                                </Flex>
                                                            </LinkOverlay>
                                                        </NextLink>
                                                    </LinkBox>
                                                </Box>
                                            ))
                                        }
                                    </>



                </SimpleGrid>
            </Flex>
        </Flex>
    );
}

export default HorizontalPostBlock;