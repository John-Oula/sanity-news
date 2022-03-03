import ModalContext from "../contexts/ModalContext";

import {useState} from "react";

function ModalContextWrapper({children}) {

    const [modalShow, setModalShow] = useState(false);
    const [post, setPost] = useState(false);

    const values = {
        setPost,
        post,
        modalShow,
        setModalShow,
    }
    return (
        <ModalContext.Provider value={values}>
            {children}

        </ModalContext.Provider>
    )

}

export default ModalContextWrapper