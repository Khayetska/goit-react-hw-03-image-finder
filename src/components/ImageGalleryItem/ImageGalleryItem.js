import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

const { imageGalleryItem, imageGalleryItem_image } = css;

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;
    const { toggleModal } = this;
    return (
      <>
        <li className={imageGalleryItem}>
          <img
            src={webformatURL}
            alt={tags}
            className={imageGalleryItem_image}
            onClick={toggleModal}
          />
        </li>
        {this.state.isOpen && (
          <Modal src={largeImageURL} alt={tags} toClose={toggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
