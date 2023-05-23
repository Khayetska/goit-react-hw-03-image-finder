import { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';

const {
  searchbar,
  searchForm,
  searchForm_button,
  searchForm_button_label,
  searchForm_input,
} = css;

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      search: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={searchbar}>
        <form className={searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={searchForm_button}>
            <BsSearch />
            <span className={searchForm_button_label}></span>
          </button>

          <input
            className={searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
