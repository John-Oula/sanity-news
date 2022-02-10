import React from 'react';
import {Flex} from "@chakra-ui/react";
import PostCard from "./PostCard";
import Column from "./Column";
import TabColumn from "./TabColumn";
import HorizontalCard from "./HorizontalCard";


function GridLayout({data}) {

    return (
        <>

            <Flex w={`100%`} flexDirection={[`column`,`column`,`row`,`row`,`row`,]}>
                <Flex flexDirection={`column`} w={[`100%`,`100%`,`80%`,`80%`,`80%`,]}>
                    <Flex flexDirection={[`column`,`column`,`row`,`row`,`row`,]}>
                        <PostCard post={data} position={1}/>
                        <Column post={data}  position={2}/>
                    </Flex>

                    <HorizontalCard position={3} post={data}/>
                    <HorizontalCard position={4} post={data}/>
                    <HorizontalCard position={5} post={data}/>
                </Flex>
                <Flex flexDirection={`column`}  w={[`100%`,`100%`,`20%`,`20%`,`20%`,]} >

                    <Column post={data} key={1} position={10} />
                    <TabColumn post={data} key={2} firstPosition={11} secondPosition={12} />
                    <Column post={data} key={5} position={13} />
                    <Column post={data} key={5} position={14} />

                </Flex>

            </Flex>


        </>

    );
}

export default GridLayout;