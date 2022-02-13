import Head from 'next/head'
import Image from 'next/image'
import {Box, Container, Flex,} from '@chakra-ui/react'
import Footer from "./Footer";
import {client} from "../sanity";
import NavigationBar from "./NavigationBar";
import React, {useContext, useEffect, useState} from "react";
import NProgress from 'nprogress';
import Router from 'next/router';
import SearchContext from "../contexts/SearchContext";
import Breadcrumbs from 'nextjs-breadcrumbs';
import logo from '../assets/images/logo_white.jpg'
import {FacebookIcon, FacebookMessengerIcon, InstapaperIcon, LinkedinIcon, TwitterIcon} from "react-share";

function Layout({children}) {

    const [links, setLinks] = useState([]);
    const [footer, setFooter] = useState([]);
    const {searching,searchResults,message} = useContext(SearchContext)
    NProgress.configure({showSpinner: false});

    Router.events.on('routeChangeStart', () => {
        NProgress.start();
    });

    Router.events.on('routeChangeComplete', () => {
        NProgress.done();
    });
    const headerQuery = `*[_type == "navigationMenu" ][0]{
  menuItems[]->{title,slug,category,dropdown,
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
                    Truenorth hub
                </title>
                <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
                      integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=='
                      crossOrigin='anonymous' referrerPolicy='no-referrer'/>
            </Head>

            <Box    h={`100%`} w={`100%`}>

              <header>


                      <Box w={`100%`} h={`90`} overflow={`hidden`}  bgColor={`#ffffff`}>
                          <Container maxW='container.xl' >

                    <Image  height={100} width={100} src={logo}/>
                              <Flex>
                                  <TwitterIcon size={32} round={false} />
                                  <FacebookIcon size={32} round={false} />
                                  <InstapaperIcon size={32} round={false} />
                                  <FacebookMessengerIcon size={32} round={false} />
                                  <LinkedinIcon size={32} round={false} />

                              </Flex>
                          </Container>
                </Box>
                  <NavigationBar nav={links}/>



              </header>
              <main>
                  <Container  maxW='container.xl' >
                  <Breadcrumbs
                      inactiveItemStyle = {
                          {background: 'none',    display: `flex`,}
                      }
                      listStyle = {
                          {background: 'none',
                          display: `flex`,
                              flexDirection: `row`,
                              listDecoration: `none`,
                              fontSize: `14px`,
                              margin: `5px`

                          }
                      }
                      listClassName={`list`}
                      transformLabel={(title) =>  '|'+ "   " + title }
                      omitIndexList={[0,1]}
                      omitRootLabel
                      // useDefaultStyle={true}
                      replaceCharacterList={[{ from: '.', to: ' ' },{ from: '-', to: ' ' },]} />
                  </Container>
                  { children }


              </main>
                <footer>
                    <Footer data={footer} />
                </footer>

            </Box>
        </>
    )
}

export default Layout






