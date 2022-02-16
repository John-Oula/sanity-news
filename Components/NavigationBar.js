import {
    Button,
    Container,
    Flex, Image,
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

import {ChevronDownIcon, SearchIcon} from '@chakra-ui/icons'
import Link from 'next/link'
import React, {useState} from "react";
import {useRouter} from "next/router";
import {Nav, Navbar} from "react-bootstrap";
import {AiFillHome} from "react-icons/ai";
import {urlFor} from "../sanity";

const NavigationBar = ({nav}) => {
    const [text, setText] = useState('');
    const router = useRouter()



    return (

        <Flex
            bgColor={`#1e9339`}
            w={`100%`} h={`auto`} boxShadow={`lg`}>

            <Container maxW={'container.xl'}>

                <Flex  alignItems={[`center`]} display={"flex"}  flexDirection={`row`}>

                    <Flex
                        flexDirection={[`column`, `column`, `row`, `row`, `row`,]}>
                        <Link href={`/`}>
                            <Flex
                                cursor={`pointer`}
                                fontSize={`sm`}
                                borderRadius={`0px`}
                                // borderColor={`#1e9339`} borderLeftWidth={`0.5px`} borderRightWidth={`0.5px`}
                                pl={`3`}
                                pr={`3`} bgColor={`#1e9339`} alignItems={'center'} color={`#ffffff`}
                            ><AiFillHome/></Flex></Link>
                        {
                            nav?.map((each, index) => {
                                return (
                                    <>
                                        {
                                            each?.dropdown ?

                                                <Menu>

                                                    <MenuButton key={each?._id + index.toString()} fontSize={`sm`}
                                                                borderRadius={`0px`} borderColor={`#1e9339`}
                                                                w={`fit-content`}
                                                        // rightIcon={<ChevronDownIcon/>}
                                                                borderLeftWidth={`0.5px`} borderRightWidth={`0.5px`}
                                                                pl={[0, 0, 1, 1, 5]}
                                                                pr={[0, 0, 1, 1, 5]}
                                                                pt={[3, 3, 1, 1, 5]}
                                                                pb={[3, 3, 1, 1, 5]}
                                                                textAlign={[`left`, `left`, `center`, `center`, `center`]}
                                                        // bgColor={`#0c3344`}
                                                                alignItems={'center'}
                                                                color={`#ffffff`}>
                                                        <Flex alignItems={`center`}>
                                                            <Image p={1} src={urlFor(each?.icon).url()} width={`24px`} height={`24px`} fallbackSrc={`https://via.placeholder.com/200`} />
                                                            <Link
                                                                href={`/${each?.slug?.current}`}>{each?.title}</Link><ChevronDownIcon
                                                            ml={2}/>
                                                        </Flex>


                                                    </MenuButton>
                                                    <MenuList  w={[`100%`, `100%`, `100%`, `fit-content`, `fit-content`]}>

                                                        {
                                                            each?.menu_submenu && each?.menu_submenu.map(link => (
                                                                <MenuItem onClick={() => router.push(`/${each?.slug?.current}/${link?.slug?.current}`)}
                                                                    key={link?._id}>{link?.title}</MenuItem>))
                                                        }


                                                    </MenuList>
                                                </Menu>
                                                :
                                                <Flex cursor={`pointer`} key={each?._id + index.toString()} fontSize={`sm`}
                                                      borderRadius={`0px`}
                                                    // borderColor={`white`} borderLeftWidth={`0.5px`} borderRightWidth={`0.5px`}
                                                      pl={`1`}
                                                      pr={`1`} color={`white`} alignItems={'center'} bgColor={`#1e9339`}>
                                                    <Image p={1} src={urlFor(each?.icon).url()} width={`24px`} height={`24px`} fallbackSrc={`https://via.placeholder.com/200`} />

                                                    <Text><Link href={`/${each?.slug?.current}`}>{each?.title}</Link></Text>
                                                </Flex>

                                        }

                                    </>
                                )
                            })
                        }

                    </Flex>
                        <Flex  p={2}>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                history.push({pathname: '/search', query: {text: text}})
                            }} >
                                <InputGroup w={`auto`}>
                                    <InputLeftElement

                                        pointerEvents='none'
                                        children={<SearchIcon color='#1e9339'/>}
                                    />
                                    <Input w={`auto`} onChange={(e) => setText(e.target.value)} color={`#444444`} type='text'
                                           bgColor={`#ffffff`} border={`solid`} borderColor={`#BC1F28`}
                                           borderWidth={`1px`}/>
                                </InputGroup>

                            </form>
                        </Flex>


                </Flex>
            </Container>
        </Flex>


    )
}


export default NavigationBar