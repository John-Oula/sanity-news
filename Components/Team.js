import React from 'react';
import {Box,Text, Circle, Flex, Heading, Image} from "@chakra-ui/react";
import {urlFor} from "../sanity";

function Team({data}) {

    return (
        <Flex flexDirection={[`column`,`row`,`row`,`row`,`row`,]}>
            {
                data?.members?.map(each =>{
                    return(
                        <Flex flexDirection={`column`} textAlign={`center`} justifyContent={`center`} p={5}>
                            <Circle overflow={`hidden`} size={`150pt`}>
                                <Image src={urlFor(each?.image).url()} width={`auto`} h={`auto`} fallbackSrc={`https://via.placeholder.com/200`} />
                            </Circle>
                            <Heading mt={5} size={`md`} as={`h5`}>{each?.name}</Heading>
                            <Text fontSize={`sm`}> {each?.description}</Text>

                        </Flex>
                    )
                })
            }




        </Flex>
    );
}

export default Team;