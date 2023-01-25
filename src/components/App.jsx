import { Component } from 'react';
import axios from 'axios';
import { fetchPicturesByTopic } from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
    query: '',
    page: 1,
  };

  getPicturesFromApi = async searchedQuery => {
    this.setState({ isLoading: true, error: null });
    if (this.state.query !== '') {
      try {
        const pictures = await fetchPicturesByTopic(
          searchedQuery,
          this.state.page
        );
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
          isLoading: false,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  handleSubmit = query => {
    if (query !== this.state.query) {
      this.setState({ query, pictures: [], page: 1 }, () => {
        this.getPicturesFromApi(query);
      });
    }
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.getPicturesFromApi(this.state.query);
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.pictures} />
        {this.state.pictures.length > 0 ? (
          <Button onClick={this.loadMore} />
        ) : null}
      </>
    );
  }
}
