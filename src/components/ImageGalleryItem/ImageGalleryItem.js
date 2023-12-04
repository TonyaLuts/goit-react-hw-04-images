import { ModalGallery } from 'components/Modal/Modal';
import { Image } from './ImageGalleryItem.styled';
import { useState } from 'react';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags, id },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !isModalOpen);
  };

  return (
    <>
      <li id={id} onClick={toggleModal}>
        <Image src={webformatURL} alt={tags} width="300" />
      </li>

      <ModalGallery
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        largeImageUrl={largeImageURL}
        tags={tags}
      />
    </>
  );
};
