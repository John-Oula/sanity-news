import {
    Button,
    Container,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text
} from '@chakra-ui/react'

import {ChevronDownIcon, SearchIcon} from '@chakra-ui/icons'
import Link from 'next/link'
import {useState} from "react";
import {useRouter} from "next/router";
import {Nav, Navbar} from "react-bootstrap";
import {AiFillHome} from "react-icons/ai";


const NavigationBar = ({nav}) => {
    const [text, setText] = useState('');
    const history = useRouter()


    return (

        <Flex
            bgColor={`#287b4f`}
            w={`100%`} h={`auto`} boxShadow={`lg`}>

            <Container centerContent maxW={['container.sm', 'container.md', 'container.xl',]}>


                {/*<Flex  display={["none", "none", "flex", "flex", "flex"]} flexDirection={`row`}>*/}
                {/*    <Link href={`/`}>*/}
                {/*        <Flex*/}
                {/*            cursor={`pointer`}*/}
                {/*            fontSize={`sm`}*/}
                {/*            borderRadius={`0px`}*/}
                {/*            // borderColor={`#287b4f`} borderLeftWidth={`0.5px`} borderRightWidth={`0.5px`}*/}
                {/*            pl={`5`}*/}
                {/*            pr={`5`} bgColor={`#ffffff`} alignItems={'center'} color={`#ffffff`}*/}
                {/*        > <AiFillHome /> </Flex></Link>*/}

                {/*    {*/}
                {/*        nav?.map((each, index) => {*/}
                {/*            return (*/}

                {/*                each?.dropdown ?*/}
                {/*                    <Menu key={each?._id + index.toString()}>*/}
                {/*                        <MenuButton*/}

                {/*                            as={Button} rightIcon={<ChevronDownIcon/>}*/}
                {/*                            fontSize={`sm`}*/}
                {/*                            borderRadius={`0px`}*/}
                {/*                            h={`auto`}*/}
                {/*                            // borderColor={`#287b4f`} borderLeftWidth={`0.5px`}*/}
                {/*                            pl={`5`}*/}
                {/*                            pr={`5`} bgColor={`#ffffff`} alignItems={'center'} color={`#ffffff`}*/}
                {/*                        >*/}
                {/*                            <Link href={`/${each?.slug.current}`}>{each?.title}</Link>*/}
                {/*                        </MenuButton>*/}
                {/*                        <MenuList>*/}

                {/*                            {*/}
                {/*                                each?.submenu && each?.submenu.map(link => (<MenuItem key={link._id}><Link*/}
                {/*                                    href={`/${each?.slug.current}${ each.single ? '' : '/'+link.slug.current}`}>{link.title}</Link></MenuItem>))*/}
                {/*                            }*/}
                {/*                        </MenuList>*/}
                {/*                    </Menu>*/}
                {/*                    :*/}
                {/*                    <Flex cursor={`pointer`} key={each?._id + index.toString()} fontSize={`sm`}*/}
                {/*                          borderRadius={`0px`}*/}
                {/*                          // borderColor={`#287b4f`} borderLeftWidth={`0.5px`} borderRightWidth={`0.5px`}*/}
                {/*                          pl={`5`}*/}
                {/*                          pr={`5`} bgColor={`#ffffff`} alignItems={'center'} color={`#ffffff`}>*/}
                {/*                        <Link href={`/${each?.slug.current}`}><Text>{each?.title}</Text></Link>*/}
                {/*                    </Flex>*/}


                {/*            )*/}
                {/*        })*/}
                {/*    }*/}

                {/*    <Flex p={2}>*/}
                {/*        <form  onSubmit={(e) => {*/}
                {/*            e.preventDefault()*/}
                {/*            history.push({pathname: '/search', query: {text: text}})*/}
                {/*        }} w={100} ml={10}>*/}
                {/*            <InputGroup >*/}
                {/*                <InputLeftElement*/}

                {/*                    pointerEvents='none'*/}
                {/*                    children={<SearchIcon color='#287b4f'/>}*/}
                {/*                />*/}
                {/*                <Input onChange={(e) => setText(e.target.value)} color={`#444444`} type='text'*/}
                {/*                       bgColor={`#ffffff`} border={`solid`} borderColor={`#287b4f`}*/}
                {/*                       borderWidth={`2px`}/>*/}
                {/*            </InputGroup>*/}

                {/*        </form>*/}
                {/*    </Flex>*/}

                {/*</Flex>*/}
                <Flex display={"flex"} flexDirection={`row`}>
                    <Navbar collapseOnSelect expand="lg" bg="#287b4f" variant="light">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
<Nav >
<Flex alignItems={`center`} flexDirection={[`column`,`column`,`row`,`row`,`row`,]}>
    <Link href={`/`}>
        <Flex
            cursor={`pointer`}
            fontSize={`sm`}
            borderRadius={`0px`}
            // borderColor={`#287b4f`} borderLeftWidth={`0.5px`} borderRightWidth={`0.5px`}
            pl={`3`}
            pr={`3`} bgColor={`#287b4f`} alignItems={'center'} color={`#ffffff`}
        ><AiFillHome /></Flex></Link>
    {
        nav?.map((each, index) => {
            return (


                <Menu>

                    <MenuButton key={each?._id + index.toString()} fontSize={`sm`}
                                borderRadius={`0px`} borderColor={`#287b4f`}
                        // rightIcon={<ChevronDownIcon/>}
                                borderLeftWidth={`0.5px`} borderRightWidth={`0.5px`}
                                pl={[0,0,3,3,5]}
                                pr={[0,0,3,3,5]}
                                pt={[3,3,3,3,5]}
                                pb={[3,3,3,3,5]}
                        // bgColor={`#0c3344`}
                                alignItems={'center'}
                                color={`#ffffff`}>
                        <Link href={`/${each?.slug?.current}`}>{each?.title}</Link><ChevronDownIcon/>
                    </MenuButton>
                    <MenuList>

                        {
                            each?.submenu && each?.submenu.map(link => (
                                <MenuItem  w={[`100%`,`100%`,`100%`,`fit-content`]} key={link?._id}><Link
                                    href={`/${each?.category}/${link?.slug?.current}`}>{link?.title}</Link></MenuItem>))
                        }


                    </MenuList>
                </Menu>



            )
        })
    }
    <Flex >
        <form  onSubmit={(e) => {
            e.preventDefault()
            history.push({pathname: '/search', query: {text: text}})
        }} w={100} ml={10}>
            <InputGroup >
                <InputLeftElement

                    pointerEvents='none'
                    children={<SearchIcon color='#287b4f'/>}
                />
                <Input onChange={(e) => setText(e.target.value)} color={`#444444`} type='text'
                       bgColor={`#ffffff`} border={`solid`} borderColor={`#BC1F28`}
                       borderWidth={`1px`}/>
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


export default NavigationBar