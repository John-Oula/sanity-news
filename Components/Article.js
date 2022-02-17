import React from 'react';
import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import {TimeIcon} from "@chakra-ui/icons";
import Moment from "react-moment";
import {PortableText} from "../sanity";


function Article({data}) {
    return (


                <Flex w={`100%`} mb={10} p={[0,0,15,17,17]} border={`solid`} p={3} borderWidth={`1px`}
                     borderColor={` #d6d9dc`} flexDirection={`column`} >
                    <Heading color={`#287b4f`} mb={3} size={`md`} as={`h5`}>{data?.post?.title}</Heading>
                    <Flex mt={`5pt`} mb={`5pt`} alignItems={`center`}>
                        <TimeIcon mr={3}/>
                        <Moment format="D MMM YYYY" >

                            <Text fontSize={`sm`}> { data?.post?._updatedAt}</Text>
                        </Moment>

                    </Flex>

                    <PortableText data={data?.post?.body} />
                </Flex>


    );
}

export default Article;