import React from 'react';
import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import {TimeIcon} from "@chakra-ui/icons";
import Moment from "react-moment";
import {RichText,toPlainText} from "../sanity";
import {useRouter} from 'next/router';
import {FacebookIcon, FacebookShareButton,WhatsappShareButton,WhatsappIcon ,EmailShareButton, EmailIcon, LinkedinIcon, TwitterIcon} from "react-share";

function Article({data}) {
    const router = useRouter()
    return (


                <Flex w={`100%`} mb={10} p={[0,0,15,17,17]}
                      className={`article`}
                      // border={`solid`}
                   
                      // borderWidth={`1px`}
                     // borderColor={` #d6d9dc`}
                      flexDirection={`column`} >
                    <Heading color={`#1e9339`} mb={3} size={`lg`} as={`h1`}>{data?.post?.title}</Heading>
                    <Flex mt={`5pt`} mb={`10pt`} alignItems={`center`}>
                        <TimeIcon mr={3}/>
                        <Moment format="D MMM YYYY" >

                            <Text fontSize={`sm`} color={`gray.300`}>Last Updated { data?.post?._updatedAt}</Text>
                        </Moment>

                    </Flex>

                    <RichText data={data?.post?.body} />
                   <Flex>
                        
                                  <FacebookShareButton url={`https://www.truenorth-educationcareerhub.eu${router.route}`} quote={data?.post?.title}>
                                  <FacebookIcon size={32} round={false} />
                                  </FacebookShareButton>
                                 
                                  <EmailShareButton subject={data?.post?.title} body={toPlainText(data?.post?.body)} >
                                      <EmailIcon size={32} round={false} />
                                  </EmailShareButton>
                                  <WhatsappShareButton url={`https://www.truenorth-educationcareerhub.eu${router.route}`} title={data?.post?.title} >
                                      <WhatsappIcon size={32} round={false} />
                                  </WhatsappShareButton>
                   </Flex>
                </Flex>


    );
}

export default Article;