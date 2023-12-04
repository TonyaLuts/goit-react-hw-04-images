import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormField, FormInput, Header, SearchBtn } from './Searchbar.styled';
import { MdOutlineImageSearch } from 'react-icons/md';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return toast.error('Please enter your request');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <FormField className="form" onSubmit={handleSubmit}>
        <FormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={handleChange}
        />
        <SearchBtn type="submit" className="button">
          <span className="button-label">Search</span>
          <MdOutlineImageSearch />
        </SearchBtn>
      </FormField>
    </Header>
  );
};
