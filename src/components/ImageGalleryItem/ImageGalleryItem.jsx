import React from 'react';
import css from './ImageGalleryItem.module.css';
import Image from 'components/Image/Image';

const ImageGalleryItem = ({ image, onClick }) => {
  const { id, src, alt } = image;

  return (
    <li className={css.galleryListItem} onClick={() => onClick(id)}>
      <div className={css.imageWrap}>
        <Image src={src.small} alt={alt} />
      </div>
    </li>
  );
};

export default ImageGalleryItem;
