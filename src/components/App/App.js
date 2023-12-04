import { fetchGallery } from 'components/utils/api';
import { useEffect, useState } from 'react';
import { Container } from './App.styled';
import { SearchBar } from '../Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { GlobalStyle } from 'components/GlobalStyle';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  // const [modal, setModal] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      if (query === '') {
        return;
      }
      try {
        setIsLoading(true);
        const initialGallery = await fetchGallery(query, page);
        if (initialGallery.totalHits === 0) {
          toast.error(`Nothing was found for the request "${query}"`);
        }
        setImages(prevImages => [...prevImages, ...initialGallery.hits]);
        setLoadMore(page < Math.ceil(initialGallery.totalHits / 12));
      } catch (error) {
        toast.error('Something went wrong. Try the request again');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    loadImages();
  }, [page, query]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setLoadMore(false);
  };

  const handleLoadMore = () => {
    setPage(prevState => page + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleFormSubmit}></SearchBar>
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery query={query} images={images}></ImageGallery>
      )}
      {loadMore && <Button onClick={handleLoadMore}></Button>}
      <GlobalStyle />
      <Toaster />
    </Container>
  );
};
