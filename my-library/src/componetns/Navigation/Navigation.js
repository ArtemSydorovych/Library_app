import React, { useState } from "react";
import "./nav.css";
import { Navbar, Form, FormControl, ListGroup, NavDropdown } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AddBook from "../AddBook";
import ShowBooks from "../ShowBooks";
import { CHANGE_FIELD } from "../../store/actions";
import { genresList } from "../genresList";
import ReadBook from "../ReadBook";
import EditBook from "../EditBook";

export const Naviagation = ({ setMainState, search }) => {

    let jsData = JSON.parse(localStorage.getItem("books"));
    const [genre, setGenre] = useState(sessionStorage.getItem("genre"))


    const handleChange = ({ target: { name, value } }) => {
        setMainState(CHANGE_FIELD, { [name]: value });
    };

    const onGenreClick = event => {
        setGenre(event.target.name)
        sessionStorage.setItem("genre", event.target.name )

    };

    const homeClick = () => {
        setMainState(CHANGE_FIELD, { search: '' });
        sessionStorage.clear();
    }
    const genresListMaped = genresList.map(el => {
        return (
            <ListGroup.Item>
                <Link key={el.id} onClick={onGenreClick} name={el} to={"/" + el}>{el}</Link>
            </ListGroup.Item>
        )
    })

    return (
        <Router>
            <Navbar bg="dark" >
                <Navbar.Brand><Link onClick={homeClick} className="fa fa-home home" to="/"></Link></Navbar.Brand>
                <Navbar.Brand><Link className="brand" to="/top-10">TOP-10</Link></Navbar.Brand>
                <Navbar.Brand><Link className="brand" to="/add-book">Add Book</Link></Navbar.Brand>
                <NavDropdown title="Genres" id="basic-nav-dropdown">
                    <ListGroup >
                        {genresListMaped}
                    </ListGroup>
                </NavDropdown>
                <Form inline style={{ marginLeft: "auto" }}>
                    <FormControl value={search} name="search" type="text" placeholder="Search" className="mr-sm-2" onChange={handleChange.bind(search)} />
                </Form>
            </Navbar>
            <Switch>
                <Route exact path="/add-book" component={AddBook} />
                <Route exact path={"/"} component={ShowBooks} />
                <Route exact path={"/" + genre} component={ShowBooks} />
                {(!jsData) ? null : jsData.map(data => {
                    return <Route path={"/" + data.title} component={ReadBook}/>
                })}
                {(!jsData) ? null : jsData.map( (data, id) => {
                   return <Route path={"/edit/" + data.title} component={EditBook} />
                })}

            </Switch>
        </Router>
    );
}