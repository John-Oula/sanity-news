import {client, PortableText} from "../../../sanity";
import {
    Box,
    Center,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Menu,
    MenuButton, MenuItem,
    MenuList,
    Spinner,
    Button,
    Text
} from "@chakra-ui/react";

import React, {useContext, useEffect} from "react";
import Column from "../../../Components/Column";
import NestedLayout from "../../../Components/NestedLayout";
import DirectoryNavbar from "../../../Components/DirectoryNavbar";
import {ChevronDownIcon, TimeIcon} from "@chakra-ui/icons";
import Moment from "react-moment";
import Card from "../../../Components/Card";
import SearchContext from "../../../contexts/SearchContext";
import CircleFilter from "../../../Components/CircleFilter";




export default function BusinessDirectory({posts}) {
    const {searchResults, setSearchResults, searching, message,setMessage} = useContext(SearchContext)

    useEffect(() =>{
        return () => {
            setSearchResults([])
            setMessage('')
        }
    },[])

    return(
        <Container mt={7}  maxW='container.xl' centerContent>
<NestedLayout>
            <Flex mb={10} w={`100%`} flexDirection={[`column`,`column`,`row`,`row`,`row`,]}>
                <Flex w={[`100%`,`100%`,`100%`,`100%`,`100%`,]}>

                    <Box border={`solid`} w={`100%`}  borderWidth={`1px`} borderColor={` #d6d9dc`} flexDirection={`column`} >
                        <Flex border={`solid`}  borderWidth={`1px`} borderColor={` #d6d9dc`} flexDirection={`column`} >
                            <Box border={`solid`} p={3} borderWidth={`1px`} borderColor={` #d6d9dc`} flexDirection={`column`} >
                                <Heading color={`#287b4f`} mb={3} size={`md`} as={`h5`}>{posts?.post?.title}</Heading>
                                <Flex mt={`5pt`} mb={`5pt`} alignItems={`center`}>
                                    <TimeIcon mr={3}/>
                                    <Moment format="D MMM YYYY" >

                                        <Text fontSize={`sm`}> { posts?.post?._updatedAt}</Text>
                                    </Moment>

                                </Flex>

                                <PortableText posts={posts?.post?.body} />
                                <DirectoryNavbar  />
                                <CircleFilter state={true} data={posts}/>

                                <Center mt={10}  >
                                    {searching &&   <Spinner/>}
                                    {message &&   <Text color={`black`}> {message} </Text>}

                                </Center>
                                <Menu>
                                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                        Select Sorting Order
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Most Popular</MenuItem>
                                        <MenuItem>Newest</MenuItem>
                                        <MenuItem>'Company Name' ascending</MenuItem>
                                        <MenuItem>'Company Name' descending</MenuItem>

                                    </MenuList>
                                </Menu>
                                <SimpleGrid minChildWidth={['auto','250px','250px','250px','250px']} spacing='40px'>
                                    {
                                       !searching && searchResults.length  === 0 && !message && posts?.directory?.map(each =>{
                                           return(
                                               <>
                                               <Card post={each} />
                                               </>

                                           )
                                       })
                                    }
                                    {
                                        !searching  && searchResults.length > 0 && !message && searchResults?.map(each =>{
                                            return(
                                                <>
                                                    <Card post={each} />
                                                </>

                                            )
                                        })
                                    }

                                </SimpleGrid>
                            </Box>
                        </Flex>
                    </Box>

                </Flex>


            </Flex>
</NestedLayout>
        </Container>
    )
}




export async function getServerSideProps(context) {
    const postQuery = `*[_type == "post" && slug.current == "business-directory"][0]{
    "directory": *[_type == "company"] ,
  ...,
  body[]{
    ...,

      _type == "forms" => {
        "fields": @.forms->formFields
      
    }
  }
}`

    const posts = await client.fetch(postQuery)

    return { props :{posts :posts}}

}