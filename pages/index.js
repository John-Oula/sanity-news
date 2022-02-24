import {Box, Container, Flex, Stack, Image} from "@chakra-ui/react";
import Slider from "../Components/Slider";
import Column from "../Components/Column";
import React from "react";

import {client, urlFor} from "../sanity";
import NestedLayout from "../Components/NestedLayout";
import PostCard from "../Components/PostCard";
import HorizontalCard from "../Components/HorizontalCard";

export default function Home({ posts, carousel, hero}) {



    return (

<>
<Container maxW='container.xl' centerContent>
            <Flex flexDirection={`column` } w={["100%","100%","100%","100%"]} >
                <Box w={`100%`} mb={`3%`} display={["none","flex","flex","box","box"]}>
                    <Slider images={carousel} />
                </Box>
                <NestedLayout data={posts}>

                    <Flex w={`100%`} flexDirection={[`column`,`column`,`row`,`row`,`row`,]}>
                        <Flex flexDirection={`column`} w={[`100%`,`100%`,`100%`,`100%`,`100%`]}  h={`100%`}>
                            <Flex flexDirection={[`column`,`column`,`row`,`row`,`row`,]} h={`55%`}>
                                <PostCard post={posts} position={1} key={1}/>
                                <Column post={posts}  position={2} key={2}/>
                            </Flex>

                           
                            </Flex>

                        </Flex>

                </NestedLayout>

                <Stack direction={['column', 'row']} spacing='24px'>
{/* 
                    <Column post={posts} position={6} key={6}  />
                    <Column post={posts}  position={7} key={7} />
                    <Column post={posts}  position={8} key={8} />
                    <Column post={posts}  position={9} key={9} /> */}

                </Stack>


            </Flex>
            
        </Container>
        <Box display={['none','none','block','block','block']} mt={`3em`} mb={`3em`} overflow={`hidden`} h={`350pt`} w={`100%`}>
        <Image fallbackSrc={`https://via.placeholder.com/200`} src={urlFor(hero[0]?.image)?.url()} w={`100%`} h={`auto`} />
        </Box>


</>

    )
}

export async function getServerSideProps() {




    const posts = await client.fetch(`
*[_type == "heading" && featured != false] {title,position,
"posts": *[_type == "post" && references(^._id)]{
              title,slug,body,_id,externalLink,link,imagePreview,
                  "category":category->title,
                  "image":mainImage,
                        "category_slug":category->slug
                       }}`)
    const carousel = await client.fetch(`*[_type == "imageSlider"]`)
    const hero = await client.fetch(`*[_type == "hero"]`)
    if (!posts.length) {
        return {
            props: {
                posts: [],
            }
        }
    } else {
        return {
            props: {

                posts: posts,
                carousel: carousel,
                hero: hero

            }
        }
    }
}