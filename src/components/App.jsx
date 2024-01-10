import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const INITIAL_STATE = {
  keyword: '',
  showLoader: false,
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  shouldComponentUpdate(prevProps, prevState) {
    const { keyword, showLoader } = this.state;
    // Prevent fetching the same images if the keyword wasn't changed
    return keyword !== prevState.keyword || showLoader !== prevState.showLoader;
  }

  updateKeyword = keyword => {
    this.setState({ keyword });
  };

  toggleLoader = () => {
    this.setState(prevState => ({ showLoader: !prevState.showLoader }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.updateKeyword} />

        <ImageGallery
          keyword={this.state.keyword}
          toggleLoader={this.toggleLoader}
        />

        {this.state.showLoader && (
          <Modal>
            <Loader />
          </Modal>
        )}

        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
