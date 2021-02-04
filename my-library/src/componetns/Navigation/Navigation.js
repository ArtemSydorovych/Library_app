import React, { useEffect } from "react";
import "./nav.css";
import { Navbar, Form, FormControl, Button, ListGroup, NavDropdown } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AddBook from "../AddBook";
import showBooks from "../ShowBooks";
import { CHANGE_FIELD } from "../../store/actions";
import history from "../../history"

 const genresList = ["Fantasy",
        "Adventure",
        "Romance",
        "Contemporary",
        "Dystopian",
        "Mystery",
        "Horror",
        "Thriller",
        "Paranormal",
        "Historical fiction",
        "Science Fiction",
        "Memoir",
        "Cooking",
        "Art",
        "Self-help / Personal",
        "Development",
        "Motivational",
        "Health",
        "History",
        "Travel",
        "Guide / How-to",
        "Families & Relationships",
        "Humor",
        "Children’s"]

 

export const Naviagation = ({ setMainState, genreSearch, search }) => {

    const handleClickOnGenre = ({ target: {name, value }}) => {
        console.log(genreSearch);
        setMainState(CHANGE_FIELD, { [name]: value});
        console.log(genreSearch);

    };



    const homeClick = () => {
        setMainState(CHANGE_FIELD, {genreSearch: ''});
    }
    

    useEffect(() => {
        document.title = genreSearch;
      });
  
    const genresListMaped = genresList.map(el => {
    return(
    <ListGroup.Item action onClick={handleClickOnGenre} name="genreSearch" value={el}>
        {el}
    </ListGroup.Item>
  )
  })

    const handleSubmitSearch = () => {

    }
    
    const handleChange = ({ target: { name, value } }) => {
        setMainState(CHANGE_FIELD, { [name]: value });
    };

    return (
        <Router>
            <Navbar bg="dark" >
                <Navbar.Brand><Link onClick={homeClick} className="fa fa-home home" to="/"></Link></Navbar.Brand>
                <Navbar.Brand><Link className="brand" to="/top-10">TOP-10</Link></Navbar.Brand>
                <Navbar.Brand><Link className="brand" to="/add-book">Add Book</Link></Navbar.Brand>
                <NavDropdown title="Genres" id="basic-nav-dropdown">
                    <ListGroup >
                    <Link to={"/"+genreSearch}>{genresListMaped}</Link>
                    </ListGroup>
                </NavDropdown>
                <Form inline style={{ marginLeft: "auto" }} onSubmit={handleSubmitSearch}>
                    <FormControl value={search} name="search" type="text" placeholder="Search" className="mr-sm-2" onChange={handleChange.bind(search)} />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
            <Switch>
                <Route exact path="/add-book" component={AddBook} />
                <Route exact path="/" component={showBooks} />
                <Route exact path={"/"+genreSearch} component={showBooks} />
            </Switch>
        </Router>
    );
}