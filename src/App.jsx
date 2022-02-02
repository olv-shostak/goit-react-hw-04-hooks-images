import { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import api from './components/services/apiServices';
import Searchbar from './components/Searchbar/Searcbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';

function App() {
  const [value, setValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!value) {
      return;
    }
    setLoading(true);

    api
      .getData(value, page)
      .then(data => {
        if (data.total === 0) {
          toast.warning(`oops, we didn't find any images on request ${value}`);
          return;
        }
        page === 1
          ? setPictures(data.hits)
          : setPictures(prevState => [...prevState, ...data.hits]);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [value, page]);

  const toggleModal = largeImage => {
    setShowModal(!showModal);
    setContentModal(largeImage);
  };

  const handelFormSubmit = value => {
    setValue(value);
    setPictures([]);
    setPage(1);
  };

  const pagination = () => {
    setPage(prevState => prevState + 1);
  };
  return (
    <div className="App">
      <Searchbar onSubmit={handelFormSubmit}></Searchbar>
      {pictures.length > 0 && <ImageGallery pictures={pictures} onClick={toggleModal} />}
      {loading && <Loader />}
      {pictures.length > 11 && <Button pagination={pagination} />}
      <ToastContainer theme="colored" autoClose={3000} />
      {showModal && <Modal contentModal={contentModal} closeModal={toggleModal} />}
    </div>
  );
}

export default App;
