import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearchImg } from '../api/api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    loading: false,
    error: '',
    allPages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (search === '') {
      toast.warning('Please, enter a search query');
    }

    if (prevState.search !== search || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const { hits, totalHits } = await getSearchImg(search, page);

        if (hits.length === 0) {
          toast.error('Sorry there no image with this title');
          return;
        }

        if (page === 1) {
          toast.info(`We have found ${totalHits} images`);
        }

        const filtredHits = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );

        if (prevState.search !== search) {
          return this.setState({ images: filtredHits });
        }

        return this.setState({
          images: [...prevState.images, ...filtredHits],
          allPages: Math.ceil(totalHits / 12),
        });
      } catch (error) {
        this.setState({ error: error.message });
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmit = imgSearch => {
    this.setState({
      search: imgSearch.trim(),
      images: [],
      page: 1,
    });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, loading, page, allPages } = this.state;
    const { handleSubmit, handleLoadMoreClick } = this;
    const isVisible = images.length >= 12 && page !== allPages;

    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        {error && toast.error(error)}
        {images.length > 0 && <ImageGallery images={images} />}
        {loading && <Loader />}
        {isVisible && <Button onClick={handleLoadMoreClick} />}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
