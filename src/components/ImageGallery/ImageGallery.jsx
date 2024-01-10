import React, { Component } from 'react';
import css from './ImageGallery.module.css';
// import * as API from '../../utils/api';
import * as API from '../../utils/apiPexels';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import Image from 'components/Image/Image';

const INITIAL_STATE = { page: 0, total: 0, selectedImageId: 0, images: [] };

export default class ImageGallery extends Component {
  state = { ...INITIAL_STATE };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.keyword !== this.props.keyword) {
      // Reset the state
      await this.setState({ ...INITIAL_STATE });
      // Request a data for a first page
      this.setState({ page: 1 });
    }

    // Fetch new images
    if (this.state.page && prevState.page !== this.state.page) {
      const { images, total } = await this.getImages();
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        total,
      }));
    }
  }

  getImages = async () => {
    // Show loader
    this.props.toggleLoader();
    // Fetch data
    const response = await API.getImages(this.props.keyword, this.state.page);
    // Hide loader
    this.props.toggleLoader();

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
            <ul className={css.galleryList}>
              {images.map(image => (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  onClick={() => this.showModal(image.id)}
                />
              ))}
            </ul>

            {images.length < total && (
              <Button
                id="loadMoreBtn"
                type="button"
                onClick={this.loadMoreClick}
              >
                Load more
              </Button>
            )}

            {!!selectedImageId && (
              <>
                <Modal onClose={this.hideModal}>
                  <Image
                    showLoader="true"
                    src={selectedImage.src.original}
                    alt={selectedImage.alt}
                  />
                </Modal>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
