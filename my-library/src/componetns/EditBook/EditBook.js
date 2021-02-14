import { Form, Button } from "react-bootstrap";
import { genresList } from "../genresList";
import React, { useState } from "react";

export const EditBook = ({setMainState, editChoose }) => {

    let current = new Date();  
    let jsData = JSON.parse(localStorage.getItem("books"));
    let book = (!jsData)? null: jsData.filter( data => {

       return data.id === editChoose[1]
    })

    const [title, setTitle] = useState(book[0].title)
    const [author, setAuthor] = useState(book[0].author)
    const [url, setUrl] = useState(book[0].url)
    const [year, setYear] = useState(book[0].year)
    const [genre, setGenre] = useState(book[0].genre)


    const handleEdit = () => {

        book[0].title = title
        book[0].author = author
        book[0].url = url
        book[0].year = year
        book[0].genre = genre  

        localStorage.setItem("books", JSON.stringify(jsData));
    
    }

    const handleChange = ({ target: { name, value } }) => {
        switch ( name ){
            case 'title': 
                setTitle(value)
                break;
            case 'author': 
                setAuthor(value)
                break;
            case 'url': 
                setUrl(value)
                break;
            case 'year': 
                setYear(value)
                break;
            case 'genre': 
                setGenre(value)
                break;
            default:
                break;
        }
    };

    const genresListMaped = genresList.map(el => {
        return(
        <option key={el.id} value={el} onChange={handleChange}>
            {el}
        </option>
        )});

    return (
        <div>
        <Form className="form" onClick={handleEdit}>
            <Form.Group className="form-group">
                <Form.Label>Title</Form.Label>
                <Form.Control className="form-control" name="title" type="text" placeholder="Title of book" value={title}  onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Author</Form.Label>
                <Form.Control  className="form-control" name="author" type="text" placeholder="Author" value={author} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>The year of publishing</Form.Label>
                <Form.Control  className="form-control" name='year' min="0" max={current.getFullYear()} type="number" placeholder="The year of publishing" value = {year} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>URL</Form.Label>
                <Form.Control  className="form-control" name='url' type="url" placeholder="Link to the book cover photo" value = {url} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Genre</Form.Label>
                <Form.Control  className="form-control" name='genre' as="select" placeholder="Genre" onChange={handleChange} required>
                    <option value={genre} onChange={handleChange}>
                        {book[0].genre}
                    </option>
                    {genresListMaped}
                </Form.Control>
            </Form.Group>
            <Button className="button" variant="primary" type="button">
                Edit
            </Button>
        </Form>
        </div>
    );
}