import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((row,index) => (
            <tr key={row.installation_config_id + index}>
            <td>{row.installation_config_id}</td>
            <td>{row.installation}</td>
            <td>{row.message_type}</td>
            <td>{row.source_id?row.source_id:"NULL"}</td>
            <td>{row.destination_id?row.destination_id:"NULL"}</td>
            <td>{row.segment_label?row.segment_label:"NULL"}</td>
            <td>{row.path_to_object?row.path_to_object:"NULL"}</td>
            <td>{row.type?row.type:"NULL"}</td>
            <td>{row.date_format?row.date_format:"NULL"}</td>
            <td>{row.created?row.created:"NULL"}</td>
        </tr>
        ))}
    </>
  );
}

export function PaginatedItems({ itemsPerPage, items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <nav aria-label="Page navigation example" style={{margin:"15px"}}>
      <ReactPaginate
        nextLabel="NEXT"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="PREVIOUS"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </nav>
     
    </>
  );
}