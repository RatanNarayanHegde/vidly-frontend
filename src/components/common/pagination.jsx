import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ totalCount, pageSize, currPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages <= 1) return null;
  const pages = _.range(1, totalPages + 1);
  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              key={page}
              onClick={() => onPageChange(page)}
              className={page === currPage ? "page-item active" : "page-item"}
            >
              <button className="page-link">{page}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
