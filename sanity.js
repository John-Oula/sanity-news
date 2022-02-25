import Forms from "./Components/Forms";
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import React from 'react'
import InlineVideo from "./Components/InlineVideo";
import imageUrlBuilder from '@sanity/image-url'
import Team from "./Components/Team";
import MediaContainer from "./Components/MediaContainer";

import Link from "next/link";
import PortableText  from '@sanity/block-content-to-react'
const sanityClient = require('@sanity/client')
import {Box, Flex,LinkOverlay, Heading,Spacer, Circle, Text, Button, LinkBox} from "@chakra-ui/react";

const config = {
    projectId: 'y90icmhk',
    dataset: 'production',
    apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
    token: 'skNeUUgB7u6JKp9vx4c0pUKrdfdVu4LICnaSVymwPpXsPIwdrskVEig8QhAkrq4aNJMSiFFQTYFk5csX6WoPkE6iZwAi5UvURttmsXF2VsgSz7Qws2rKslmfiMr8e2vlfltovDAaGFhEJ6FYM99ryaijdameQvzxY6OhNh6ixzPrgXwyJ5Jt', // or leave blank for unauthenticated usage
    useCdn: false, // `false` if you want to ensure fresh data
}
export const client = sanityClient(config)

export function toPlainText(blocks = []) {
    return blocks
        // loop through each block
        ?.map(block => {
            // if it's not a text block with children,
            // return nothing
            if (block._type !== 'block' || !block.children) {
                return ''
            }
            // loop through the children spans, and join the
            // text strings
            return block.children.map(child => child.text).join('')
        })
        // join the paragraphs leaving split by two linebreaks
        .join('\n\n')
}

const serializers = {

    types: {
        youtube: ({node}) => {
            const { url } = node
            const id = getYouTubeId(url)
            return (<YouTube  opts = {{
                height: 'fit-content',
                width: 'auto',
            }} videoId={id} />)
        },
        inlineVideo: ({node}) => {


            return (<InlineVideo url={node}/>)
        },
        image: ({node}) => {


            return (<MediaContainer url={node}/>)
        },
        forms: ({node}) => {
            return (<Forms data={node}/>)
        },
        teams: ({node}) => {
            return (<Team data={node}/>)
        },

        code: (props) => (
            <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
        ),
    },
    marks: {
        // internalLink: ({mark, children}) => {
        //     const {slug = {}} = mark
        //     const href = `/${slug.current}`
        //     return <a href={href}>{children}</a>
        // },
        link: ({mark, children}) => {
            // Read https://css-tricks.com/use-target_blank/
            const { blank, href } = mark
            return blank ?
                <a style={{ color:'#1e9339'}} href={href} target="_blank" rel="noopener">{children}</a>
                :
                <LinkBox  w={`100%`} >
                                    <LinkOverlay isExternal href={href}>
                                    <Flex overflow={`break-word`} w={`auto`} isTruncated alignItems={`center`} p={5} boxShadow={`lg`} borderRadius={`10px`}>
                    <Circle bgGradient='linear(to-l, #1e9339, #ffd24a)' size={`24px`} m={2} ></Circle>
                    <Text color={`#1e9339`}>{children}</Text>
                        {/*<ExternalLinkIcon mx='2px' />*/}
                    <Spacer />
                    <Button colorScheme={`green`}
                          > Visit </Button>


                </Flex>
                                    </LinkOverlay>
                                    </LinkBox>
                
        },

    },
    // block:{
    //     h4: ({children}) => {
    //         console.log(children)
    //         return (<Heading  color={`#1e9339`}>{children}</Heading>)
    //     },
    // },
}


// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source) {
    return builder.image(source)
}


export const RichText = ({data}) => {
    return (
        <PortableText  blocks={data} serializers={serializers} {...config} />
    )
}

