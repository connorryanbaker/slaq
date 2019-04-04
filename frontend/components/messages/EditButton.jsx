import React from 'react'

const EditButton = (props) => {
  return (
    <div className={props.klass} onClick={props.onClick}>
      <i class="far fa-edit"></i>
    </div>
  )
}

export default EditButton;