import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import { Image, ImageGalleryList, Modal } from 'components';

const INITIAL_STATE = { selectedImageId: 0 };

export class ImageGallery extends Component {
  state = { ...INITIAL_STATE };

  showModal = selectedImageId => {
    this.setState({ selectedImageId });
  };

  hideModal = () => {
    this.setState({ selectedImageId: 0 });
  };

  render() {
    const { images } = this.props;
    const { selectedImageId } = this.state;
    const selectedImage = images.find(image => image.id === selectedImageId);

    return (
      <div className={css.galleryContainer}>
        <ImageGalleryList images={images} showModal={this.showModal} />

        {!!selectedImageId && (
          <Modal onClose={this.hideModal}>
            <Image
              showLoader="true"
              src={selectedImage.src.original}
              alt={selectedImage.alt}
            />
          </Modal>
        )}
      </div>
    );
  }
}
