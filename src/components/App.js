import React from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//npx json-server --watch movies.json --port 3002 json-server başlatma-start

class App extends React.Component {

    state = {
        movies: [],

        searchQuery: ""
    }

/*     async componentDidMount() {
        const baseURL = "http://localhost:3002/movies";
        const response = await fetch(baseURL);
        console.log(response)
        const data = await response.json();
        console.log(data)
        this.setState({movies: data})
    } */

    async componentDidMount() {
        const response = await axios.get("http://localhost:3002/movies");
        //console.log(response);
        this.setState({movies: response.data})
    }


/*     deleteMovie = (movie) => {
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    }  */

// FETCH API
/*     deleteMovie =  async (movie) => {
        const baseURL = `http://localhost:3002/movies/${movie.id}`
        await fetch(baseURL, {
            method: "DELETE"
        })
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    }  */

    // AXIOS API
    deleteMovie =  async (movie) => {

        axios.delete(`http://localhost:3002/movies/${movie.id}`)
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    } 


    searchMovie = (event) => {
        //console.log(event.target.value)
        this.setState({searchQuery: event.target.value })
    }

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        )

        return (
            <Router>

                <div className="container">

                    <Switch>

                        <Route path="/" exact render={() => (  
                        //İlk bu kısım çalışsın dedik. ve <React.fragment> kullandık jsx hatası almamak için. 
                        //Ana div içine almak(fazladan div yazmaktansa) <React.fragment> içine yazdık ve bu sadece tek yapı haline benzettik.
                        //exact ile http://localhost:3000/add'e girince sadece AddMovie component'indekileri görebilmemizi sağladı. 

                            <React.Fragment> 
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SearchBar searchMovieProp={this.searchMovie} />
                                    </div>
                                </div>
                                <MovieList
                                    movies={filteredMovies}
                                    deleteMovieProp={this.deleteMovie} 
                                />
                            </React.Fragment>
                        )}>
                        </Route>
                    

                        <Route path="/add" component={AddMovie} /> 
                    {/*<Route path="/add"   //Üstteki kısaltılmış hali.>
                            <AddMovie />
                        </Route> */} 
                    </Switch>
                </div> 
                

            </Router>
        )

    }


}

export default App;

