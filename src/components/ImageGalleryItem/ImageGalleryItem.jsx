import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
  return (
    <li className={css.galleryItem} key={id}>
      <a href={largeImageURL}>
        <img className={css.galleryItem__image} src={webformatURL} alt={tags} />
      </a>
    </li>
  );
};
