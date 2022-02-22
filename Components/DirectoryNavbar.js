import {Container, Flex, Input, InputGroup, InputLeftElement, Spacer, Text} from '@chakra-ui/react'

import {SearchIcon} from '@chakra-ui/icons'
import Link from 'next/link'
import {useContext, useState} from "react";
import {Nav, Navbar} from "react-bootstrap";
import SearchContext from "../contexts/SearchContext";
import {client} from "../sanity";
import { AiFillAccountBook, AiFillDatabase, AiFillPlusCircle } from 'react-icons/ai';


const DirectoryNavbar = () => {
    const [text, setText] = useState();
    const {setSearchResults, setSearching, setMessage} = useContext(SearchContext)

    const handleSearch = async (e) => {
        e.preventDefault()
        setSearching(true)
        setMessage('')
        const query = `*[_type == "company" && company match "${text}*"]`;

        await client.fetch(query)
            .then(res => {
                console.log(res)
                setSearchResults(res)
                setSearching(false)
                if(res.length === 0){
                    setMessage('No results found')
                }
            })
            .catch(
                error => {
                    console.log(error)

                    setSearching(false)
                    setMessage('No results found')
                }
            )


    }


    return (

        <Flex
            bgColor={`#1e9339`}
            w={`100%`} h={`auto`} boxShadow={`lg`}>

            <Container maxW={'container.xl'}>

                <Flex alignItems={`center`} display={"flex"} flexDirection={`row`}>
                    <Navbar collapseOnSelect expand="lg" bg="#1e9339" variant="light">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Flex color={`white`} alignItems={`center`}
                                      flexDirection={[`column`, `column`, `row`, `row`, `row`,]}>


                                    <Flex p={2} flexGrow={1} cursor={`pointer`} fontSize={`sm`} borderRadius={`0px`}>
                                    <Flex alignItems={`center`}>
                                                            <AiFillDatabase/>
                                                                         <Text><Link href={`/`}>Companies & Organisations</Link></Text>
                                                                    </Flex>
                                       
                                    </Flex>
                                    <Flex alignItems={`center`}>
                                                            <AiFillPlusCircle/>
                                                            <Text><Link href={`/registration/companies-form`}>Add entry</Link></Text>
                                                                    
                                       
                                    </Flex>
                                
                                    <Spacer/>
                                    <Flex textAlign={`flex-end`} p={2} flexGrow={1}>
                                        <form onSubmit={handleSearch}>
                                            <InputGroup>
                                                <InputLeftElement

                                                    pointerEvents='none'
                                                    children={<SearchIcon color='#1e9339'/>}
                                                />
                                                <Input w={`100%`} onChange={(e) => setText(e.target.value)}
                                                       color={`#444444`}
                                                       type='text'
                                                       bgColor={`#ffffff`} border={`solid`} borderColor={`#BC1F28`}
                                                       borderWidth={`1px`}
                                                placeholder={`Search Keywords`}
                                                />
                                            </InputGroup>

                                        </form>
                                    </Flex>


                                </Flex>

                            </Nav>

                        </Navbar.Collapse>

                    </Navbar>

                </Flex>
            </Container>
        </Flex>


    )
}


export default DirectoryNavbar