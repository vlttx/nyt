import React from 'react'
import './CardList.styles.css'
import { Card } from '../card/Card'


export const CardList = (props) => {
  return (

    <div className="card-list">{props.reviews.map((review, index) =><Card mov={review} key={index}/>)}</div>
  );
};