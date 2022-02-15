import React from 'react';
import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import Link from "next/link";

function SidebarCard({post}) {


    return (

       <>
           <Flex ml={[0,0,4,4,4]} mt={[4,4,0,0,0]} mb={`5%`} height={`fit-content`}  w={`100%`} border={`solid`} borderWidth={[`0px`,0,`1px`,`1px`,`1px`]} borderColor={` #d6d9dc`} flexDirection={`column`}>
           <Box color={ `white`}
                bgColor={ "#1e9339"}>
               <Heading as='h4' size='md' p={5}
                        color={ `white`}>
                   { post?.title}
               </Heading>
           </Box>




                       <>
                           {
                               post.posts.length > 0 && post.posts?.slice(0, 7).map((one) => (
                                       <Box key={one._id} overflowWrap={`break-word`} borderTopWidth={`1px`} borderColor={` #d6d9dc`}
                                            color={`#696969`}>
                                           <Text p={3}>
                                               <Link href={`/${one?.category_slug?.current}/${one.slug?.current}`}
                                                     passHref>{one?.title}</Link>
                                           </Text>
                                       </Box>
                                   )
                               )
                           }
                       </>



           </Flex>
       </>




    );
}

export default SidebarCard;