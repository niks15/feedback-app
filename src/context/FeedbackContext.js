import { createContext, useEffect, useState } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ( {children} ) => {

    const [isLoading, setIsLoading] = useState(true)

    const [feedback, setFeedback]           = useState([])
    const [feedbackEdit, setFeedbackEdit]   = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        
        //fetch feedback data
        fetchFeedback()

    }, [])

    //Fetches all feedbacks
    const fetchFeedback = async () => {
        
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        
        const data = await response.json()
                
        setFeedback(data)
        setIsLoading(false)
    }

    //Add new Feedback
    const handleNewFeedback = async (newFeedback) => {

        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })

        // newFeedback.id = uuidv4()

        const data = await response.json()

        setFeedback([data, ...feedback])
    }

    //Delete Feedback
    const deleteFeedback = async (id) => {
        
        if(window.confirm('Sure Delete?')){

            await fetch(`/feedback/${id}`, {
                method: `DELETE`
            })

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
    const updateFeedback = async (id, updItem) => {

        const response = await fetch(`/feedback/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item))
    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            isLoading,
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