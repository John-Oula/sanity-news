import React from 'react';


import {Box, Image} from '@chakra-ui/react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import {urlFor} from '../sanity'

function Slider({images}) {


    return (

            <Carousel autoPlay={true}  showThumbs={false}>
                {
                    images[0].carousel.map((each) =>{
                        return(

                                <Box w={`100%`} h={`400px`} >
                                    <Image fallbackSrc={`https://via.placeholder.com/200`} src={urlFor(each.image).url()} w={`1800px`} h={`auto`} />
                                </Box>


                        )
                    })
                }


            </Carousel>

    );
}

export default Slider;