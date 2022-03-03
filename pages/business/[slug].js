import {client} from "../../sanity";
import {Container,Center, Heading, Flex} from "@chakra-ui/react";
import Article from "../../Components/Article";
import React from "react";
import NestedLayout from "../../Components/NestedLayout";

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  body[]{
    ...,

      _type == "forms" => {
        "fields": @.forms->formFields
      
    }
  }
}`

export default function BlogPost({data}) {

    return(
        <Container mt={7}  maxW='container.xl' centerContent>
<NestedLayout>
            <Flex w={`100%`} flexDirection={[`column`,`column`,`row`,`row`,`row`,]}>
                <Flex justifyContent={`center`} alignItems={`center`} w={[`100%`,`100%`,`100%`,`100%`,`100%`,]}>

                   { !data === null ? <Article data={data} />
                   :

                    <Center  h={`100%`} >
                    <Heading as={`h3`} size={`md`} className={`coming-soon`} >Coming Soon!</Heading>
                </Center>}
                </Flex>
              

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

    const post = await client.fetch(postQuery,{slug})
    console.log({params})


    return { props :{data :{post}}}

}