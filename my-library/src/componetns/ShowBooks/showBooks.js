import React from 'react'
import "./showBooks.css"

export const showBooks = ({genreSearch}) => {
    
    let jsData = JSON.parse(localStorage.getItem("books"));

    jsData = (!jsData)? null: jsData.filter( data => {
       if(genreSearch)
       return data.genre === genreSearch
       else 
        return data
    })


    const listItems = (!jsData)? null:  jsData.map(data => {

        return (
        <div className="book-list">
            <img width="150px" src={data.url} alt={data.title} ></img>
            <ul>
                <li><b>Title:</b> {data.title}</li>
                <li><b>Author:</b> {data.author}</li>
                <li><b>Publishment year:</b> {data.year}</li>
                <li><b>Genre:</b> {data.genre}</li>
            </ul>
        </div>

        );
    })
    return (
        <div>
            {listItems}
        </div>
    )
}
