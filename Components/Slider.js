import React from 'react';
import {Carousel} from "react-bootstrap";

import {Box, Image} from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {urlFor} from '../sanity'

function Slider({images}) {


    return (

            <Carousel >
                {
                    images[0].carousel.map((each,index) =>{
                        return(
                            <Carousel.Item key={index}>
                                <Box w={`100%`} h={`400px`} overflow={`hidden`} >
                                    <Image fallbackSrc={`https://via.placeholder.com/200`} src={urlFor(each.image).url()} w={`auto`} h={`auto`} />
                                </Box>

                            </Carousel.Item>
                        )
                    })
                }


            </Carousel>

    );
}

export default Slider;