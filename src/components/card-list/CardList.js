import React from 'react'
import './CardList.styles.css'


export const CardList = (props) => {
  return (
    <div className="card-list">{props.children}</div>
  );
};