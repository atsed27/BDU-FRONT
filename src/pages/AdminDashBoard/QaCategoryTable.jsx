import { useState, useMemo, useRef } from "react";
import { createCategory } from "../../api/QARequests";
import { getAllCategories } from "../../actions/QAActions";
import { useDispatch } from "react-redux";


function QaCategoryTable({ data }) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [delModalOpened, setDelModalOpened] = useState(false);
  const [newCategory, setNewCategory] = useState()
  const filteredData = useMemo(() => {
    let filtered = data?.filter((item) =>
      item.category.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered;
  }, [data, filter]);

  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const handleAddCategory = async()=> {
    const category = {
        category: newCategory
    }
   await createCategory(category)
   dispatch(getAllCategories())
   setNewCategory(()=>"")
}

  function handlePreviousPage() {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  function handleNextPage() {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  function handleRowsPerPageChange(e) {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div>
      <div className="filters">
        <div>
            <input
          type="text"
          placeholder="Filter by Category name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />  
        </div>
      
        <div>
        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        /> 
        <button onClick={()=>handleAddCategory()} className="editDeleteButton" style={{marginLeft:"1rem", padding: ".5rem .7rem", fontSize: ".9rem"}}>Add</button> 
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Q&A categories</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((item) => (
            <tr key={item.id}>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value="5">5 Rows</option>
          <option value="10">10 Rows</option>
          <option value="20">20 Rows</option>
        </select>
      </div>
    </div>
  );
}

export default QaCategoryTable;
