import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

import {Box, Image} from '@chakra-ui/react'


import {urlFor} from '../sanity'

function Slider({images}) {


    return (

            <Carousel >
                {
                    images[0].carousel.map((each) =>{
                        return(
                            <Carousel.Item width={`100%`} key={each._id}>
                                <Box w={`100%`} h={`400px`} >
                                    <Image fallbackSrc={`https://via.placeholder.com/200`} src={urlFor(each.image).url()} w={`1800px`} h={`auto`} />
                                </Box>

                            </Carousel.Item>
                        )
                    })
                }


            </Carousel>

    );
}

export default Slider;