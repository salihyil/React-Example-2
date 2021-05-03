import React from 'react';

class SearchBar extends React.Component {

    state = {
        searchQuery: ""
    }

    handleFormSubmit = (event) => {
        event.preventDefault(); //Formu submit edince sayfanın hep yenileme yapmasını engelledik. 
    }

    render() {
        
        return (
            //Buraya basit bir form yerleştirmeyi düşünüyoruz.
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-row mb-5 mt-5">
                    <div className="col-12">
                               {/* Burdaki value değerini dinamik hale detiricez. */}
                        <input 
                            onChange={(event) => this.setState({searchQuery: event.target.value})} 
                            type="text" 
                            className="form-control" 
                            placeholder="Search a movie" 
                            value={this.state.searchQuery}
                            />
                    </div>
                </div>
            </form>
            
        )

    }
}

export default SearchBar;