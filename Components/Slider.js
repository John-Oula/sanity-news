import React from 'react';


import {Box, Image,Flex,Center} from '@chakra-ui/react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import {urlFor} from '../sanity'

function Slider({images}) {



    return (

            <Carousel infiniteLoop={true}  autoPlay={true}  showThumbs={false}>
                 
                {
                    images?.carousel.map((each) =>{
                        return(

                          <>
                            <Center w={`100%`} overflow={`hidden`} h={`500px`} >
                            { each.image?.url.split('/')[ each.image?.url.split('/').length - 1].split('.')[1] === 'mp4' ?
                                   <video loop={true} key={'slider_'+ each?.url}   src={each.image?.url} autoPlay={true} w={`100%`} h={`auto`} /> 
                                :
                                <>
                                                               
                                                               <Image  key={'slider_'+ each?.url} fallbackSrc={`https://via.placeholder.com/200`} src={each.image?.url} w={`100%`} h={`auto`} /> 
                                

                                </>
                            }
                                   </Center>
                          </>

                        )
                    })
                }


            </Carousel>

    );
}

export default Slider;