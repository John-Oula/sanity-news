import React from 'react';
import {Box, Container, Flex, Grid, GridItem} from "@chakra-ui/react";
import {client} from "../../sanity";
import NestedLayout from "../../Components/NestedLayout";
import List from "../../Components/List";
import {useRouter} from 'next/router'


function Posts({posts}) {
    const router = useRouter();
    console.log()
    const postList = posts[0]?.posts
    return (
        <Container maxW='container.xl' centerContent>

            <NestedLayout>
            <>
                            <Box border={`solid`}  borderWidth={`1px`} borderColor={` #d6d9dc`} flexDirection={`column`} >
                                <Flex border={`solid`}  borderWidth={`1px`} borderColor={` #d6d9dc`} flexDirection={`column`} >
                                    <List posts={postList}/>

                                </Flex>
                            </Box>
                        </>
            </NestedLayout>


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