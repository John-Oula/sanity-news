import React from 'react';
import { Box, Flex,LinkBox, LinkOverlay , Spacer , Heading, Text } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import Moment from "react-moment";
import { RichText, toPlainText } from "../sanity";
import { useRouter } from 'next/router';
import { FacebookIcon, FacebookShareButton, WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon, LinkedinIcon, TwitterIcon } from "react-share";
import { AiOutlineClockCircle } from 'react-icons/ai';
var { SocialIcon } = require('react-social-icons');


function Article({ data }) {
    const router = useRouter()
    
    return (


        <Flex w={`100%`} mb={10} p={[0, 0, 15, 17, 17]} className={`article ${ data?.post?.layout && 'table-form'}` } flexDirection={`column`} >
            <Flex className={'table-container'} flexDirection={`column`}>

                <Box className={'table-header-container'} p={3}> 
                    <Heading color={`#1e9339`} mb={3} size={`lg`} as={`h1`}>{data?.post?.title}</Heading>
                    <Flex pl={2} alignItems={`center`}>
                        <AiOutlineClockCircle />
                        <Box ml={3} fontSize={`sm`} color={`gray.400`}>
                            <Moment format="D MMM YYYY" date={data?.post?._updatedAt} />
                        </Box>
                    </Flex>
                </Box>


                <Flex className='rich-text' flexDirection={`column`}>
                    <RichText data={data?.post?.body} />
                    <Flex p={3}>

                        <FacebookShareButton url={`https://www.truenorth-educationcareerhub.eu${router.route}`} quote={data?.post?.title}>
                            <FacebookIcon size={32} round={false} />
                        </FacebookShareButton>

                        <EmailShareButton subject={data?.post?.title} body={toPlainText(data?.post?.body)} >
                            <EmailIcon size={32} round={false} />
                        </EmailShareButton>
                        <WhatsappShareButton url={`https://www.truenorth-educationcareerhub.eu${router.route}`} title={data?.post?.title} >
                            <WhatsappIcon size={32} round={false} />
                        </WhatsappShareButton>
                    <Spacer />
                                <LinkBox as='div'  >
                                   
                                   
                                    <LinkOverlay isExternal href={`https://www.instagram.com/truenorth034/`}>
                                    <SocialIcon fgColor='#000000' bgColor='#ffffff' style={{ height: 34, width: 34 , borderRadius: '0px'}}  network='instagram' />
                                    </LinkOverlay>
                                    
                                </LinkBox>
                                <LinkBox as='div'  >
                                <LinkOverlay isExternal href={`https://www.youtube.com/channel/UCjOH2QfkXLT23StERjI9Yxg`}>
                                    <SocialIcon fgColor='red' bgColor='#ffffff' style={{ height: 34, width: 34 , borderRadius: '0px'}}  network='youtube' />
                                    </LinkOverlay>
                                    </LinkBox>

                            </Flex>
                </Flex>
            </Flex>

        </Flex>


    );
}

export default Article;