import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGE_PER_PAGE = 20;

function App() {
  // console.log(import.meta.env.VITE_API_KEY);

  const searchInput = useRef(null);
  const [images, setImages] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchImage();
  }, [page])



  const fetchImage = async () => {
    try {
      const { data } = await axios.get(`${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGE_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`);

      setImages(data.results)
      setTotalPages(data.total_pages)
      // console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handlePrev = () => {
    fetchImage();
    setPage(1);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchInput.current.value);
    // fetchImage();
    // setPage(1);
    handlePrev();

  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    // fetchImage();
    // setPage(1);
    handlePrev();
  };

  console.log('page', page);


  return (
    <>
      <div className='container mx-auto max-m-full bg-gray-200 p-5'>
        <h1 className='text-3xl mt-5 text-center text-blue-500'>Image Gallery</h1>
        <div className='mt-5 flex justify-center '>
          <form action=""
            onSubmit={handleSearch}
            className='w-1/2 flex justify-center items-center'>
            <input type="search" placeholder='Type Something to search....' ref={searchInput} className='w-1/2 p-2 border border-gray-300 rounded' />
          </form>
        </div>
        <div className='flex gap-5 justify-center mt-3'>
          <button onClick={() => handleSelection('nature')} className='rounded-lg bg-blue-400 text-white p-2  font-semibold'>Nature</button>
          <button onClick={() => handleSelection('birds')} className='rounded-lg bg-blue-400 text-white p-2  font-semibold'>Birds</button>
          <button onClick={() => handleSelection('cats')} className='rounded-lg bg-blue-400 text-white p-2  font-semibold'>Cats</button>
          <button onClick={() => handleSelection('shoes')} className='rounded-lg bg-blue-400 text-white p-2  font-semibold'>Shoes</button>
        </div>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 '>
          {
            images.map(image => {
              return (
                <div
                  key={image.id}
                  className='w-full h-64 mt-5 overflow-hidden rounded shadow-lg flex items-center justify-center'
                >
                  <img
                    src={image.urls.small}
                    alt={image.alt_description}
                    className='w-full h-auto min-h-full min-w-full max-h-full max-w-full rounded-lg object-cover'
                  />
                </div>
              )
            })
          }
        </div>

        <div className='container flex justify-center gap-3'>
          {page > 1 && (
            <div className='flex justify-center mt-5 gap-2'>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className='bg-blue-400 text-white p-2 rounded-lg font-semibold'
              >
                Previous
              </button>

            </div>
          )
          }
          {
            page < totalPages && (
              <div className='flex justify-center mt-5 gap-2'>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className='bg-blue-400 text-white p-2 rounded-lg font-semibold'
                >
                  Next
                </button>
              </div>
            )
          }

        </div>

      </div>
    </>
  )
};

export default App
