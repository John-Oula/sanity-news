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
    Stack,
    Text,
    ModalContextProvider,
    HStack
} from "@chakra-ui/react";
import { AiOutlineClose } from 'react-icons/ai';

import React, {useContext, useEffect,  useState} from "react";
import NestedLayout from "../../../Components/NestedLayout";
import Article from "../../../Components/Article";
import DirectoryNavbar from "../../../Components/DirectoryNavbar";
import {ChevronDownIcon, TimeIcon} from "@chakra-ui/icons";
import Moment from "react-moment";
import Card from "../../../Components/Card";
import SearchContext from "../../../contexts/SearchContext";

import CircleFilter from "../../../Components/CircleFilter";
import {Modal} from "react-bootstrap";
import ModalContext from "../../../contexts/ModalContext";
import ModalCard from "../../../Components/ModalCard";


function ModalPopup(props) {
  const {post} = useContext(ModalContext)


  return (
      <Modal
          {...props}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={`true`}
          className={`event-popup`}
      >

          <Modal.Body>
              <ModalCard data={props.post} />
          {/* <RichText richText={richText} /> */}
          </Modal.Body>

      </Modal>
  );
}

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
    const {modalShow, setModalShow,post} = useContext(ModalContext)
    const payload = {
      data: post
    }

    const handleFilterSearch = async () =>{
      const filter = {
        country:selectCountry,
        city:selectCity,
        category:selectCategory
      }
      console.log(filter)
      const countryQuery = `${filter.country} match country`
      const cityQuery = `${filter.city} match city`
      const categoryQuery = `${filter.category} match category`
      console.log(query)
      
    const filteredSearch = await client.fetch(query)
    .then(res =>{
      console.log(res)
    })
    .catch(error =>{
      console.log(error)
    })


    }
    useEffect(() =>{
      posts?.directory?.filter(each =>{
        if(each.category != undefined && each.category )
          categoryList.push( each.category)

        if(each.country != undefined && each.country )
          countryList.push( each.country)   

        if(each.city != undefined && each.city )
          cityList.push( each.city)


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
                      <>
                <ModalPopup
                    // loading={loading}
                    show={modalShow}
                    // error={error}
                    post={post}
                    onHide={() => setModalShow(false)}
                    // richText={posts?.post?.body}
                />

            </>
<NestedLayout>
            <Flex mb={10} w={`100%`} flexDirection={[`column`,`column`,`row`,`row`,`row`,]}>
                <Flex w={[`100%`,`100%`,`100%`,`100%`,`100%`,]}>

                    <Box  w={`100%`}   flexDirection={`column`} >
                        <Flex  flexDirection={`column`} >
                            <Box  p={3} flexDirection={`column`} >
                                <Heading color={`#287b4f`} mb={3} size={`md`} as={`h5`}>{posts?.post?.title}</Heading>
                                {/* <Flex mt={`5pt`} mb={`5pt`} alignItems={`center`}>
                                    <TimeIcon mr={3}/>
                                    <Moment format="D MMM YYYY" >

                                        <Text fontSize={`sm`}> { posts?.post?._updatedAt}</Text>
                                    </Moment>

                                </Flex> */}

                                <RichText posts={posts?.post?.body} />
                                <DirectoryNavbar  />
          <Stack  direction={['column', 'row']} spacing='4pt'>
          <Flex alignItems={`center`}>
          <Menu>
  {({ isOpen }) => (
    <>
      <MenuButton bgColor={`transparent`} color={`gray.500`} isActive={isOpen} as={Button}  m={2} rightIcon={<ChevronDownIcon />}>
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

<Flex alignItems={`center`}>
<Menu>
  {({ isOpen }) => (
    <>
      <MenuButton bgColor={`transparent`} color={`gray.500`}  isActive={isOpen} as={Button}  m={2} rightIcon={ <ChevronDownIcon />}>
      {selectCountry ? selectCountry : 'Country'}
      </MenuButton>
      <MenuList>
        {
          country?.map((each,index) =>{
            return(
              <MenuItem key={'country_'+ index} onClick={() =>setSelectCountry(each)}>{each}</MenuItem>
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
      <MenuButton bgColor={`transparent`} color={`gray.500`} isActive={isOpen} as={Button}  m={2} rightIcon={<ChevronDownIcon />}>
      {selectCity ? selectCity : 'City'}
      </MenuButton>
     
      <MenuList>
      {
          city?.map((each,index) =>{
            return(
              <MenuItem  key={'city_'+ index} onClick={() =>setSelectCity(each)}>{each}</MenuItem>
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
      <MenuButton isTruncated bgColor={`transparent`} color={`gray.500`} mr={`0.5em`} isActive={isOpen} as={Button}  m={2} rightIcon={ <ChevronDownIcon />}>
        {selectCategory ? selectCategory : 'Category'}
        
      </MenuButton>
      <MenuList>
      {
          category?.map((each,index) =>{
            return(
              <MenuItem  key={'category_'+ index} onClick={() =>setSelectCategory(each)}>{each}</MenuItem>
            )
          })
        }
        
      </MenuList>
    </>
  )}
</Menu>
{selectCategory && <AiOutlineClose cursor={`pointer`} onClick={() => setSelectCategory(null)} />}
</Flex>

<Button onClick={handleFilterSearch} bgColor={`#1e9339`} color={`white`}>Apply</Button>
</Flex>
              </Stack>
                                <CircleFilter state={true} data={posts}/>

                                <Center mt={10}  >
                                    {searching &&   <Spinner/>}
                                    {message &&   <Text color={`black`}> {message} </Text>}

                                </Center>
                                <Menu>
                                    <MenuButton bgColor={`transparent`} color={`gray.500`} as={Button} rightIcon={<ChevronDownIcon />}>
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