import React from 'react';
import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import Link from "next/link";
import {TimeIcon} from "@chakra-ui/icons";
import Moment from "react-moment";
import {toPlainText} from "../sanity";
import {useRouter} from 'next/router';

function Post({data}) {
    const router = useRouter();
    return (
        <Box borderBottom={`solid`} p={3} borderBottomWidth={`1px`} borderColor={` #d6d9dc`}
           >
            <Heading color={`#287b4f`} mb={3} size={`sm`} as={`h5`}><Link href={`/post/${data.slug?.current}`}
                                                        passHref>{data?.title}</Link></Heading>
            <Flex alignItems={`center`}>
                <TimeIcon mr={3}/>
                <Moment format="D MMM YYYY">

                    <Text fontSize={`12px`}> {data?._updatedAt}</Text>
                </Moment>

            </Flex>

            <Text>{toPlainText(data?.body)?.substring(0,300)}</Text>
            <Button mt={`10pt`} onClick={() => router.push(`/post/${data.slug?.current}`)} borderColor={` #d6d9dc`} variant='outline' borderRadius={`0px`} bgColor={`white`}>Read
                More ...</Button>
        </Box>
    );
}

export default Post;