import React from 'react';
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import Moment from "react-moment";
import { RichText, toPlainText } from "../sanity";
import { useRouter } from 'next/router';
import { FacebookIcon, FacebookShareButton, WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon, LinkedinIcon, TwitterIcon } from "react-share";
import { AiOutlineClockCircle } from 'react-icons/ai';

function ModalCard({ data }) {
    const router = useRouter()
    
    return (


        <Flex w={`100%`} mb={10} p={[0, 0, 15, 17, 17]} className={`article ${ data?.layout && 'table-form'}` } flexDirection={`column`} >
            <Flex className={'table-container'} flexDirection={`column`}>

                <Box className={'table-header-container'} p={3}> 
                    <Heading color={`#1e9339`} mb={3} size={`lg`} as={`h1`}>{data?.company}</Heading>
                    <Flex pl={2} alignItems={`center`}>
                        <AiOutlineClockCircle />
                        <Box ml={3} fontSize={`sm`} color={`gray.400`}>
                            <Moment format="D MMM YYYY" date={data?._updatedAt} />
                        </Box>
                    </Flex>
                </Box>


                <Flex className='rich-text' flexDirection={`column`}>
                    <RichText data={data?.body} />
                    <Flex p={3}>

                        <FacebookShareButton url={`https://www.truenorth-educationcareerhub.eu${router.route}`} quote={data?.title}>
                            <FacebookIcon size={32} round={false} />
                        </FacebookShareButton>

                        <EmailShareButton subject={data?.title} body={toPlainText(data?.body)} >
                            <EmailIcon size={32} round={false} />
                        </EmailShareButton>
                        <WhatsappShareButton url={`https://www.truenorth-educationcareerhub.eu${router.route}`} title={data?.title} >
                            <WhatsappIcon size={32} round={false} />
                        </WhatsappShareButton>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>


    );
}

export default ModalCard;