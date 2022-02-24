import React from 'react';
import {Box, Button, Heading, Image, Text} from "@chakra-ui/react";
import {toPlainText, urlFor} from "../sanity";
import Link from "next/link";
import {useRouter} from "next/router";

function PostCard({post,position}) {
    const router = useRouter();
    return (
        <>

            {
                post.map(each =>{
                    if (each?.position === position){

                        return(
                            <Box h={`fit-content`} borderColor={`#d6d9dc`} borderWidth={[`0px`,0,`1px`,`1px`,`1px`]}  w={["100%","100%","fit-content","fit-content","fit-content"]} key={each?.posts[0]._id }>
                               
                                    <Image boxSize='30em' objectFit='cover' src={urlFor(each?.posts[0]?.image).url()}fallbackSrc={`https://via.placeholder.com/200`} />
                               

                                <Box bgColor={`white`}>
                                    <Box fontWeight='semibold' as='h3' lineHeight='tight'  bgColor={`#287b4f`} color={`white`} p={5}>
                                        <Heading as='h4' size='md'>
                                            <Link href={`/post/${each?.posts[0]?.slug?.current}`}
                                                  passHref>{each?.posts[0]?.title}</Link>
                                        </Heading>
                                    </Box>

                                    <Box p={3} >

                                       <Text>{toPlainText(each?.posts[0]?.body)?.substring(0,100)}</Text>

                                    </Box>
                                    <Button m={`10pt`} onClick={() => router.push(`/post/${each?.posts[0]?.slug?.current}`)} borderColor={` #d6d9dc`} variant='outline' borderRadius={`0px`} bgColor={`white`}>Read
                                        More ...</Button>
                                </Box>
                            </Box>
                        )
                    }
                    else null
                })
            }

        </>


    );

}

export default PostCard;