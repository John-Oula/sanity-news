import React from 'react';
import {Circle, Text, Flex, HStack} from "@chakra-ui/react";

function CircleFilter({state,data}) {

    const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    return (
        <HStack mt={5} spacing={2}>
            {
                letters.map((each,index) =>{
                    return(
                        <Circle p={2} key={index} color={`black`} size={`30px`}  bg={ state ? 'green' : 'gray.200'}>
                        <Text>{each}</Text>

                    </Circle>)
                })
            }
        </HStack>
    );
}

export default CircleFilter;