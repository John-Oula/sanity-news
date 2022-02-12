import React from 'react';
import {Container} from "@chakra-ui/react";
import {client} from "../../../sanity";
import NestedLayout from "../../../Components/NestedLayout";
import HorizontalPostBlock from "../../../Components/HorizontalPostBlock";


function Posts({posts}) {

    return (
        <Container maxW='container.xl' centerContent>

            <NestedLayout>
                {
                    posts?.map(each =>  {  return (<HorizontalPostBlock post={each?.posts} title={each?.title}/>)})
                }
            </NestedLayout>


        </Container>
    );
}

export default Posts

export async function getServerSideProps(context) {

    const urlArray = context.req.url.split('/')
    const slug = urlArray[urlArray.length - 1]

    const query = `*[_type == "heading" && featured != true && references(*[_type=="submenu"]._id) && heading_submenu->slug.current == 'diaspora'] {title,position,
"posts": *[_type == "post" && references(^._id)]{
              title,slug,body,_id,
                  "category":category->title,
                  "image":mainImage,
                        "category_slug":category->slug
                       }}`
    const posts = await client.fetch(query)

    return {props: {posts: posts}}

}