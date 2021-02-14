import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CHANGE_FIELD } from "../../store/actions";
import "./ShowBooks.css";

export const ShowBooks = ({
  setMainState,
  genreSearch,
  search,
}) => {
  let jsData = JSON.parse(localStorage.getItem("books"));
  const [state, setState] = React.useState("");

  jsData = !jsData
    ? null
    : jsData.filter((data) => {
        if (genreSearch && search)
          return (
            data.genre === genreSearch &&
            (data.title.toLowerCase().includes(search.toLowerCase()) ||
              data.author.toLowerCase().includes(search.toLowerCase()))
          );
        else if (search)
          return (
            data.title.toLowerCase().includes(search.toLowerCase()) ||
            data.author.toLowerCase().includes(search.toLowerCase())
          );
        else if (genreSearch) return data.genre === genreSearch;
        else return data;
      });

  const deleteBook = (event) => {
    let book = !jsData
      ? null
      : jsData.findIndex((data) => {
          return event.target.value === data.id.toString();
        });
    if (book !== -1) {
      jsData.splice(book, 1);
      localStorage.setItem("books", JSON.stringify(jsData));
      setState(0);
    }
  };

  const editBook = (event) => {
    let book = !jsData
      ? null
      : jsData.find((data) => {
        return event.target.value === data.id.toString();
        });
    setMainState(CHANGE_FIELD, {editChoose: [book.title, book.id]})
    
    if (book !== -1) {
      localStorage.setItem("books", JSON.stringify(jsData));
      setState(0);
    }
  };

  const readBook = (value) => {
    let book = !jsData
      ? null
      : jsData.find((data) => {
          return value === data.title;
        });
    setMainState(CHANGE_FIELD, { readChoose: [book.title, book.id] });
  };

  const listItems = !jsData
    ? null
    : jsData.map((data) => {
        return (
          <div className="book-list">
            <img width="300px" src={data.url} alt={data.title}></img>
            <ListGroup>
              <ListGroup.Item>
                <b>Title:</b> {data.title}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Author:</b> {data.author}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Publishment year:</b> {data.year}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Genre:</b> {data.genre}
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  to={"/" + data.title}
                  onClick={() => readBook(data.title)}
                  value={data.title}
                  className="btn"
                >
                  <Button>Read</Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn" onClick={deleteBook} value={data.id}>
                  Delete
                </Button>
                <Link
                  to={"/edit/" + data.title}
                  className="btn"
                >
                  <Button
                  value={data.id}
                  name={data.title}
                  onClick={editBook}
                  >
                    Edit
                  </Button>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
        );
      });
  return <div>{listItems}</div>;
};
