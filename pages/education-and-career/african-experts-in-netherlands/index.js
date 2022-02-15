import React from 'react';
import {Box, Container, Flex, Grid, GridItem} from "@chakra-ui/react";
import {client} from "../../../sanity";
import Column from "../../../Components/Column";
import List from "../../../Components/List";
import {useRouter} from 'next/router'


function Posts({posts}) {
    const router = useRouter();
    console.log()
    const postList = posts[0].posts
    return (
        <Container maxW='container.xl' centerContent>

            <Grid h='fit-content' templateRows='repeat(1, 1fr)' templateColumns='repeat(6, 1fr)' gap={4} w={`inherit`}>
                <GridItem  colSpan={4}  >
                    <Flex flexDirection={`column`} >


                        <>
                            <Box border={`solid`}  borderWidth={`1px`} borderColor={` #d6d9dc`} flexDirection={`column`} >
                                <Flex border={`solid`}  borderWidth={`1px`} borderColor={` #d6d9dc`} flexDirection={`column`} >
                                    <List posts={postList}/>

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

export async function getServerSideProps(context) {

    const urlArray = context.req.url.split('/')
    const slug = urlArray[urlArray.length-1]

    const query = `*[_type == "category" && slug.current == "${slug}"]{
  "posts": *[_type == "post" && references(^._id)]{
              title,slug,body,_id,
                  "category":category->title,
                  "image":mainImage,
                        "category_slug":category->slug
                       }}`
    const posts = await client.fetch(query)

    return { props :{posts :posts}}

}