import React from 'react'; //App react component olduğu için bu kodun yazılması gereklidir.
import SearchBar from './SearchBar';
import MovieList from './MovieList';

//İlerde bu film sayısı -değişebileceği- için bu movies state içerisine almamız gerekir.

class App extends React.Component { //Herşeyi App Component içine yazıyoruz.

    state = {// state bir objedir ve İçerisinde yazılanda movies: property şeklinde gelir.
        movies: [ //Bu verileri gerçekte api veya veritabanından alıyoruz. Ders olduğu için şimdilik static veri alıcaz.
            {
                "id": 1, //"" içinde yazılmak zorunlu id,name,ratinglerin kural
                "name": "The Flash",
                "rating": 8.3,
                "overview": "This is a wider card with supporting text below as a natural lead-in to additional content.",
                "imageURL": "https://image.tmdb.org/t/p/w220_and_h330_face/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg"
            },
            {
                "id": 2,
                "name": "Interstellar",
                "rating": 6.8,
                "overview": "This is a wider card with supporting text below as a natural lead-in to additional content.",
                "imageURL": "https://image.tmdb.org/t/p/w220_and_h330_face/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
            },
            {
                "id": 3,
                "name": "Arrow",
                "rating": 7.9,
                "overview": "This is a wider card with supporting text below as a natural lead-in to additional content.",
                "imageURL": "https://image.tmdb.org/t/p/w220_and_h330_face/gKG5QGz5Ngf8fgWpBsWtlg5L2SF.jpg"
            }
        ]
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

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar />
                    </div>
                </div>

                <MovieList 
                    movies={this.state.movies} // movies props yaptık. yukardaki movies'lere böyle ulaştık.
                    deleteMovieProp={this.deleteMovie}
                />
            </div>
        )
    }

}

export default App;