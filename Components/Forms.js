
import React, {useState} from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import {Box, Button,Textarea , Flex, FormControl,Checkbox, FormLabel, Input, InputGroup, Select} from "@chakra-ui/react";
import {client} from "../sanity";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import blockTools from '@sanity/block-tools'
import Schema from '@sanity/schema'
import blockContent from '../sanity/schema/block'
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false })

function Forms({data}) {
    const router = useRouter()
    const {handleSubmit, register} = useForm();
    const [loading, setLoading] = useState();
    const [editor, setEditor] = useState(EditorState.createEmpty());

    const schema = Schema.compile({
        name: "schema",
        types:
            [{
            name: 'company',
            title: 'Companies & Organizations',
            type: 'object',
            fields: [
                {
                    name: 'company',
                    type: 'string',
                },
                {
                    name: 'category',

                    type: 'string',
                },
                {
                    name: 'website',

                    type: 'string',
                },

                {
                    name: 'logo',

                    type: 'image',
                },

                {
                    name: 'cover_image',

                    type: 'image',
                },
                {
                    name: 'intro_image',

                    type: 'image',
                },
                {
                    name: 'body',
                    title: 'Body',
                    type: 'array',
                    of: [{type: 'block'}]
                },
                {
                    name: 'summary',

                    type: 'string',
                },

                {
                    name: 'description',

                    type: 'string',
                },
                {
                    name: 'contact',

                    type: 'string',
                },
                {
                    name: 'phone',

                    type: 'string',
                },

                {
                    name: 'email',

                    type: 'string',
                },
                {
                    name: 'street',

                    type: 'string',
                },
                {
                    name: 'postcode',

                    type: 'string',
                },
                {
                    name: 'city',

                    type: 'string',
                },
                {
                    name: 'country',

                    type: 'string',
                },


            ],
        }]
    })

    const editorText = (editorState) =>{
        setEditor(editorState)

    }

    const onSubmit = async (values) => {
        console.log(data)

        setLoading(true)


        if (data?.formType === 'cv-form' || data?.formType === 'users') {
            const cv = formData.cv[0]
            await client.create({
                ...formData,
                _type: data?.formType === 'cv-form' ? 'cv_upload' : data?.formType === 'companies-form' ? 'company' : 'users'
            })
                .then(response => {
                    console.log(response)
                    return client.assets
                        .upload('file', cv, {
                            filename: cv.name
                        })
                        .then(asset => {
                            // Here you can decide what to do with the returned asset document.
                            // If you want to set a specific asset field you can to the following:
                            console.log(asset)
                            if (data?.formType === 'cv-form') {
                                const motivationLetter = formData.motivation_letter[0]
                                return client.assets
                                    .upload('file', motivationLetter, {
                                        filename: motivationLetter.name
                                    })
                                    .then(newAsset => {
                                        console.log(newAsset)
                                        return client
                                            .patch(response._id)
                                            .set({
                                                motivation_letter: {
                                                    _type: 'file',
                                                    asset: {
                                                        _type: "reference",
                                                        _ref: newAsset._id
                                                    }
                                                }
                                                , cv: {
                                                    _type: 'file',
                                                    asset: {
                                                        _type: "reference",
                                                        _ref: asset._id
                                                    }
                                                }
                                            })
                                            .commit()

                                    })
                                    .then(() => router.push('/post/message'))
                                    .catch(error => {
                                        setLoading(false)
                                    })

                            } else return client
                                .patch(response._id)
                                .set({
                                    cv: {
                                        _type: 'file',
                                        asset: {
                                            _type: "reference",
                                            _ref: asset._id
                                        }
                                    }
                                })
                                .commit()
                                .then(() => {
                                    setLoading(false)
                                    router.push('/post/message')
                                })
                                .catch(error => {
                                    setLoading(false)
                                })
                        })
                        .catch(error => {
                            setLoading(false)
                        })
                })
                .catch(error =>{
                setLoading(false)
            })

        }
        else if (data?.formType === 'companies-form' ){
            console.log('company')

            // The compiled schema type for the content type that holds the block array
            const blockContentType = schema.get('company')
                .fields.find(field => field.name === 'body').type

            // convert to html
            const html =  draftToHtml(convertToRaw(editor.getCurrentContent()))

            const blocks = blockTools.htmlToBlocks(html, blockContentType)


            const formData = Object.assign(values,{"body":blocks})
            console.log(formData)

            const logo = formData.logo[0]
            const intro_image = formData.intro_image[0]
            const cover_image = formData.cover_image[0]

            const company =  await client.create({...formData, _type: 'company'})
            const intro_image_upload = await client.assets.upload('image', intro_image, {filename: intro_image.name})
            const logo_upload = await client.assets.upload('image', logo, {filename: logo.name})
            const cover_image_upload = await client.assets.upload('image', cover_image, {filename: cover_image.name})

            Promise.all([company,logo_upload,cover_image_upload,intro_image_upload])
                .then(response =>{
                    console.log(response)

                    return client
                        .patch(response[0]._id)
                        .set({
                            logo: {
                                _type: 'image',
                                asset: {
                                    _type: "reference",
                                    _ref: response[1]._id
                                }
                            }
                            , cover_image: {
                                _type: 'image',
                                asset: {
                                    _type: "reference",
                                    _ref: response[2]._id
                                }
                            }
                            , intro_image: {
                                _type: 'image',
                                asset: {
                                    _type: "reference",
                                    _ref: response[3]._id
                                }
                            }
                        })
                        .commit()
                        .then(res =>{
                            console.log(res)
                            setLoading(false)
                        })
                        .catch(error =>{
                            console.log(error)
                            setLoading(false)
                        })

                })
                .catch(error =>{
                    console.log(error)
                    setLoading(false)
                })

        }
        else if (data?.formType === 'contact-us' ){
            fetch('/api/mail', {
                method: 'post',
                body: JSON.stringify(values)
            })
                .then(data =>{

                    setLoading(false)
                }) .catch(error =>{

                    setLoading(false)
                })
        }
        else  null
    }

    return (
        <Flex flexDirection={`column`}>

            <FormControl>
                {
                    data?.fields?.map((each, index) => {
                        return (
                            <Box key={each._key}>
                                <FormLabel>
                                    {each.title}
                                </FormLabel>
                                {
                                    each?.fieldType === 'select' ?
                                        <>
                                            <Select {...register(each?.slug?.current)} placeholder='Select option'>
                                                {each.selectOptions.map((option) => (

                                                    <option key={option._key}
                                                            value={option?.title}>{option?.title}</option>


                                                ))}
                                            </Select>
                                        </>
                                        :
                                        each?.fieldType === 'text' ?


                                            <>
                                                <Input  {...register(each?.slug?.current)} type={`text`}/>
                                            </>

                                            :
                                            each?.fieldType === 'file' ?
                                                <InputGroup>

                                                    <Input  {...register(each?.slug?.current)} type={`file`}/>
                                                </InputGroup>
                                                :
                                                each?.fieldType === 'checkbox' ?
                                                    <>

                                                        {each.checkboxOptions.map((option) => (
                                                            <InputGroup key={option._key} {...register(option?.title)}>
                                                                <Checkbox>{option?.title}</Checkbox>
                                                            </InputGroup>


                                                        ))}

                                                    </>
                                                    :
                                                    each?.fieldType === 'text-editor' ?
                                                    <>

                                                        <Editor editorState={editor} onEditorStateChange={editorText} />


                                                    </>
                                                        :
                                                    each?.fieldType === 'textarea' ?
                                                    <>


                                                            <Textarea   {...register(each?.slug?.current)} laceholder='Type your message here..'/>



                                                    </>
                                                    :
                                                    <></>
                                }

                            </Box>
                        )
                    })
                }

            </FormControl>

            <Button colorScheme={`green`} isLoading={loading} value={`submit`} type={`submit`}
                    onClick={handleSubmit(onSubmit)}> Submit </Button>


        </Flex>
    );
}

export default Forms;