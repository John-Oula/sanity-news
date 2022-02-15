import React from 'react';
import {Box, Flex, Heading, Image, LinkBox, LinkOverlay, SimpleGrid, Wrap, WrapItem} from "@chakra-ui/react";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {toPlainText, urlFor} from "../sanity";
import NextLink from 'next/link'
import {useRouter} from "next/router";

function HorizontalPostBlock({post,title , heading_slug}) {
    const router = useRouter();
    console.log(router)
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
                                                        <NextLink  href={`/${one?.category_slug?.current}/${router.route.split('/')[2]}/${one.slug.current}`} passHref>
                                                            <LinkOverlay>
                                                                <Flex flexDirection={[`column`,`column`,`row`,`row`,`row`,]} justifyContent={`center`} alignItems={`center`}>
                                                                    <Box  mr={[0,0,4,4,4]} overflow={`hidden`}  w={[`100%`,`100%`,`40%`,`40%`,`40%`,]} h={[`100%`,`100%`,`40%`,`40%`,`40%`,]}  >
                                                                        {one?.image && <Image
                                                                            fallbackSrc={`https://via.placeholder.com/200`}
                                                                            src={urlFor(one?.image)?.url()} w={`100%`}
                                                                            h={`auto`}/>}
                                                                    </Box>

                                                                    <Wrap  mt={[5,5,0,0,0]}  spacing={`5px`} w={`100%`}>
                                                                        <Heading as={`h5`} size={`sm`}>{one.title}</Heading>
                                                                        <br/>
                                                                        <WrapItem color={`#696969`}>
                                                                            {toPlainText(one?.body)?.substring(0,110)}. . . Read More
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