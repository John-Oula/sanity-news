import React from 'react';
import {Circle, Flex, Text} from "@chakra-ui/react";

function CircleFilter({state,data}) {

    const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    return (
        <Flex mt={5} display={['none','none','flex','flex','flex']} flexDirection={['column', 'row']} flexWrap={`wrap`} w={`auto`}>
            {
                letters.map((each,index) =>{
                    return(
                        <Circle m={1} p={2} key={index} color={`black`} size={`30px`}  bg={ state ? 'gray.200' : 'gray.200'}>
                        <Text>{each}</Text>

                    </Circle>)
                })
            }
        </Flex>
    );
}

export default CircleFilter;