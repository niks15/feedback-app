import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext';

import PropTypes from 'prop-types'

function FeedbackStats() {

  const {feedback} = useContext(FeedbackContext)

  let average = feedback.reduce( (acc, cur) => {
    
    return acc + cur.rating;
  }, 0) / feedback.length;

  average = average.toFixed(1).replace(/[.,]0$/, '');

  return (
    <div className='feedback-stats'>
      <h4>Feedbacks: {feedback.length}</h4>
      <h4>Average Rating: {isNaN(average) ? "N/A" : average}</h4>
    </div>
  )
}

// FeedbackStats.propTypes = {
//     feedback: PropTypes.array.isRequired
// }

export default FeedbackStats
