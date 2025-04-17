import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar_02, Avatar_09 } from "../../../Routes/ImagePath";
import { DatePicker, Table } from "antd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SearchBox from "../../../components/SearchBox";
import AddOverTime from "../../../components/modelpopup/AddOverTime";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { OVERTIME_MUTATION_KEY, OVERTIME_QUERY_KEY, useDeleteOvertime, useGetAllOvertime, useSearchData } from "../../../api/hooks/employees/overTime.ts";
import { errorToast, successToast } from "../../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";
const OverTime = () => {
  const { data } = useGetAllOvertime();
  const [edit, setUs] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { mutateAsync: deleteOvertime } = useDeleteOvertime();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [searchDataResult, setSearchDataResult] = useState([]);
  const [formattedSearchDate, setFormattedSearchDate] = useState("");

  const { mutateAsync: searchData } = useSearchData();

  const handleDelete = async () => {
    try {
      const response = await deleteOvertime(selectedId);
      queryClient.invalidateQueries({ queryKey: ["OVERTIME_MUTATION_KEY"] });
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries({ queryKey: ["OVERTIME_QUERY_KEY"] });
        setDeleteModal(false);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleSearch = async () => {
    if (!selectedDate) return;
  
    const dateObj = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
    const formattedDate = dateObj.toISOString().split("T")[0]; 
    console.log("Formatted date to send:", formattedDate);
    setFormattedSearchDate(formattedDate); 
  
    try {
      const result = await searchData(formattedDate);
  
      if (result && Array.isArray(result.data)) {
        const data = result.data;
  
        const totalRequests = data.length;
        const totalHours = data.reduce((sum, item) => sum + (item.overtimeHours || 0), 0);
        const pendingRequests = data.filter(item => item.status === "pending").length;
        const rejectedRequests = data.filter(item => item.status === "rejected").length;
  
        setSearchDataResult([
          {
            title: "Total Requests",
            value: totalRequests,
          },
          {
            title: "Total Hours",
            value: totalHours,
          },
          {
            title: "Pending Requests",
            value: pendingRequests,
          },
          {
            title: "Rejected Requests",
            value: rejectedRequests,
          },
        ]);
        setShowResults(true);
      } else {
        console.warn("Unexpected data format in result");
      }
    } catch (err) {
      errorToast("Failed to search data.");
      console.error(err);
    }
  };

  const columns = [
    {
      title: "#",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "firstName",
      render: (text, record) => {
        const firstName = record.employeeId?.firstName || "";
        const lastName = record.employeeId?.lastName || "";
        return (
          <span className="table-avatar">
            <Link to="/profile">{`${firstName} ${lastName}`}</Link>
          </span>
        );
      },
      sorter: (a, b) => {
        const nameA = `${a.employeeId?.firstName || ""} ${a.employeeId?.lastName || ""}`;
        const nameB = `${b.employeeId?.firstName || ""} ${b.employeeId?.lastName || ""}`;
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: "OT Date",
      dataIndex: "overtimeDate",
      sorter: (a, b) => new Date(a.overtimeDate) - new Date(b.overtimeDate),
      render: (date) => date?.split("T")[0],
    },
    // Add more columns as needed...
  
  {
    title: "OT Hours",
    dataIndex: "overtimeHours",
    sorter: (a, b) => a.overtimeHours.length - b.overtimeHours.length,
  },

  {
    title: "OT Type",
    dataIndex: "ottype",
    sorter: (a, b) => a.ottype.length - b.ottype.length,
  },

  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.status.length - b.status.length,
    // render: (text) => (
    //   <div className="dropdown action-label text-center">
    //     <Link
    //       className="btn btn-white btn-sm btn-rounded "
    //       to="#"
    //       aria-expanded="false"
    //     >
    //       <i
    //         className={
    //           text === "New"
    //             ? "far fa-dot-circle text-purple"
    //             : text === "Pending"
    //             ? "far fa-dot-circle text-info"
    //             : text === "Approved"
    //             ? "far fa-dot-circle text-success"
    //             : "far fa-dot-circle text-danger"
    //         }
    //       />{" "}
    //       {text}
    //     </Link>
    //   </div>
    // ),
  },

  {
    title: "Approved By",
    dataIndex: "approvedby",
    render: (text, record) => (
      <span className="table-avatar">
        <Link to="/profile" className="avatar">
          <img alt="" src={record.apimage} />
        </Link>
        <Link to="/profile">{text}</Link>
      </span>
    ),
    sorter: (a, b) => a.approvedby.length - b.approvedby.length,
  },
  {
    title: "Action",
    render: (record) => (
      <div className="dropdown dropdown-action text-end">
        <Link
          to="#"
          className="action-icon dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="material-icons">more_vert</i>
        </Link>
        <div className="dropdown-menu dropdown-menu-right">
          <Link
            className="dropdown-item"
            to="#"
            data-bs-toggle="modal"
            data-bs-target="#add_overtime"
            onClick={() => setUs(record)}
          >
            <i className="fa fa-pencil m-r-5" /> Edit
          </Link>
          <Link
            className="dropdown-item"
            to="#"
            onClick={() => {
              setSelectedId(record._id);
              setDeleteModal(true);
            }}
          >
            <i className="fa fa-trash m-r-5" /> Delete
          </Link>
        </div>
      </div>
    ),
  },
];
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Overtime"
            title="Dashboard"
            subtitle="Overtime"
            modal="#add_overtime"
            name="Add Overtime"
          />

          <div style={{ display: "flex", justifyContent: "end" }}>
            <div style={{ marginBottom: "20px", display: "flex" }}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control"
                dateFormat="dd-MM-yyyy"
                placeholderText="Select a date"
              />
              <button className="btn add-btn" type="submit" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          {showResults && (
            <div>
              <h4>
                Search Results for{" "}
                {formattedSearchDate || "No date selected"}
              </h4>
              <div className="row">
                {searchDataResult &&
                  searchDataResult.map((item, index) => (
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" key={index}>
                      <div className="stats-info">
                        <h6>{item.title}</h6>
                        <h4>
                          {item.value} <span>{item.month}</span>
                        </h4>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox />
                <Table
                  className="table-striped"
                  columns={columns}
                  dataSource={data}
                  rowKey={(record) => record.id}
                  locale={{ emptyText: "No records found" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddOverTime id={edit} setUs={setUs} />
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={handleDelete}
        name="Delete Overtime"
        ID={selectedId}
      />
    </>
  );
};

export default OverTime;
