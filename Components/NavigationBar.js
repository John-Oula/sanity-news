import {
    Button,
    Container,

    Flex,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text
} from '@chakra-ui/react'

import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Nav, Navbar } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { urlFor } from "../sanity";


const NavigationBar = ({ nav }) => {
    const [text, setText] = useState('');
    const history = useRouter()
    



    return (

        <Flex
            bgColor={`#1e9339`}
            w={`100%`} h={`auto`} boxShadow={`lg`}>

            <Container maxW={'container.xl'}>

                <Flex display={"flex"} flexDirection={`row`}>
                    <Navbar collapseOnSelect expand="lg" bg="#1e9339" variant="light">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Flex
                                    flexDirection={[`column`, `column`, `row`, `row`, `row`,]}>
                                    <Link href={`/`}>
                                        <Flex
                                            cursor={`pointer`}
                                            fontSize={`sm`}
                                            borderRadius={`0px`}
                                            // borderColor={`#1e9339`} borderLeftWidth={`0.5px`} borderRightWidth={`0.5px`}
                                            p={[5, 4, 0, 3, 3]} bgColor={`#1e9339`} alignItems={'center'} color={`#ffffff`}
                                        ><AiFillHome /></Flex></Link>
                                    {
                                        nav?.map((each, index) => {
                                            return (
                                                <>
                                                    {
                                                        each?.dropdown ?


                                                            <Menu >
                                                                {({ isOpen }) => (
                                                                <>
                                                                <MenuButton
                                                                //  _hover={{ bg: "#ffd24a",color: '#000000' }} 
                                                                 key={each?._id + index.toString()} fontSize={`sm`}
                                                                            borderRadius={`0px`} borderColor={`#1e9339`}
                                                                            
                                                                            w={`fit-content`}
                                                                            isActive={isOpen}
                                                                            
                                                                            
                                                                    // rightIcon={<ChevronDownIcon/>}
                                                                            borderLeftWidth={`0.5px`} borderRightWidth={`0.5px`}
                                                                            p={[5,4,3,3,3]}
                                                                            textAlign={[`left`, `left`, `center`, `center`, `center`]}
                                                                    bgColor={isOpen && `#35af51`}
                                                                            alignItems={'center'}
                                                                            color={`#ffffff`}>
                                                                    <Flex alignItems={`center`}>
                                                                        <Image p={1} src={urlFor(each?.icon).url()} width={`24px`} height={`24px`} fallbackSrc={`https://via.placeholder.com/200`} />
                                                                        <Link
                                                                            href={`/${each?.slug?.current}`}>{each?.title}</Link><ChevronDownIcon
                                                                        ml={2}/>
                                                                    </Flex>


                                                            </MenuButton>
                                                                <MenuList borderRadius={0} bgColor={[null,null,`#1e9339`,`#1e9339`,`#1e9339`]} borderColor={`#1e9339`}  w={[`100%`, `100%`, `100%`, `fit-content`, `fit-content`]}>

                                                                    {
                                                                        each?.menu_submenu && each?.menu_submenu.map(link => (
                                                                            <MenuItem  _hover={{ bg: "#ffd24a",color: '#000000' }}
                                                                            _focus={{ bg: "#ffd24a",color: '#000000' }}
                                                                            color={[null,null,`#ffffff`,`#ffffff`,`#ffffff`]}
                                                                            onClick={() => history.push(`/${each?.slug?.current}/${link?.slug?.current}`)}
                                                                                key={link?._id}><Link
                                                                                href={`/${each?.slug?.current}/${link?.slug?.current}`}>{link?.title}</Link></MenuItem>))
                                                                    }


                                                                </MenuList>
                                                                </>
                                                                )}
                                                            </Menu>


                                                            :
                                                            <Flex cursor={`pointer`} key={each?._id + index.toString()} fontSize={`sm`}
                                                                borderRadius={`0px`}
                                                                alignItems={`center`}
                                                                // borderColor={`white`} borderLeftWidth={`0.5px`} borderRightWidth={`0.5px`}
                                                                p={[5, 4, 3, 3, 3]} color={`white`} bgColor={`#1e9339`}>
                                                                <Image p={1} src={urlFor(each?.icon).url()} width={`24px`} height={`24px`} fallbackSrc={`https://via.placeholder.com/200`} />

                                                                <Text><Link href={`/${each?.slug?.current}`}>{each?.title}</Link></Text>
                                                            </Flex>

                                                    }

                                                </>
                                            )
                                        })
                                    }

                                </Flex>

                            </Nav>

                        </Navbar.Collapse>
                        <Flex p={2}>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                history.push({ pathname: '/search', query: { text: text } })
                            }} >
                                <InputGroup w={`auto`}>
                                    <InputLeftElement

                                        pointerEvents='none'
                                        children={<SearchIcon color='#1e9339' />}
                                    />
                                    <Input w={`auto`} onChange={(e) => setText(e.target.value)} color={`#444444`} type='text'
                                        bgColor={`#ffffff`} 
                                        />
                                </InputGroup>

                            </form>
                        </Flex>
                    </Navbar>

                </Flex>
            </Container>
        </Flex>


    )
}


export default NavigationBar
