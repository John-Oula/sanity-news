import React from 'react';
import {client} from "../../sanity";
import {createReadStream} from 'fs'

export default function createUser(req , res) {

    console.log(req.body)
    // client.create({
    //     _type: 'users',
    //     firstName
    // })

}

