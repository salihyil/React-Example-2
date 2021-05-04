import React from 'react'; //App react component olduğu için bu kodun yazılması gereklidir.
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from 'axios';
require('dotenv').config();

//İlerde bu film sayısı -değişebileceği- için bu movies state içerisine almamız gerekir.

class App extends React.Component { //Herşeyi App Component içine yazıyoruz.

    state = {// state bir objedir ve İçerisinde yazılanda movies: property şeklinde gelir.
        movies: [ ],//Static alma kısmı bitti fetch fonksiyonu kullanıcaz componentDidMount() içinde

        searchQuery: ""
    }

    /* FETCH ile yapılan GET request 
    async componentDidMount() {
        const baseUrl= "http://localhost:3002/movies";//fake rest api çalıştırdığımız için terminalden npx json-server --watch .\src\api\movies.json --port 3002 ile çalıştırmamız lazım.
        const responce = await fetch(baseUrl); //fetch: asenkron olarak network sorguları yapmamızı sağlayan bir js fonksiyonudur. 
        //componentDidMount basına async ekliyoruz. fetch ve responce basına await ekliyoruz. fetch Promise tabanlıdır.
        console.log(responce); // çıktısı Response {type: "cors", url: "http://localhost:3002/movies", redirected: false, status: 200, ok: true, …}
        const data = await responce.json(); //(6) [{…}, {…}, {…}, {…}, {…}, {…}]  0: {id: 1, name: "The Flash", rating: 8.3, overview: "This is a wider card w ... 
        console.log(data); 
        //bu datayı state içindeki movies nasıl aktarabilir udpate edebilir? setState ile
        this.setState({movies: data}); 
    }  */

    /*
    //FETCH API ile DELETE request -start
    deleteMovie = async (movie) => {
        const baseUrl = `http://localhost:3002/movies/${movie.id}`; //silme işleminin yapılcağı id /${movie.id}
        await fetch(baseUrl, {
            method: "DELETE" //delete request
        })
        
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id 
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    }
    //FETCH API ile silme -end */


    //senkron ile asenkron nedir? 
    //senkron: aynı nada çalşabilen
    //asenkron: aynı nada çalşamayan
    
    /*// axios metodu-kütüphanesi ile get request -start  (http request) googledan npm axios indir.
    async componentDidMount() {
        const response = await axios.get("http://localhost:3002/movies")
        console.log(response); //object içinde data: var ordan (6) [{…}, {…}, {…}, {…}, {…}, {…}] ulaşıyoruz.
        this.setState({movies: response.data});
    }
    // axios metodu-kütüphanesi ile get request-end

    //axios ile delete request -start
    deleteMovie = async (movie) => {
        
        axios.delete()
        //const baseUrl = `http://localhost:3002/movies/${movie.id}`;
        //await axios.delete(baseUrl)
        await axios.delete(`http://localhost:3002/movies/${movie.id}`)

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id 
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    }
    //axios ile delete request -end*/
   
    //Gerçek API themoviedb.org ile çalışmak -start
    // axios metodu-kütüphanesi ile get request-end
    async componentDidMount() {
        //npm i dotenv ihtiyacımız var. api_key'i çevre değişkeni olarak tanımlıcaz. https://www.npmjs.com/package/dotenv
        //const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        const response = await axios.get(`https://api.themoviedb.org/3/list/7094722?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        console.log(response.data.items);
        this.setState({movies: response.data.items});
    }
    // axios metodu-kütüphanesi ile get request-end

    //axios ile delete request -start
    deleteMovie = async (movie) => {
        
        axios.delete()
        await axios.post(`https://api.themoviedb.org/3/list/7094722/remove_item?media_id=${movie.id}&session_id=${process.env.REACT_APP_SESSION_ID}&api_key=${process.env.REACT_APP_API_KEY}`)
        // post remove list https://developers.themoviedb.org/3/lists/remove-movie
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id 
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    }
    //axios ile delete request -end
    //Gerçek API themoviedb.org ile çalışmak -end


    //Delete fonksiyonu App.js içine yazıyoruz. Arrow func yaptık.
    //Bir filmi sildikten sonra kalan filmler için yeni bir liste oluşturuyoruz. Bunu filter metodu kullanıcaz.
    //Parent componentteki deleteMovie fonksiyonu child componentte aktarmanın en kolay yolu props hale getirmek.

    // deleteMovie = (movie) => {
    //     const newMovieList = this.state.movies.filter(
    //         m => m.id !== movie.id //m.id eşit olmayacak movie.id'ye
    //     );
    //     //Burdaki yeni movie listesini yukardaki movies'e dönüştürücez.
    //     this.setState({
    //         movies: newMovieList
    //     }) //Bu şekildeki yazım önceki state durumumuz boş bir array olduğunda kullanımı tercih edilir.

    //     //İçeriğimiz boş bie array değil var olan filmler üzerinden güncelliyoruz kendi yeni listemizi
    //     //bunun için var olan state'i parametre olarak alıcaz. Var olan state'i güncellicez.
    //     this.setState(state => ({
    //         movies: newMovieList
    //     }))
    // }
 

    searchMovie = (event) => {
        console.log(event.target.value);
        this.setState({searchQuery: event.target.value})// Buraya gelen değer searchQuery property'sine update etmek istiyoruz.
             
    }


    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                //return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
                return movie.title.toLowerCase().includes(this.state.searchQuery.toLowerCase());
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