import { Form, Button } from "react-bootstrap";
import "./addBook.css";
import { ADD_BOOK, CHANGE_FIELD} from "../../store/actions"



export const AddBook = ({setMainState, title, author, genre, year, url ,text }) => {


    let current = new Date();

    const handleSubmit = () => {
        setMainState(ADD_BOOK, {title, author, genre, year, url ,text});
    }

    const handleChange = ({ target: { name, value } }) => {
        setMainState(CHANGE_FIELD, { [name]: value });
    };

    return (
        <div>
        <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="form-group">
                <Form.Label>Title</Form.Label>
                <Form.Control className="form-control" name="title" type="text" placeholder="Title of book" value={title}  onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Author</Form.Label>
                <Form.Control  className="form-control" name="author" type="text" placeholder="Author" value={author} onChange={handleChange.bind(author)}/>
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
                <Form.Control  className="form-control" name='genre' type="text" placeholder="Genre" value = {genre} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Text</Form.Label>
                <Form.Control className="form-control text-input" name="text" as="textarea" rows={5} placeholder="Text" onChange={handleChange}/>
            </Form.Group>
            <Button className="button" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    );
}