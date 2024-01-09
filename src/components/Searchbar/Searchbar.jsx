import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import css from './Searchbar.module.css';
import Button from 'components/Button/Button';
import { IconContext } from 'react-icons';

const INITIAL_STATE = {
  keyword: '',
};

export default class Searchbar extends Component {
  state = { ...INITIAL_STATE };

  onChange = ({ target }) => {
    this.setState({ keyword: target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.keyword.trim() === '') {
      toast.error('Please, enter the keyword to search');
      return;
    }

    this.props.onSubmit(this.state.keyword);
  };

  render() {
    return (
      <header className={css.searchBarContainer}>
        <form className={css.searchForm} onSubmit={this.onSubmit}>
          <Button className="icon" aria-label="Click to search">
            <IconContext.Provider value={{ size: '18px' }}>
              <FaMagnifyingGlass />
            </IconContext.Provider>
          </Button>
          <input
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            onChange={this.onChange}
            value={this.state.keyword}
          />
        </form>
      </header>
    );
  }
}
