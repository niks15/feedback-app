import {useState} from 'react'

import RatingSelect from './RatingSelect'

import Card from './shared/Card'
import Button from './shared/Button'

function FeedbackForm( {handleNewFeedback} ) {

  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setbtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

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