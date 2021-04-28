import React from 'react';

/**
 * Pagination component
 * @param postsPerPage as 5 default 
 * @param totalPosts  
 * @param paginate
 * @returns 
 */
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

  const pageNumbers : number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
  );
}

export default Pagination;
