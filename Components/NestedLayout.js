import {Flex,} from '@chakra-ui/react'
import {client} from "../sanity";
import React, {useEffect, useState} from "react";
import TabColumn from "./TabColumn";
import SidebarCard from "./SidebarCard";

function NestedLayout({children , data}) {
    const [post,setPost] = useState([]);

    const sidebar =`
*[_type == "heading" && sidebar == true] {title,position,_id,previewFull,
"posts": *[_type == "post" && references(^._id)]{
              title,slug,body,_id,externalLink,link,
                  "category":category->title,
                  "image":mainImage,
                        "category_slug":category->slug
                       }}`

    useEffect(() => {

                        client.fetch(sidebar)
                            .then(res=>{
                                setPost(res)
                                console.log(res)
                                console.log(post)
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

                    {/*<Column post={data} key={1} position={10} />*/}
                    <TabColumn post={data} key={20} firstPosition={11} secondPosition={12} />
                    {/*<Column post={data} key={5} position={13} />*/}
                    {/*<Column post={data} key={5} position={14} />*/}
                    { post &&
                        post.map(each =>{
                           return( <>
                               <SidebarCard key={each._id} post={each} />
                           </>)
                        })
                    }

                </Flex>

            </Flex>


        </>
    )
}

export default NestedLayout






