import React from 'react'

const EditButton = (props) => {
  return (
    <div className={props.klass} onClick={props.onClick}>
      Edit
    </div>
  )
}

export default EditButton;