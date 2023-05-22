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
    totalHits: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (search === '') {
      toast('Please, enter a search query');
    }

    if (prevState.search !== search) {
      try {
        const { hits, totalHits } = await getSearchImg(search, page);
        this.setState({ loading: true });

        if (hits.length === 0) {
          toast.error('Sorry there no image with this title');
        }

        if (hits.length > 0 && page === 1) {
          toast(`We have found ${totalHits} images`);
        }

        const filtredHits = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );

        return this.setState({
          images: filtredHits,
          totalHits,
        });
      } catch (error) {
        this.setState({ error: error.message });
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }

    if (prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const { hits } = await getSearchImg(search, page);
        const filtredHits = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );
        return this.setState(prevState => ({
          images: [...prevState.images, ...filtredHits],
          error: '',
        }));
      } catch (error) {
        this.setState({ error: error.message });
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleInputSubmit = imgSearch => {
    this.setState(({ search }) => ({
      search: imgSearch,
    }));
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, loading, totalHits, page } = this.state;
    const { handleInputSubmit, handleLoadMoreClick } = this;
    const totalPage = totalHits > page * 12;
    const isVisibleBtn = images.length > 0 && totalPage;

    return (
      <>
        <Searchbar onSubmit={handleInputSubmit} />
        {error && toast.error(error)}
        {images.length > 0 && <ImageGallery images={images} />}
        {loading && <Loader />}
        {isVisibleBtn && <Button onClick={handleLoadMoreClick} />}
        <ToastContainer />
      </>
    );
  }
}
