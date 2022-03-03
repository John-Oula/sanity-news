import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'

import { newTheme } from '../theme/theme';

import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../Components/Layout";
import ContextWrapper from "../Components/ContextWrapper";
import ModalContextWrapper from "../Components/ModalContextWrapper";
import 'nextjs-breadcrumbs/dist/index.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <ContextWrapper>
            <ModalContextWrapper>
                <ChakraProvider theme={newTheme}>


                       <Layout>

                           <Component {...pageProps} />

                       </Layout>


                </ChakraProvider>
                </ModalContextWrapper>
            </ContextWrapper>
        </>
    )
}

export default MyApp
