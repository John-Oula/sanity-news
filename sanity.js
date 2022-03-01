const sanityClient = require('@sanity/client')
import Forms from "./Components/Forms";
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import React from 'react'
import InlineVideo from "./Components/InlineVideo";
import imageUrlBuilder from '@sanity/image-url'
import Team from "./Components/Team";
import MediaContainer from "./Components/MediaContainer";
import {createPreviewSubscriptionHook, createClient , createCurrentUserHook} from 'next-sanity'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import PortableText from '@sanity/block-content-to-react'

import { Flex, Wrap, WrapItem, LinkOverlay, Link, Heading, Spacer, Circle, Text, Button, LinkBox } from "@chakra-ui/react";

const config = {
    projectId: 'y90icmhk',
    dataset: 'production',
    apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
    token: 'skNeUUgB7u6JKp9vx4c0pUKrdfdVu4LICnaSVymwPpXsPIwdrskVEig8QhAkrq4aNJMSiFFQTYFk5csX6WoPkE6iZwAi5UvURttmsXF2VsgSz7Qws2rKslmfiMr8e2vlfltovDAaGFhEJ6FYM99ryaijdameQvzxY6OhNh6ixzPrgXwyJ5Jt', // or leave blank for unauthenticated usage
    useCdn: false, // `false` if you want to ensure fresh data
}
export const client = sanityClient(config)


// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)

// Set up the client for fetching data in the getProps page functions
export const sanityPreviewClient = createClient(config)

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: 'skNeUUgB7u6JKp9vx4c0pUKrdfdVu4LICnaSVymwPpXsPIwdrskVEig8QhAkrq4aNJMSiFFQTYFk5csX6WoPkE6iZwAi5UvURttmsXF2VsgSz7Qws2rKslmfiMr8e2vlfltovDAaGFhEJ6FYM99ryaijdameQvzxY6OhNh6ixzPrgXwyJ5Jt',
})

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) => (usePreview ? previewClient : sanityPreviewClient)

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
        block(props) {
            switch (props.node.style) {
                case "h1":
                    console.log(props)
                    return <Heading as={`h1`} pl={5} pr={5}>{props.children}</Heading>
    

                case "h2":
                    return <Heading as={`h2`} pl={5} pr={5}>{props.children}</Heading>

                case "h3":
                    return <Heading as={`h3`} pl={5} pr={5}>{props.children}</Heading>

                case "h4":
                    return <Heading as={`h4`} pl={5} pr={5}>{props.children}</Heading>


                case "blockquote":
                    return <blockquote className="">{props.children}</blockquote>

                case "normal":
                    return <Text pl={5} pr={5}>{props.children}</Text>

                default:
                    return <p className="is-family-secondary">{props.children}</p>
            }
        },
        youtube: ({ node }) => {
            const { url } = node
            const id = getYouTubeId(url)
            return (<YouTube opts={{
                height: 'fit-content',
                width: 'auto',
            }} videoId={id} />)
        },
        inlineVideo: ({ node }) => {


            return (<InlineVideo url={node} />)
        },
        image: ({ node }) => {


            return (<MediaContainer url={node} />)
        },
        forms: ({ node }) => {
            return (<Forms data={node} />)
        },
        teams: ({ node }) => {
            return (<Team data={node} />)
        },


        code: (props) => (
            <pre data-language={props.node.language}>
                <code>{props.node.code}</code>
            </pre>
        ),
    },
    // list: (props) => {
    //     const { type } = props;
    //     const bullet = type === 'bullet';
    //     if (bullet) {
    //       return <ul>{props.children}</ul>;
    //     }
    //     return <ol>{props.children}</ol>;
    //   },
    listItem: (props) => <Flex ml={`5`} alignItems={`center`}><BsFillArrowRightCircleFill color="#1e9339" size={20} />
        <Wrap spacing={0} w={`90%`}>
            <WrapItem>
                <Text as={`list`} fontSize={`md`} ml={4}>{props.children}</Text>
            </WrapItem>
        </Wrap>
    </Flex>,
    marks: {
        // internalLink: ({mark, children}) => {
        //     const {slug = {}} = mark
        //     const href = `/${slug.current}`
        //     return <a href={href}>{children}</a>
        // },

        link: ({ mark, children }) => {
            // Read https://css-tricks.com/use-target_blank/
            const { href } = mark
            return (
                <LinkBox w={`100%`} >
                    <LinkOverlay w={`inherit`} isExternal href={href}>
                        <Flex isTruncated overflow={`break-word`} w={`auto`} isTruncated alignItems={`center`} p={5} boxShadow={`sm`} borderRadius={`10px`}>
                            <Circle bgGradient='linear(to-l, #1e9339, #ffdb58)' size={`24px`} m={2} ></Circle>
                            <Wrap >
                                <WrapItem>

                                    <Text color={`#1e9339`}>{children}</Text>
                                    {/*<ExternalLinkIcon mx='2px' />*/}
                                </WrapItem>
                            </Wrap>
                            <Spacer />
                            <Button color={`white`} bgColor={`#1e9339`}
                            > Visit </Button>


                        </Flex>
                    </LinkOverlay>
                </LinkBox>
            )
        },
        inlineUrl: ({ mark, children }) => {
            // Read https://css-tricks.com/use-target_blank/
            const { blank, href } = mark
            return <Link color={`#1e9339`} isExternal href={href}>{children}</Link>

        },
        color: (props) => {

            return (<Text as={`span`} color={props.mark.hex}>{props?.children}</Text>)
        },
        backgroundColor: (props) => {
            console.log(props)
            return (<Text as={`span`} bgColor={props.mark.hex}>{props?.children}</Text>)
        },
        sectionHeader: (props) => {
            return(<Flex className={'table-title'} w={`100%`} p={0} bgColor={props?.mark?.hex} mt={5} mb={5} alignItems={`center`}><Heading as={`h1`}  >{props.children}</Heading></Flex>)
        }
    },

}


// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source) {
    return builder.image(source)
}


export const RichText = ({ data }) => {
    return (
        <PortableText blocks={data} serializers={serializers} {...config} />
    )
}

