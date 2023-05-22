import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClick);
  }

  handleClickOnBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.toClose();
    }
  };

  handleEscClick = evt => {
    if (evt.code === 'Escape') {
      this.props.toClose();
    }
  };

  render() {
    const { overlay, modal, modalImg } = css;
    const { src, alt } = this.props;
    return (
      <div className={overlay} onClick={this.handleClickOnBackdrop}>
        <div className={modal}>
          <img src={src} alt={alt} className={modalImg} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  toClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
