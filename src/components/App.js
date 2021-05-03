import React from 'react'; //App react component olduğu için bu kodun yazılması gereklidir.
import SearchBar from './SearchBar';
import MovieList from './MovieList';

//İlerde bu film sayısı -değişebileceği- için bu movies state içerisine almamız gerekir.

class App extends React.Component { //Herşeyi App Component içine yazıyoruz.

    state = {// state bir objedir ve İçerisinde yazılanda movies: property şeklinde gelir.
        movies: [ ],//Static alma kısmı bitti fetch fonksiyonu kullanıcaz componentDidMount() içinde

        searchQuery: ""
    }

    async componentDidMount() {
        const baseUrl= "http://localhost:3002/movies";
        const responce = await fetch(baseUrl); //fetch: asenkron olarak network sorguları yapmamızı sağlayan bir js fonksiyonudur. 
        //componentDidMount basına async ekliyoruz. fetch ve responce basına await ekliyoruz. fetch Promise tabanlıdır.
        console.log(responce); // çıktısı Response {type: "cors", url: "http://localhost:3002/movies", redirected: false, status: 200, ok: true, …}
        const data = await responce.json(); //(6) [{…}, {…}, {…}, {…}, {…}, {…}]  0: {id: 1, name: "The Flash", rating: 8.3, overview: "This is a wider card w ... 
        console.log(data); 
        //bu datayı state içindeki movies nasıl aktarabilir udpate edebilir? setState ile
        this.setState({movies: data});
    }


    //Delete fonksiyonu App.js içine yazıyoruz. Arrow func yaptık.
    //Bir filmi sildikten sonra kalan filmler için yeni bir liste oluşturuyoruz. Bunu filter metodu kullanıcaz.
    //Parent componentteki deleteMovie fonksiyonu child componentte aktarmanın en kolay yolu props hale getirmek.
    deleteMovie = (movie) => {
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id //m.id eşit olmayacak movie.id'ye
        );

        //Burdaki yeni movie listesini yukardaki movies'e dönüştürücez.
        /*this.setState({
            movies: newMovieList
        })*/ //Bu şekildeki yazım önceki state durumumuz boş bir array olduğunda kullanımı tercih edilir.

        //İçeriğimiz boş bie array değil var olan filmler üzerinden güncelliyoruz kendi yeni listemizi
        //bunun için var olan state'i parametre olarak alıcaz. Var olan state'i güncellicez.
        this.setState(state => ({
            movies: newMovieList
        }))
    }

    searchMovie = (event) => {
        console.log(event.target.value);
        this.setState({searchQuery: event.target.value})// Buraya gelen değer searchQuery property'sine update etmek istiyoruz.
             
    }


    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                //return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
                return movie.name.toLowerCase().includes(this.state.searchQuery.toLowerCase());
            }
        )

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar 
                            searchMovieProp={this.searchMovie}
                        />
                    </div>
                </div>

                <MovieList 
                    movies={filteredMovies} // this.state.movies yukardaki movies'lere böyle ulaştık. Onuda sonra filteredMovies' çevirdik.
                    deleteMovieProp={this.deleteMovie}
                />
            </div>
        )
    }

}

export default App;