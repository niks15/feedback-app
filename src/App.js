import { useState } from 'react'

import { v4 as uuidv4} from 'uuid'

import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'

import FeedbackData from './data/feedbackData'

function App(){

    const title = 'Blog Post'
    const body = 'This is my blog post'

    const [feedback, setFeedback] = useState(FeedbackData);

    const deleteFeedback = (id) => {
        
        if(window.confirm('Sure Delete?')){
            setFeedback(feedback.filter((item) => item.id != id));
        }
    }

    const handleNewFeedback = (newFeedback) => {

        newFeedback.id = uuidv4()

        setFeedback([newFeedback, ...feedback])
    }

    return (
        <>
            <Header />
            <div className="container">
                <FeedbackForm handleNewFeedback={handleNewFeedback}/>
                <FeedbackStats feedback={feedback}/>
                <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
            </div>
        </>
    )
}

export default App