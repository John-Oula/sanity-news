import React, {useEffect, useState} from 'react';
import {Box, Flex, Heading, Text,Image} from "@chakra-ui/react";
import {toPlainText,urlFor} from "../sanity";
import Link from "next/link";

function Column({position,post}) {
    const [cardTitle, setCardTitle] = useState('')
    let temp = []


    useEffect(()=> {
        if (post) {
            post.map(each => {
                if (each.position != undefined && each.position === position) {

                    temp.push(each.title)
                }


            })

            setCardTitle(temp[0])
        }
    })
    return (

        <>

          
                <Flex   ml={[0,0,4,4,4]} mt={[4,4,0,0,0]} mb={`5%`} height={`fit-content`}  w={`100%`}
                   border={`solid`} borderWidth={[`0px`,0,`1px`,`1px`,`1px`]}
                   borderColor={` #d6d9dc`} flexDirection={`column`}>
                <Box color={ position === 2 ? `grey.500` :`white`}
                     bgColor={ "#1e9339"}>
                    <Heading as='h4' size='md' p={5}
                             color={ `white`}>
                        { cardTitle}
                    </Heading>
                </Box>

                {post?.map((each) => {
                    if(each.position != undefined && each.position === position && each.position !== 13){
                        return (
                            <>
                                {
                                    each.posts.length > 0 && each.posts?.slice(0, 7).map((one) => (
                                            <Box  key={one._id} overflowWrap={`break-word`} borderTopWidth={`1px`} borderColor={` #d6d9dc`}
                                                 color={`#696969`}>
                                              <Box position={`relative`}>
                                              {
                                                  one?.imagePreview ?
                                                  <Heading p={3} as={`h1`} size={`md`} casing={ `capitalize`}  color={ `#000000`} position={`absolute`} bgColor={ `#ffdb58`}  top={`40%`} w={`50%`} ><Link isExternal  href={ one?.link ? one?.externalLink : `/post/${one.slug?.current}`}
                                                  passHref>{one?.title}</Link></Heading>

                                                  :
                                                  <Text  overflow={`break-word`}  h={`46pt`}   p={3}>
                                                    <Link isExternal  href={ one?.link ? one?.externalLink : `/post/${one.slug?.current}`}
                                                          passHref>{one?.title}</Link></Text>
                                              }
                                                
                                                {
                                                        one?.imagePreview ? <>

                                                         <Box overflow={`hidden`} h={`196pt`} w={`100%`}>
                                    <Image src={urlFor(one?.image).url()} width={`100%`} h={`auto`} fallbackSrc={`https://via.placeholder.com/200`} />
                                </Box>
                                                        </>

                                                        :
                                                        <></>
                                                    }
                                                  </Box>
                                            </Box>
                                        )
                                    )
                                }
                            </>
                        )
                    }
                    else if(each.position === 13 && each.position === position){
                        return (
                            <>
                                {
                                     each.posts?.slice(0, 3).map((one) => (
                                            <Box key={one._id} overflowWrap={`break-word`} borderTopWidth={`1px`}
                                                 borderColor={` #d6d9dc`}
                                                 color={`#800000`}>
                                                <Box p={3}>
                                                    <Text >
                                                        <Link href={`/${one?.category}/${one.slug?.current}`}
                                                              passHref>{one?.title}</Link>
                                                    </Text>
                                                  
                                                    <Text color={`black`}>{toPlainText(one?.body).substring(0,300)}</Text>
                                                    <Text mt={`2pt`} onClick={() => router.push(`/events/${one.slug.current}`)} >Read
                                                        More ...</Text>
                                                </Box>
                                            </Box>
                                        )
                                    )
                                }
                            </>
                        )
                    }
                    else null
                })
                }
            </Flex>
   
            

      
        </>



    );
}

export default Column;