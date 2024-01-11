import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../utils/apiPexels';
import { Button, Searchbar, ImageGallery, Loader, Modal } from 'components';

const INITIAL_STATE = {
  keyword: '',
  page: 1,
  total: 0,
  images: [],
  showLoader: false,
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.keyword !== this.state.keyword ||
      prevState.page !== this.state.page
    ) {
      const { images, total } = await this.getImages();
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        total,
      }));
    }
  }

  getImages = async () => {
    let response = { images: [], total: 0 };
    const { page, keyword } = this.state;

    try {
      // Show loader
      this.toggleLoader();
      // Fetch data
      response = await API.getImages(keyword, page);
    } catch (error) {
      // Show error
      toast.error(error.message);
    } finally {
      // Hide loader
      this.toggleLoader();
    }

    return response;
  };

  updateKeyword = keyword => {
    this.setState({ ...INITIAL_STATE, keyword });
  };

  toggleLoader = () => {
    this.setState(prevState => ({ showLoader: !prevState.showLoader }));
  };

  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, total, keyword } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.updateKeyword} />

        {images.length > 0 && (
          <ImageGallery
            keyword={keyword}
            images={images}
            toggleLoader={this.toggleLoader}
          />
        )}

        {images.length < total && (
          <Button type="button" onClick={this.loadMoreClick}>
            Load more
          </Button>
        )}

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
