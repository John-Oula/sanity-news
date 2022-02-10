import React from 'react';
import {Box, Center, Divider, Flex, Stack, Text} from "@chakra-ui/react";
import Link from 'next/link';

function Footer({data}) {
    return (
        <Flex as="footer" role="contentinfo" mx="auto"  py="12" px={{ base: '4', md: '8' }} flexDirection={`column`} bg={`#287b4f`} width={`100%`} p={2}>
            <Box p={1}>
                <Center flexDirection={`column`}>
                    <Stack  color={`white`} direction={[ 'row']} spacing='4px'>
                        {data?.map(each => {
                            return (
                                <>
                                   <Text fontSize={`sm`}   p={1}> <Link href={`/${each?.slug.current}`} passHref>{each?.title}</Link></Text>
                                    <Divider orientation='vertical'/>
                                </>
                            )
                        })}


                    </Stack>

                    <Text  fontSize={`xs`}>
                        Copyright © True North Education and Career Hub. All Rights Reserved.
                    </Text>
                </Center>
            </Box>
            <Box></Box>
        </Flex>
    );
}

export default Footer;