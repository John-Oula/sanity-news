import { Center, Heading } from '@chakra-ui/react';
import React from 'react';
import Post from './Post';

function List({posts}) {

    return (
        <>
            {
              posts?.map((each) => {
                    return (
                        <Post   key={each._id} data={each} />
                    )
                })
            
                
            }

        </>
    );
}

export default List;