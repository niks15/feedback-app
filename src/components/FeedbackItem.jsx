import {FaTimes} from 'react-icons/fa'

import React, {useState} from 'react'
import Card from './shared/Card';

import PropTypes from 'prop-types'

function FeedbackItem( {item, handleDelete} ) {

  const [rating, setRating] = useState(item.rating);
  const [text, setText] = useState(item.text);

  const handleClick = () => {

      console.log("clicked!");

      setRating( (prev) => {
          return prev + 1;
      });
      setText("Clicked Text");
  }

  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button className="close" onClick={() => handleDelete(item.id)}>
        <FaTimes color='purple' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default FeedbackItem