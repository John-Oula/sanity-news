import React ,{useContext, useState}from 'react';
import {Box, Button, Image} from "@chakra-ui/react";
import {RichText, toPlainText, urlFor} from "../sanity";
import ModalContext from '../contexts/ModalContext';

function Card({post}) {
    const [extend ,setExtend] = useState();
    const {modalShow, setModalShow ,setPost} = useContext(ModalContext)

    const handleClick = () =>{
        setPost(post)
        setModalShow(true)
    }


    return (
        <Box boxShadow={`lg`} maxW='sm' h={ `fit-content` }  borderWidth='1px' borderRadius='lg' overflow='hidden'>
            {post?.cover_image?.asset &&
            <Image fallbackSrc={`https://via.placeholder.com/200`} src={urlFor(post?.cover_image)?.url()}
                   w={`100%`} h={`100%`}/>}


            <Box p='6'>
                <Box display='flex' alignItems='baseline'>

                </Box>

                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'

                >
                    {post?.company}
                </Box>
                <Box
                    mt='1'
                    fontWeight='light'
                    as='h6'
                    lineHeight='tight'

                >
                    {
                        extend ?
                            <>
                                {post?.body && <RichText data={post?.body}/>}
                            </>
                            :

                   <>
                       {toPlainText(post?.body)?.substring(0, 200)} ...

                   </>
                    }



                </Box>

                <Button mt={2} w={`100%`} bgColor={`#ffdb58`}
                        onClick={handleClick}>More </Button>
            </Box>
        </Box>
    );
}

export default Card;