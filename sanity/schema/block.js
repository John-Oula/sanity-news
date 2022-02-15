/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

import React from 'react'


// function Team({data}) {
//   console.log(data)
//
//   return (
//       <div >
//         {
//           data?.members.map(each =>{
//             return(
//                 <div>
//                   <div overflow={`hidden`} size={`150pt`}>
//                     {/*<img src={urlFor(each?.image).url()} width={`auto`} h={`auto`} fallbackSrc={`https://via.placeholder.com/200`} />*/}
//                   </div>
//                   <p mt={5} size={`md`} as={`h5`}>{each?.name}</p>
//                   <p fontSize={`sm`}> {each?.description}</p>
//
//                 </div>
//             )
//           })
//         }
//
//
//
//
//       </div>
//   );
// }
const teamRender = props => (
    <span style={{ backgroundColor: 'yellow' }}>Team box</span>
)
export default {
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        {
            title: 'Block',
            type: 'block',
            of:[
                {
                    name: "inlineVideo",
                    type: "file",
                    title: "Inline Video Player",
                    options:{
                        accept:"video/*",
                    },
                },
                {
                    type: 'youtube'
                },

            ],


            // Styles let you set what your user can mark up blocks with. These
            // correspond with HTML tags, but you can set any title or value
            // you want and decide how you want to deal with it where you want to
            // use your content.
            styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H1', value: 'h1'},
                {title: 'H2', value: 'h2'},
                {title: 'H3', value: 'h3'},
                {title: 'H4', value: 'h4'},
                {title: 'Quote', value: 'blockquote'},
            ],
            lists: [{title: 'Bullet', value: 'bullet'}],
            // Marks let you mark up inline text in the block editor.
            marks: {
                // Decorators usually describe a single property – e.g. a typographic
                // preference or highlighting by editors.
                decorators: [
                    { "title": "Strong", "value": "strong" },
                    { "title": "Emphasis", "value": "em" },
                    { "title": "Code", "value": "code" },
                    { "title": "Underline", "value": "underline" },
                    { "title": "Strike", "value": "strike-through" },
                    // {title: 'Video', value: 'video', blockEditor: {
                    //   icon: highlightIcon,
                    //     render: videoField
                    //   }},
                ],
                // Annotations can be any object structure – e.g. a link or a footnote.
                annotations: [
                    {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                            {
                                title: 'URL',
                                name: 'href',
                                type: 'url',
                            },
                        ],
                    },

                ],
            },
        },
        // You can add additional types here. Note that you can't use
        // primitive types such as 'string' and 'number' in the same array
        // as a block type.
        {
            type: 'image',
            options: {hotspot: true},
        },
        {
            name: "forms",
            type: "object",
            title: "Forms",

            fields: [
                {
                    name: 'forms',
                    title: 'Which form would you like to reference?',
                    type: 'reference',
                    to: [{ type: 'forms' }]

                },
            ],




        },
        {
            name: "teams",
            type: "object",
            title: "Team",
            icon: () => 'T',
            render: teamRender,
            fields: [
                {
                    name: 'teamMember',
                    title: 'Add team members',
                    type: 'array',
                    of: [{ type: 'reference',to:[{type:'team'}] }]

                },
            ],




        }
    ],
}
