import React from 'react';
import serialize from 'form-serialize';

class AddMovie extends React.Component {


    handleFormSubmit = (event) => {
        event.preventDefault();
        //Formdaki verileri alabilmek için obje şeklinde npm i form-serialize yükledik.
        const newMovie = serialize(event.target, { hash: true });
        console.log(newMovie); //Bu oluşturduğumuz nesneyi-objeyi movies.json'a göndermek istiyoruz.

        this.props.onAddMovie(newMovie);//Örnek çıktısı {name: "sa", rating: "10", imageURL: "sa.jpg", overview: "sa"}
        //Form'dan aldığımız yeni film nesnesini parent component(App.js)'in props'u olarak göndericez. 
    }


    render() {

        return  (
            <div className="container">
            <form className="mt-5" onSubmit={this.handleFormSubmit}>
            <input className="form-control" id="disabledInput" type="text" placeholder="Fill The Form To Add A Movie.." disabled/>
                <div className="form-row">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input  type="text" 
                                className="form-control" 
                                name="name"
                                required
                                />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                name="rating"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                name="imageURL"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea 
                                className="form-control" 
                                name="overview" rows="5"></textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-danger btn-block" value="Add Movie" />
            </form>
        </div>
        )
    }
}


export default AddMovie;