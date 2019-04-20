import React from 'react';

export default function Title({title,name}) {
  return (
    <div className='row'>
        <div className='col-10 mx-auto my-2 text-center text-title'>
            <h2 className='text-capitalize font-weight-bold'>
                {title} <strong className='text-blue'>{name}</strong>
            </h2>
        </div>
    </div>
  );
}
