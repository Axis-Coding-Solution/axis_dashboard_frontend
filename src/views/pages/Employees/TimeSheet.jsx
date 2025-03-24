import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SearchBox from "../../../components/SearchBox";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { AddTimeSheetModelPopup } from "../../../components/modelpopup/AddTimeSheetModelPopup";
import { TIMESHEET_MUTATION_KEY, TIMESHEET_QUERY_KEY, useDeleteTimeSheet, useGetAllTimeSheet } from "../../../api/hooks/employees/timeSheet.ts";
import { errorToast, successToast } from "../../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";

const TimeSheet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: timeSheetData, isLoading } = useGetAllTimeSheet(currentPage, pageSize);
  const timeSheet = timeSheetData?.data || [];
  const paginationInfo = timeSheetData?.pagination || {};
  const handleTableChange = (page, newPageSize) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };
  const [edit, setUs] = useState("");
 const [selectedId, setSelectedId] = useState(null);
  const { mutateAsync } = useDeleteTimeSheet();
  const [deleteModal, setDeleteModal] = useState(false);
  const queryClient = useQueryClient();
    async function deleteTimeSheet() {
      try {
        const response = await mutateAsync(selectedId);
        queryClient.invalidateQueries({ queryKey: [TIMESHEET_MUTATION_KEY] });
        if (response?.success) {
          successToast(response.message);
          queryClient.invalidateQueries({ queryKey: [TIMESHEET_QUERY_KEY] })
          setDeleteModal(false)
        }
      } catch (error) {
        errorToast(error);
      }
    }
  const columns = [
    {
      title: "Name",
      dataIndex: ["employeeId", "firstName"],
      // render: (text, record) => (
      //   <span className="table-avatar">
      //     <Link to="/profile" className="avatar">
      //       <img alt="img" src={`${record.img}`} />
      //     </Link>
      //     {text} <span>{record.role}</span>
      //   </span>
      // ),
      sorter: (a, b) =>
        a.employeeId?.firstName?.localeCompare(b.employeeId?.firstName),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => date.split("T")[0],
    },

    {
      title: "Project",
      dataIndex: ["projectId", "projectName"],
      sorter: (a, b) =>
        a.projectId?.projectName?.localeCompare(b.projectId?.projectName),
    },
    

    // {
    //   title: "Assigned Hours",
    //   dataIndex: "assignedhours",
    //   sorter: (a, b) => a.assignedhours.length - b.assignedhours.length,
    // },

    {
      title: "Hours",
      dataIndex: "hours",
      sorter: (a, b) => a.hours.length - b.hours.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => (
        <span className="d-none d-sm-table-cell col-md-4">{text}</span>
      ),
      sorter: (a, b) => a.description.length - b.description.length,
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
              data-bs-target="#add_todaywork"
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
      sorter: (a, b) => a.length - b.length,
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Time Sheet"
            title="Dashboard"
            subtitle="Time Sheet"
            modal="#add_todaywork"
            name="Add Today Work"
          />
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox pageSize={pageSize} onPageSizeChange={handlePageSizeChange}/>
                <Table
                  columns={columns}
                  dataSource={timeSheet}
                  className="table-striped"
                  rowKey={(record) => record.id}
                  locale={{ emptyText: 'No records found' }}
                  pagination={{
                    current: paginationInfo.currentPage || currentPage,
                    pageSize: paginationInfo.itemsPerPage || pageSize,
                    total: paginationInfo.totalItems || 0,
                    showSizeChanger: false,
                    showQuickJumper: true,
                    onChange: handleTableChange,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
      <AddTimeSheetModelPopup id={edit} setUs={setUs}/>
      <DeleteModal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onDelete={deleteTimeSheet}
          name="Delete Work Detail"
          ID={selectedId}
        />
    </>
  );
};

export default TimeSheet;
