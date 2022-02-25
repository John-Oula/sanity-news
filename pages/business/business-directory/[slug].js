import {client} from "../../../sanity";
import {Container, Flex} from "@chakra-ui/react";
import Article from "../../../Components/Article";
import React from "react";
import NestedLayout from "../../../Components/NestedLayout";



export default function BlogPost({data}) {

    return(
        <Container mt={7}  maxW='container.xl' centerContent>
<NestedLayout>
            <Flex w={`100%`} flexDirection={[`column`,`column`,`row`,`row`,`row`,]}>
                <Flex w={[`100%`,`100%`,`100%`,`100%`,`100%`,]}>

                    <Article data={data} />
                </Flex>
                {/*<Flex >*/}

                {/*    <Column />*/}

                {/*</Flex>*/}

            </Flex>
</NestedLayout>
        </Container>
    )
}



export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type == "post" && defined(slug.current)]{
        "params" :{
        "slug": slug.current
        }
        }`
    )

    return {
        paths,
        fallback: true,
    }

}

export async function getStaticProps({params}) {
    console.log(params)

    const {slug} = params;
    const postQuery = `*[_type == "company" && company == "Caroline Wacheke Murigi-Kruijer - Career Coach & Consultant"][0]`
    const post = await client.fetch(postQuery,{slug})
    console.log({params})


    return { props :{data :{post}}}

}