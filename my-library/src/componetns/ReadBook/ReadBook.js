import React, { useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import { RATE_BOOK } from '../../store/actions';

export const ReadBook = ({setMainState}) => {

    let read = JSON.parse(sessionStorage.getItem("read"));
    let rates = JSON.parse(localStorage.getItem('rating'));
    rates = rates? rates.filter(data =>{
       return data.idBook === read.id
    }): null
    let sum = 0
    if(rates){
        rates.forEach( el => {
        sum += el.stars;
    });
    }
    
    const [rating, setRating] = useState(rates? sum/(rates.length) : 0)
    const [comment, setComment] = useState("")

    let jsData = JSON.parse(localStorage.getItem("books"));
    jsData = (!jsData)? null: jsData.filter( data => {
       return data.id === read.id

    })
    const bookRate = {
        size: 60,
        isHalf: true,
        value: rating,
        onChange: (newValue) => {
          setRating(newValue);
        }
      }; 
      const addReview = () => {
          setMainState(RATE_BOOK, {idBook: jsData[0].id, stars: rating, comment: comment})
      }; 

      const handleChangeComment = event => {
        setComment(event.target.value)    
    }; 

     const book = (!jsData)? null:  jsData.map(data => {
        return (
        <div>
            <h1>{data.title}</h1>
            <div className="book-list">
                <img width="300px" src={data.url} alt={data.title} ></img>
                <ListGroup>
                    <ListGroup.Item><b>Title:</b> {data.title}</ListGroup.Item>
                    <ListGroup.Item><b>Author:</b> {data.author}</ListGroup.Item>
                    <ListGroup.Item><b>Publishment year:</b> {data.year}</ListGroup.Item>
                    <ListGroup.Item><b>Genre:</b> {data.genre}</ListGroup.Item  >
                    <ListGroup.Item><ReactStars    edit={false} value={rating} size={60} isHalf={true}/> </ListGroup.Item>
                </ListGroup>
            </div>
            <div>
                    <p>{data.text}</p>
            </div>
        </div>  
        );
    })

    const comments = (!rates)? null: rates.map(data => {
        return (
        <div style={{margin: '10px', border: "thick double #32a1ce"}}>
            <h3>Comment</h3>
            {data.comment}
            <h4>Rating</h4>
            {data.stars}

        </div>  
        );
    })

    return (
        <div>
        {book}
        <Form className="form" >
        <Form.Label>Comment</Form.Label>
            <Form.Control className="form-control text-input" name="comment" as="textarea" rows={5} placeholder="Comment" onChange={handleChangeComment} />
            <ReactStars {...bookRate} />
            <Button className="button" variant="primary" type="button" onClick={addReview}>
                Submit
            </Button>
        </Form>
        {comments}
        </div>
    )
}
