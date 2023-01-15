import { Component } from 'react';
import axios from 'axios';
import { fetchPicturesByTopic } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
    query: 'forest',
    page: 1,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const pictures = await fetchPicturesByTopic(
        this.state.query,
        this.state.page
      );
      this.setState({
        pictures,
        isLoading: false,
      });
    } catch (error) {
      console.log('Error: ', error);
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
      console.log(this.state);
    }
  }

  

  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery images={this.state.pictures} />
      </>
    );
  }
}
