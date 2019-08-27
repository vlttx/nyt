import React from 'react';
import './card.styles.css'


export const Card = (props) => {
	

  return (
    <div className="card-container">
    	<img src={props.mov.multimedia.src}/>
    	<h1> {props.mov.display_title}</h1>
    	<p><a href={props.mov.link.url}>{props.mov.display_title}</a></p>
		<p>{props.mov.summary_short}</p>
    </div>
  );
};

// {`http://covers.openlibrary.org/b/isbn/${iSBN}-S.jpg`} 

	// <img alt="book cover" src={`https://pictures.abebooks.com/isbn/${iSBN}-us.jpg`}/>