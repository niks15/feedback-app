import { createContext, useState } from "react"

import { v4 as uuidv4} from 'uuid'

import FeedbackData from '../data/feedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ( {children} ) => {

    const [feedback, setFeedback]           = useState(FeedbackData)
    const [feedbackEdit, setFeedbackEdit]   = useState({
        item: {},
        edit: false
    })

    //Add new Feedback
    const handleNewFeedback = (newFeedback) => {

        newFeedback.id = uuidv4()

        setFeedback([newFeedback, ...feedback])
    }

    //Delete Feedback
    const deleteFeedback = (id) => {
        
        if(window.confirm('Sure Delete?')){
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    //Edit Feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    //Update Feedback Item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updItem } : item))
    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            deleteFeedback,
            handleNewFeedback,
            editFeedback,
            updateFeedback
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext