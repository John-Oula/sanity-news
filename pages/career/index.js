import React from 'react';
import {Box, Container, Flex, Grid, GridItem} from "@chakra-ui/react";
import {client} from "../../sanity";
import Column from "../../Components/Column";
import List from "../../Components/List";


const postQuery = `*[_type == "post"]`


function Posts({posts}) {
    return (
        <Container maxW='container.xl' centerContent>

            <Grid h='fit-content' templateRows='repeat(1, 1fr)' templateColumns='repeat(6, 1fr)' gap={4} w={`inherit`}>
                <GridItem  colSpan={4}  >
                    <Flex flexDirection={`column`} >


                                    <>
                                        <Box border={`solid`}  borderWidth={`1px`} borderColor={` #d6d9dc`} flexDirection={`column`} >
                                            <Flex border={`solid`}  borderWidth={`1px`} borderColor={` #d6d9dc`} flexDirection={`column`} >
                                                <List posts={posts}/>
                                                
                                            </Flex>
                                        </Box>
                                    </>


                    </Flex>
                </GridItem>
                <GridItem colSpan={2}  >
                    <Flex alignItems={`center`}  flexDirection={'column'}>
                        <Column />

                    </Flex>
                </GridItem>

            </Grid>


        </Container>
    );
}

export default Posts

export async function getStaticProps(context) {
    console.log(context.params)
    const posts = await client.fetch(postQuery)
    
    return { props :{posts :posts}}

}