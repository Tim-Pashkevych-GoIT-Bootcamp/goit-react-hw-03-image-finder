import React from 'react';
import css from './ImageGalleryItem.module.css';
import Image from 'components/Image/Image';

const ImageGalleryItem = ({ image, onClick }) => {
  const { id, previewURL, tags } = image;

  return (
    <li className={css.galleryListItem} onClick={() => onClick(id)}>
      <div className={css.imageWrap}>
        <Image src={previewURL} alt={tags} />
      </div>
    </li>
  );
};

export default ImageGalleryItem;
