import {useState, useContext, useEffect} from 'react'

import RatingSelect from './RatingSelect'

import FeedbackContext from '../context/FeedbackContext'

import Card from './shared/Card'
import Button from './shared/Button'

function FeedbackForm() {

  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setbtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const {handleNewFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit === true){
        setbtnDisabled(false)
        setText(feedbackEdit.item.text)
        setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
      if(text === ''){
          setbtnDisabled(true)
          setMessage(null)
      }
      else if(text !== '' && text.trim().length <= 10){
          setbtnDisabled(true)
          setMessage("Text must be atleast 10 characters")
      }
      else{
        setbtnDisabled(false)
        setMessage(null)
      }

      setText(e.target.value)
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    if(text.trim().length <= 10)
        return;
    
    const newFeedback = {
        text,
        rating,
    }

    if(feedbackEdit.edit === true){
        updateFeedback(feedbackEdit.item.id, newFeedback)
    }
    else
        handleNewFeedback(newFeedback)

    setText('')
  }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>Rate your service</h2>

            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className='input-group'>
                <input 
                    type="text" 
                    placeholder='Add a review' 
                    onChange={handleTextChange}
                    value={text}/>
                <Button type='submit' isDisabled={btnDisabled}>Send</Button>
            </div>

            {message && <div className='message'>{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm