import { createContext, useState } from "react";

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {

    const [isVisible, setIsVisible] = useState(false)
    const [modalContent, setModalContent] = useState()

    const openModal = (content) => {
        setModalContent(content);
        setIsVisible(true);
    }

    return (
        <ModalContext.Provider value={{
            isVisible,
            setIsVisible,
            modalContent,
            setModalContent,
            openModal
        }}>
            {children}
        </ModalContext.Provider>
    )
}