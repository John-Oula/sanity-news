import React from 'react';
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import Link from "next/link";


function TabColumn({post,firstPosition,secondPosition}) {

    return (

            <Tabs ml={5} isFitted  variant='unstyled' height={`fit-content`}  width={`100%`}>
                <TabList  width={`100%`}>
                    {
                        post?.map((each) =>{
                            if(each?.position === firstPosition || each?.position === secondPosition ){

                                return(
                                    <Tab key={each._id} _selected={{ color: 'white', bg: `#1e9339` }}>{each.title}</Tab>
                                )
                            }
                            else null
                        })
                    }

                </TabList>
                <TabPanels maxWidth={`100%`}>
                    <TabPanel>
                        {post?.map((each) => {
                            if( each.position === firstPosition){
                                return (
                                    <>
                                        {
                                            each.posts?.slice(0, 5).map((one) => (
                                                    <Box key={one._id} overflowWrap={`break-word`} borderTopWidth={`1px`}
                                                         borderColor={` #d6d9dc`}
                                                         color={`#696969`}>
                                                        <Text p={3}>
                                                            <Link href={`/post/${one.slug?.current}`}
                                                                  passHref>{one?.title}</Link>
                                                        </Text>
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

                    </TabPanel>
                    <TabPanel>
                        {post?.map((each) => {
                            if( each.position === secondPosition){
                                return (
                                    <>
                                        {
                                            each.posts?.slice(0, 5).map((one) => (
                                                    <Box key={one._id} overflowWrap={`break-word`} borderTopWidth={`1px`}
                                                         borderColor={` #d6d9dc`}
                                                         color={`#800000`}>
                                                        <Text p={3}>
                                                            <Link href={`/post/${one.slug?.current}`}
                                                                  passHref>{one?.title}</Link>
                                                        </Text>
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

                    </TabPanel>

                </TabPanels>
            </Tabs>

    );
}

export default TabColumn;