import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';

const INITIAL_STATE = {
  keyword: '',
  loading: false,
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  shouldComponentUpdate(prevProps, prevState) {
    const { keyword, loading } = this.state;
    // Prevent fetching the same images if the keyword wasn't changed
    return keyword !== prevState.keyword || loading !== prevState.loading;
  }

  updateKeyword = keyword => {
    this.setState({ keyword });
  };

  toggleLoader = () => {
    this.setState(prevState => ({ loading: !prevState.loading }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.updateKeyword} />

        <ImageGallery
          keyword={this.state.keyword}
          toggleLoader={this.toggleLoader}
        />

        {this.state.loading && <Loader />}

        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
