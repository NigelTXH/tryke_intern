function Pagination({
    page,
    totalPages,
    setPagination
}) {

    return (
        <div style={{ marginTop: 20 }}>

            <button
                disabled={page === 1}
                onClick={() =>
                    setPagination(prev => ({
                        ...prev,
                        page: prev.page - 1
                    }))
                }
            >
                Previous
            </button>

            <span style={{ margin: "0 20px" }}>
                Page {page} of {totalPages}
            </span>

            <button
                disabled={page >= totalPages}
                onClick={() =>
                    setPagination(prev => ({
                        ...prev,
                        page: prev.page + 1
                    }))
                }
            >
                Next
            </button>

        </div>
    );
}

export default Pagination;