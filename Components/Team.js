import React from 'react';
import {Circle, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {toPlainText, urlFor} from "../sanity";

function Team({data}) {

    return (
        <Flex flexDirection={[`column`,`column`,`column`,`column`,`column`,]}>
            {
                data?.members?.map(each =>{
                    return(
                        <Flex key={each._id} flexDirection={[`column`,`column`,`row`,`row`,`row`]} alignItems={`center`} textAlign={`left`} justifyContent={`flex-start`} p={5}>
                            <Circle overflow={`hidden`} size={`150pt`}>
                                <Image src={urlFor(each?.image).url()} width={`auto`} h={`auto`} fallbackSrc={`https://via.placeholder.com/200`} />
                            </Circle>
                            <Flex  m={5}  flexDirection={`column`}>
                                <Heading mb={5}  size={`md`} as={`h5`}>{each?.name}</Heading>
                                <Text fontSize={`sm`} color={`#696969`}>   {toPlainText(each?.bio)}</Text>
                            </Flex>

                        </Flex>
                    )
                })
            }




        </Flex>
    );
}

export default Team;