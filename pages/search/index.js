import React, {useState} from 'react';
import List from "../../Components/List";
import {client} from "../../sanity";
import {Button, Center, Container, Flex, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import NestedLayout from "../../Components/NestedLayout";


function Search({posts}) {

    const [message,setMessage] = useState('');

    return (

            <Container  maxW={`container.xl`}>
                <NestedLayout>
                <Flex flexDirection={`column`}>
                    <Text mt={`20pt`} fontSize={`md`}>Total: {posts.length} {posts.length === 1 ? `result` : `results`} found</Text>
                    <Flex mt={`20pt`}  alignItems={`center`}>
                        <Text fontSize={`md`}>
                            Display #:
                        </Text>
                        <Menu >
                            <MenuButton ml={`10pt`}  as={Button} rightIcon={<ChevronDownIcon/>}>
                                5
                            </MenuButton>
                            <MenuList>
                                <MenuItem defaultValue>5</MenuItem>
                                <MenuItem>10</MenuItem>
                                <MenuItem>20</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>

                </Flex>

                { posts?.length === 0 ?

                    <Center>
                        <Text mt={`20pt`} fontSize={`md`}> No results found</Text>
                    </Center>
                    :

                    <List posts={posts}/>
                }
                </NestedLayout>
            </Container>


    );
}

export default Search;


export async function getServerSideProps(context) {

    const q = `*[_type == "post"&& title match "${context.query.text}*"]`;
    const posts = await client.fetch(q)



        .catch(error => {
            setMessage('An error occurred while searching')
        })



    return { props :{posts :posts}}

}