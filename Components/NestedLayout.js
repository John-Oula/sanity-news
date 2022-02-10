import Head from 'next/head'
import Image from 'next/image'
import {Box, Container, Flex, Heading, Text,} from '@chakra-ui/react'
import Footer from "./Footer";
import {client, toPlainText} from "../sanity";
import NavigationBar from "./NavigationBar";
import React, {useContext, useEffect, useState} from "react";
import NProgress from 'nprogress';
import Router from 'next/router';
import SearchContext from "../contexts/SearchContext";
import Breadcrumbs from 'nextjs-breadcrumbs';
import logo from '../assets/images/logo.jpg'
import {FacebookIcon, FacebookMessengerIcon, InstapaperIcon, LinkedinIcon, TwitterIcon} from "react-share";
import PostCard from "./PostCard";
import Column from "./Column";
import HorizontalCard from "./HorizontalCard";
import TabColumn from "./TabColumn";
import Link from "next/link";

function NestedLayout({children , data}) {



    const headerQuery = `*[_type == "menu" ] {title,_id,slug,submenu,dropdown,list,single,
"category": category->title }`
    const footerQuery = `*[_type == "footer" ] {title,_id,slug }`
    useEffect(() => {

        client.fetch(headerQuery)
            .then((res) => {

                setLinks(res)
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

            <Flex w={`100%`} flexDirection={[`column`,`column`,`row`,`row`,`row`,]}>
                <Flex flexDirection={`column`} w={[`100%`,`100%`,`80%`,`80%`,`80%`,]}>

                    {children}

                </Flex>
                <Flex flexDirection={`column`}  w={[`100%`,`100%`,`20%`,`20%`,`20%`,]} >

                    <Column post={data} key={1} position={10} />
                    <TabColumn post={data} key={2} firstPosition={11} secondPosition={12} />
                    <Column post={data} key={5} position={13} />
                    <Column post={data} key={5} position={14} />

                </Flex>

            </Flex>


        </>
    )
}

export default NestedLayout






