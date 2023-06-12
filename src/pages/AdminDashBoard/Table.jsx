import { useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers, updateIsPsychiatristStatus, updateUserActiveStatus } from "../../actions/UserAction";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

function Table({ data }) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch  = useDispatch()
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [delModalOpened, setDelModalOpened] = useState(false);

  data = data?.filter((users)=> !users.isAdmin);  //filter all users who are not admin.

  const filteredData = useMemo(() => {
    let filtered = data?.filter((item) =>
      item.username.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered;
  }, [data, filter]);

  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  function handleIsPsychiatrist(item,e) {
    item.isPsychiatrist = e.target.value;
    const userData = item;
    const adminId = user._id;
    dispatch(updateIsPsychiatristStatus(adminId, userData));
    dispatch(getAllUsers());
  }
  function handleStatusUpdate(item,e) {
    item.activeStatus = e.target.value;
    const userData = item;
    const adminId = user._id;
   dispatch(updateUserActiveStatus(adminId, userData));
   dispatch(getAllUsers());
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
        <input
          type="text"
          placeholder="Filter by username"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Works At</th>
            <th>Status</th>
            <th>Psychiatrist</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((item) => (
            <tr key={item.id}>
              <td>
              <Link
              to={`/profile/${item._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
                <img
                  src={
                    publicFolder + item.profilePicture
                      ? publicFolder + item.profilePicture
                      : publicFolder + "defaultProfile.png"
                  }
                  title="tap to visit profile"
                  alt="profile"
                  className="followerImage"
                />
                </Link>
              </td>
              <td>{item.username}</td>
              <td>{item.firstname+" "+item.lastname}</td>
              <td>{item.department}</td>
              <td>{item.worksAt}</td>
              <td>
                <select value={item.activeStatus} onChange={(e) => handleStatusUpdate(item,e)}>
                  <option value={"active"}>Active</option>
                  <option value={"inactive"}>Suspended</option>
                </select>
              </td>
              <td>
                <select value={item.isPsychiatrist} onChange={(e) => handleIsPsychiatrist(item,e)}>
                  <option value={"yes"}>yes</option>
                  <option value={"no"}>no</option>
                </select>
              </td>
              <td>
                <button onClick={()=>setDelModalOpened(true)}>delete</button>
                <DeleteModal location={"adminPanel"} delModalOpened={delModalOpened} setDelModalOpened={setDelModalOpened} data={item} user={user}/>
              </td>
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

export default Table;
