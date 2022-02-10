import Forms from "./Components/Forms";

const BlockContent = require('@sanity/block-content-to-react')
const sanityClient = require('@sanity/client')
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import React from 'react'
import InlineVideo from "./Components/InlineVideo";

const config = {
    projectId: 'y90icmhk',
    dataset: 'production',
    apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
    token: 'skNeUUgB7u6JKp9vx4c0pUKrdfdVu4LICnaSVymwPpXsPIwdrskVEig8QhAkrq4aNJMSiFFQTYFk5csX6WoPkE6iZwAi5UvURttmsXF2VsgSz7Qws2rKslmfiMr8e2vlfltovDAaGFhEJ6FYM99ryaijdameQvzxY6OhNh6ixzPrgXwyJ5Jt', // or leave blank for unauthenticated usage
    useCdn: false, // `false` if you want to ensure fresh data
}
export const client = sanityClient(config)

import imageUrlBuilder from '@sanity/image-url'
import Team from "./Components/Team";

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
            return (<YouTube videoId={id} />)
        },
        inlineVideo: ({node}) => {


            return (<InlineVideo url={node}/>)
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
}


// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source) {
    return builder.image(source)
}


export const PortableText = ({data}) => {
    return (
        <BlockContent blocks={data} serializers={serializers} {...config} />
    )
}

