import React from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//json-server başlatma-start:  npx json-server --watch src/api/movies.json --port 3002

class App extends React.Component {

    state = {
        //property olarak geliyor movies o yüzden : yazıyoruz. 
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
        this.setState({ movies: response.data })
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

    // AXIOS API DELETE MOVIE
    deleteMovie = async (movie) => {

        axios.delete(`http://localhost:3002/movies/${movie.id}`)
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    }

    //SEARCH MOVIE
    searchMovie = (event) => {
        //console.log(event.target.value)
        this.setState({ searchQuery: event.target.value })
    }

    //ADD MOVIE
    addMovie = async (movie) => {
        await axios.post(`http://localhost:3002/movies/`, movie)
        console.log("movie: ", movie); //çıktısı movie:  {name: "sa"}   //add movie form'da ne yazdıysan movie'ye geliyor.
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }))
    }

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }).sort((a, b) => {
                return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
                //1 gelince 2.yi getir. -1 ile 1.yi getir demek. idler işetse 0
                //en son eklediğim listenin başında gözükmesi için bu kod yazıldı. 6:10
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
                                        <SearchBar
                                            searchMovieProp={this.searchMovie}
                                        />
                                    </div>
                                </div>
                                <MovieList
                                    movies={filteredMovies}
                                    deleteMovieProp={this.deleteMovie}
                                />
                            </React.Fragment>
                        )}>
                        </Route>

                        <Route path="/add" exact render={({ history }) => (

                            <AddMovie
                                onAddMovie={(movie) => {
                                    this.addMovie(movie)
                                    history.push("/") //http://localhost:3000/add içinde Add Movie butonuna basınca ana sayfaya gitmesi için bu kod yazıldı. https://reactrouter.com/web/api/history
                                }}
                            />
                        )}>
                        </Route>

                        <Route path="/edit/:id" component={EditMovie}>
                        </Route>

                    </Switch>
                </div>


            </Router>
        )

    }


}

export default App;

