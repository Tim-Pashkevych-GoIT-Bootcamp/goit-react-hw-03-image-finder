import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import * as API from '../../utils/api';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import Image from 'components/Image/Image';

const INITIAL_STATE = { page: 1, total: 0, selectedImageId: 0, images: [] };

export default class ImageGallery extends Component {
  state = { ...INITIAL_STATE };

  async componentDidUpdate(prevProps, prevState) {
    // If keyword is updated, then update the state by new images
    if (prevProps.keyword !== this.props.keyword) {
      this.setState({ ...INITIAL_STATE });
      this.setState(await this.getImages());
    }

    // If page is updated, then add new images to the state
    if (prevState.page !== this.state.page) {
      const { images } = await this.getImages();
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
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
                    src={selectedImage.largeImageURL}
                    alt={selectedImage.tags}
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
