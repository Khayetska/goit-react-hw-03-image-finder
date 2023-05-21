import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const { imageGalleryItem, imageGalleryItem_image } = css;

export class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags } = this.props.image;

    return (
      <li className={imageGalleryItem}>
        <img src={webformatURL} alt={tags} className={imageGalleryItem_image} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
