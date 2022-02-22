import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'

import { newTheme } from '../theme/theme';

import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../Components/Layout";
import ContextWrapper from "../Components/ContextWrapper";
import 'nextjs-breadcrumbs/dist/index.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <ContextWrapper>
                <ChakraProvider theme={newTheme}>


                       <Layout>

                           <Component {...pageProps} />

                       </Layout>


                </ChakraProvider>
            </ContextWrapper>
        </>
    )
}

export default MyApp
