import React from 'react';

const Paginations = ({ totalPosts, postPerPage, setCurrentPage, currentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className='flex align-center justify-center gap-2 mb-5'>
      {pages.map((page, index) => (
        <button
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-2 ${page === currentPage ? 'bg-red-600 text-white ' : 'bg-cyan-400'}`}
          key={index}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Paginations;
