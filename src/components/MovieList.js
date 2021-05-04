import React from 'react';

const MovieList = (props) => {
//sadece propr özellik aldımız için fonksiyonel component kullandık.

    
    // let handleClick = (e) => {
    //     //console.log("butona basıldı");
    //     //console.log(e);/* event(e): eventle ilgili o anki olayla ilgili bilgileri taşır.
    //     //Çıktı: SyntheticBaseEvent {_reactName: "onClick", _targetInst: null, type: "click", nativeEvent: MouseEvent, target: button.btn.btn-md.btn-outline-danger, …} */
    // }

        return (
            <div className="row">  

                {props.movies.map((movie) => ( //map fonksiyonu ile movies array'i içindeki şuan 3 eleman var onları tek tek gösteriyoruz. 
                    //Console'da hata aldık neden? index.js:1 Warning: Each child in a list should have a unique "key" prop.
                    //Bunuda ilerde silme işlemi yapacağimız hangisinin silineğinin anlaşılabilmesi için key={movie.id} yazdık.
                    <div className="col-lg-4" key={movie.id}>
                        <div className="card me-4 shadow-sm">
                            <img src = {`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} className="card-img-top" alt="Sample Movie" />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">{movie.overview}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="button" onClick={()=> props.deleteMovieProp(movie) } className="btn btn-md btn-outline-danger">Delete</button>
                                    {/* handleClick() şeklinde yazılmadığına dikkat return içine girince direk çalışmasın. Biz butona basınca çalışsın diye parantez içine almıyoruz. */}
                                    <h2><span className="badge badge-info">{movie.vote_average}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                )}
            </div>
        )

    
    }

export default MovieList;