import { ImageGalleryItem } from 'components';
import css from './ImageGalleryList.module.css';

export const ImageGalleryList = ({ images, showModal }) => {
  return (
    <ul className={css.galleryList}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onClick={() => showModal(image.id)}
        />
      ))}
    </ul>
  );
};
