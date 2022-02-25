import Head from 'next/head'
import Image from 'next/image'
import { Box, Container, Flex,Link, LinkBox, LinkOverlay } from '@chakra-ui/react'
import Footer from "./Footer";
import { client } from "../sanity";
import NavigationBar from "./NavigationBar";
import React, { useEffect, useState } from "react";
import Breadcrumbs from 'nextjs-breadcrumbs';
import logo from '../assets/images/logo_white.jpg'
import { FacebookIcon, FacebookShareButton, InstapaperIcon, LinkedinIcon, TwitterIcon } from "react-share";
import Partners from "./Partners";
import NProgress from 'nprogress';
import Router from 'next/router';
import { useRouter } from 'next/router';
var { SocialIcon } = require('react-social-icons');

function Layout({ children }) {
    const router = useRouter()

    const title = 'Truenorth Education & Career Hub'
    const [links, setLinks] = useState([]);
    const [footer, setFooter] = useState([]);
    const [partners, setPartners] = useState([]);

    NProgress.configure({ showSpinner: false });

    Router.events.on('routeChangeStart', () => {
        NProgress.start();
    });

    Router.events.on('routeChangeComplete', () => {
        NProgress.done();
    });
    const headerQuery = `*[_type == "navigationMenu" ][0]{
  menuItems[]->{title,slug,category,dropdown,icon,
     menu_submenu[]->,
  },

 
}`
    const footerQuery = `*[_type == "footer" ] {title,_id,slug }`

    useEffect(() => {

        client.fetch(headerQuery)
            .then((res) => {


                setLinks(res.menuItems)

                console.log(links)
                client.fetch(footerQuery)
                    .then((res) => {

                        setFooter(res)
                        client.fetch(`*[_type == "partners"]`)
                            .then((res) => {
                                setPartners(res)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })



    }, [])

    return (
        <>
            <Head>
                <title>
                    Truenorth Education & Career Hub
                </title>
                <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
                    integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=='
                    crossOrigin='anonymous' referrerPolicy='no-referrer' />
            </Head>

            <Box h={`100%`} w={`100%`}>

                <header>


                    <Box w={`100%`} h={`90`} overflow={`hidden`} bgColor={`#ffffff`}>
                        <Container maxW='container.xl' >
                            <Flex  p={2} borderBottomLeftRadius={5} borderBottomRightRadius={5} bgColor={`#ffdb58`}  position={`absolute`} right={`120px`}>
                                <Link  display={['none','none','flex','flex','flex']} mr={3} href='/contact' color={`#00000`}>Contact</Link>
                                <LinkBox as='button'  >
                                    <LinkOverlay isExternal href='https://www.facebook.com/TrueNorth034'>
                                    <SocialIcon  fgColor='#000000' bgColor='#ffdb58' style={{ height: 30, width: 30 , borderRadius: '0px'}} network='facebook' />
                                    </LinkOverlay>
                                    <LinkOverlay isExternal href={`https://www.youtube.com/channel/UCjOH2QfkXLT23StERjI9Yxg`}>
                                    <SocialIcon fgColor='#000000' bgColor='#ffdb58' style={{ height: 30, width: 30 , borderRadius: '0px'}}  network='youtube' />
                                    </LinkOverlay>
                                    <LinkOverlay isExternal href={`https://www.instagram.com/truenorth034/`}>
                                    <SocialIcon fgColor='#000000' bgColor='#ffdb58' style={{ height: 30, width: 30 , borderRadius: '0px'}}  network='instagram' />
                                    </LinkOverlay>
                                    
                                </LinkBox>


                            </Flex>
                            <Image height={100} width={100} src={logo} />

                        </Container>
                    </Box>
                    <NavigationBar nav={links} />



                </header>
                <main>
                    <Container maxW='container.xl' >
                        <Breadcrumbs
                            inactiveItemStyle={
                                { background: 'none', display: `flex`, }
                            }
                            listStyle={
                                {
                                    background: 'none',
                                    display: `flex`,
                                    flexDirection: `row`,
                                    listDecoration: `none`,
                                    fontSize: `14px`,
                                    margin: `5px`

                                }
                            }
                            listClassName={`list`}
                            transformLabel={(title) =>  title + "  " + '>' }
                            omitIndexList={[0,4]}
                            omitRootLabel
                            // useDefaultStyle={true}
                            replaceCharacterList={[{ from: '.', to: ' ' }, { from: '-', to: ' ' },]} />
                    </Container>
                    {children}


                </main>
                <Container maxW='container.xl' >
                    <Partners data={partners[0]} />
                </Container>
                <footer>
                    <Footer data={footer} />
                </footer>

            </Box>
        </>
    )
}

export default Layout






