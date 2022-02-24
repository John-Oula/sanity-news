import {client, RichText} from "../../../sanity";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    SimpleGrid,
    Spinner,
    Spacer,
    Text
} from "@chakra-ui/react";
import { AiOutlineClose } from 'react-icons/ai';

import React, {useContext, useEffect,  useState} from "react";
import NestedLayout from "../../../Components/NestedLayout";
import DirectoryNavbar from "../../../Components/DirectoryNavbar";
import {ChevronDownIcon, TimeIcon} from "@chakra-ui/icons";
import Moment from "react-moment";
import Card from "../../../Components/Card";
import SearchContext from "../../../contexts/SearchContext";
import CircleFilter from "../../../Components/CircleFilter";


export default function BusinessDirectory({posts}) {
    const {searchResults, setSearchResults, searching, message,setMessage} = useContext(SearchContext)
    const [country,setCountry] = useState([])
    let countryList = []
    const [city,setCity] = useState([])
    let cityList = []
    const [category,setCategory] = useState([])
    let categoryList = []

    const [selectCountry,setSelectCountry] = useState(null)
    const [selectCity,setSelectCity] = useState(null)
    const [selectCategory,setSelectCategory] = useState(null)


    useEffect(() =>{
      posts?.directory?.filter(each =>{
        if(each.category != undefined && each.category )
          categoryList.push( each.category)
       if(each.country != undefined && each.country )
          countryList.push( each.country)   



      })
      console.log(Array.from(new Set(countryList)))

      const filteredCategory = Array.from(new Set(categoryList))
      const filteredCountry = Array.from(new Set(countryList))
      const filteredCity = Array.from(new Set(cityList))

      setCategory(filteredCategory)
      setCountry(filteredCountry)
      setCity(filteredCity)

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

                                <RichText posts={posts?.post?.body} />
                                <DirectoryNavbar  />
          <Flex>
          <Flex alignItems={`center`}>
          <Menu>
  {({ isOpen }) => (
    <>
      <MenuButton isActive={isOpen} as={Button}  m={2} rightIcon={<ChevronDownIcon />}>
        Entries
      </MenuButton>
      <MenuList>
        <MenuItem>All Words</MenuItem>
        <MenuItem>Any Words</MenuItem>
        <MenuItem>Exact Words</MenuItem>
        
      </MenuList>
    </>
  )}
</Menu>
</Flex>
<Flex alignItems={`center`}>
<Menu>
  {({ isOpen }) => (
    <>
      <MenuButton isActive={isOpen} as={Button}  m={2} rightIcon={ <ChevronDownIcon />}>
      {selectCountry ? selectCountry : 'Country'}
      </MenuButton>
      <MenuList>
        {
          country?.map(each =>{
            return(
              <MenuItem onClick={() =>setSelectCountry(each)}>{each}</MenuItem>
            )
          })
        }
        
      </MenuList>
    </>
  )}
</Menu>
{selectCountry && <AiOutlineClose cursor={`pointer`} onClick={() => setSelectCountry(null)} /> }
</Flex>
<Flex alignItems={`center`}>

<Menu>

  {({ isOpen }) => (
    <>
      <MenuButton isActive={isOpen} as={Button}  m={2} rightIcon={<ChevronDownIcon />}>
      {selectCity ? selectCity : 'City'}
      </MenuButton>
     
      <MenuList>
      {
          city?.map(each =>{
            return(
              <MenuItem onClick={() =>setSelectCity(each)}>{each}</MenuItem>
            )
          })
        }
        
      </MenuList>
    </>
  )}
</Menu>
{ selectCity && <AiOutlineClose cursor={`pointer`} onClick={() => setSelectCity(null)} /> }
</Flex>
<Flex alignItems={`center`}>
<Menu >
  {({ isOpen }) => (
    <>
      <MenuButton mr={`0.5em`} isActive={isOpen} as={Button}  m={2} rightIcon={ <ChevronDownIcon />}>
        {selectCategory ? selectCategory : 'Category'}
        
      </MenuButton>
      <MenuList>
      {
          category?.map(each =>{
            return(
              <MenuItem onClick={() =>setSelectCategory(each)}>{each}</MenuItem>
            )
          })
        }
        
      </MenuList>
    </>
  )}
</Menu>
{selectCategory && <AiOutlineClose cursor={`pointer`} onClick={() => setSelectCategory(null)} />}
</Flex>
              </Flex>
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
                                        <MenuItem>Company Name ascending</MenuItem>
                                        <MenuItem>Company Name descending</MenuItem>

                                    </MenuList>
                                </Menu>
                                <SimpleGrid minChildWidth={['auto','250px','250px','250px','250px']} spacing='40px'>
                                    {
                                       !searching && searchResults.length  === 0 && !message && posts?.directory?.map(each =>{
                                           return(
                                               <>
                                               <Card key={each._id} post={each} />
                                               </>

                                           )
                                       })
                                    }
                                    {
                                        !searching  && searchResults.length > 0 && !message && searchResults?.map(each =>{
                                            return(
                                                <>
                                                    <Card key={each._id} post={each} />
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