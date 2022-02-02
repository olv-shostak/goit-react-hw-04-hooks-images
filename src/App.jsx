import React, { Component } from 'react';
import './App.css';
import { ToastContainer, toast } from "react-toastify";
import api from './components/services/apiServices';
import Searchbar from "./components/Searchbar/Searcbar";
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';

class App extends Component {
  state = {
    value: "",
    pictures: [],
    loading: false,
    showModal: false,
    contentModal: "",
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;

    if (prevState.value !== value || prevState.page !== page) {
      this.setState((prevState) => ({
        page: (value === prevState.value ? prevState.page : 1),
        loading: true,
      }));

      api.getData(value, page)
        .then((data) => {
          this.setState({
            pictures:
              page === 1 ? data.hits : [...this.state.pictures, ...data.hits],
          });
          if (data.total === 0) {
            toast.warning(
              `oops, we didn't find any images on request ${value}`
            );
          }
        })
        .catch((error) => console.log(error))
        .finally(() => this.setState({ loading: false }));
    }
  }

  toggleModal = (largeImage) => {
    this.setState((state) => ({
      showModal: !state.showModal,
      contentModal: largeImage,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      showModal: false,
      contentModal: "",
    }));
  };

  handelFormSubmit = (value) => {
    this.setState({ value,
      pictures: [],
      page: 1,
     });
  };

  pagination = () => {
    this.setState((state) => ({ page: state.page + 1 }));
  };
 
  render() {
    const { pictures, loading, showModal, contentModal } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handelFormSubmit}></Searchbar>
        {pictures.length && (
          <ImageGallery pictures={pictures} onClick={this.toggleModal} />
        )}
         {loading && <Loader />}
         {pictures.length > 11 && <Button pagination={this.pagination} />}
         <ToastContainer theme="colored" autoClose={3000} />
         {showModal && (
          <Modal contentModal={contentModal} closeModal={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
