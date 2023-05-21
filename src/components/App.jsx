import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearchImg } from '../api/api';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { search, page } = this.state;

    if (prevState.search !== search) {
      getSearchImg(search, page).then(data =>
        this.setState({ images: data.hits })
      );
    }
  };

  handleInputSubmit = imgSearch => {
    this.setState(({ search }) => ({
      search: imgSearch,
    }));
  };

  render() {
    const { images } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleInputSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
      </>
    );
  }
}
