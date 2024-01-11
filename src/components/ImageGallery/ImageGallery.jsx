import React, { Component } from 'react';
import { toast } from 'react-toastify';
import css from './ImageGallery.module.css';
import * as API from '../../utils/apiPexels';
import { Button, Image, Modal } from 'components';
import { ImageGalleryList } from 'components/ImageGalleryList/ImageGalleryList';

const INITIAL_STATE = { page: 0, total: 0, selectedImageId: 0, images: [] };

export class ImageGallery extends Component {
  state = { ...INITIAL_STATE };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { keyword } = this.props;

    if (prevProps.keyword !== keyword) {
      // Reset the state
      await this.setState({ ...INITIAL_STATE });
      // Request a data for a first page
      this.setState({ page: 1 });
    }

    // Fetch new images
    if (page && prevState.page !== page) {
      const { images, total } = await this.getImages();
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        total,
      }));
    }
  }

  getImages = async () => {
    let response = { images: [], total: 0 };
    const { page } = this.state;
    const { keyword, toggleLoader } = this.props;

    try {
      // Show loader
      toggleLoader();
      // Fetch data
      response = await API.getImages(keyword, page);
    } catch (error) {
      // Show error
      toast.error(error.message);
    } finally {
      // Hide loader
      toggleLoader();
    }

    return response;
  };

  showModal = selectedImageId => {
    this.setState({ selectedImageId });
  };

  hideModal = () => {
    this.setState({ selectedImageId: 0 });
  };

  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, total, selectedImageId } = this.state;
    const selectedImage = images.find(image => image.id === selectedImageId);

    return (
      <div className={css.galleryContainer}>
        {images.length > 0 && (
          <>
            <ImageGalleryList images={images} showModal={this.showModal} />

            {images.length < total && (
              <Button type="button" onClick={this.loadMoreClick}>
                Load more
              </Button>
            )}

            {!!selectedImageId && (
              <Modal onClose={this.hideModal}>
                <Image
                  showLoader="true"
                  src={selectedImage.src.original}
                  alt={selectedImage.alt}
                />
              </Modal>
            )}
          </>
        )}
      </div>
    );
  }
}
