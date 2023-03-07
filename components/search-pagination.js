import { Pagination } from "react-bootstrap";

const MAX_PAGINATION_ITEMS = 8;


function SearchResultPagination({ from, pageSize, numFound, setFrom }) {
    return (
        <Pagination>
            {createItems(numFound, pageSize, from, setFrom)}
        </Pagination>
    );
}

function createItems(numFound, pageSize, from, setFrom) {
    const pageCount = Math.floor(numFound / pageSize);
    const currentPage = Math.floor(Math.min(from, numFound) / pageSize);

    const minPage = Math.max(0, Math.floor(currentPage - MAX_PAGINATION_ITEMS / 2));
    const maxPage = Math.min(pageCount, minPage + MAX_PAGINATION_ITEMS) - 1;

    //TODO: use lodash
    let range = [];

    for (let i = minPage; i <= maxPage; i++) {
        range.push(i);
    }

    const onPageSelect = function (page, event) {
        event.preventDefault();
        setFrom(page * pageSize);
    };

    function createPaginationItem(page, activePage, label) {
        return (
            <Pagination.Item key={page} active={page === activePage} onClick={onPageSelect.bind(this, page)}>
                {label || (page + 1)}
            </Pagination.Item>
        );
    }

    const items = [];
    if (minPage > 0) {
        items.push([createPaginationItem(0, currentPage), <Pagination.Ellipsis key='afterFirst' disabled />]);
    }

    range.forEach(p => {
        items.push(createPaginationItem(p, currentPage));
    });

    if ((pageCount - maxPage) <= 2) {
        items.push(createPaginationItem(pageCount, currentPage));
    } else if (pageCount > maxPage) {
        items.push([<Pagination.Ellipsis key='beforeLast' disabled />, createPaginationItem(pageCount, currentPage)]);
    }
    return items;
}

export default SearchResultPagination;