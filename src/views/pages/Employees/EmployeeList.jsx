import React, { useState } from "react";
import {
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_13,
} from "../../../Routes/ImagePath";
import { Link } from "react-router-dom";
import { Table } from "antd";
import EmployeeListFilter from "../../../components/EmployeeListFilter";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AllEmployeeAddPopup from "../../../components/modelpopup/AllEmployeeAddPopup";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import SearchBox from "../../../components/SearchBox";
import { EMPLOYEE_MUTATION_KEY, EMPLOYEE_QUERY_KEY, useDeleteEmployee, useGetAllEmployee } from "../../../api/hooks/employees/allEmployee.ts";
import { useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "../../../utils/index.ts";

const EmployeeList = () => {
  // const {data} = useGetAllEmployee();
  const [edit, setUs] = useState("");
   const [deleteModal, setDeleteModal] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const { mutateAsync } = useDeleteEmployee();
   const queryClient = useQueryClient();
     const [currentPage, setCurrentPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);
     const { data: employeeResponse, isLoading } = useGetAllEmployee(currentPage, pageSize);
     const employee = employeeResponse?.data || [];
     const paginationInfo = employeeResponse?.pagination || {};
     const handleTableChange = (page, newPageSize) => {
       setCurrentPage(page);
     };
     const handlePageSizeChange = (newSize) => {
       setPageSize(newSize);
       setCurrentPage(1);
     };
   async function deleteEmployee() {
       try {
         const response = await mutateAsync(selectedId);
         queryClient.invalidateQueries({ queryKey: [EMPLOYEE_MUTATION_KEY] });
         if (response?.success) {
           successToast(response.message);
           queryClient.invalidateQueries({ queryKey: [EMPLOYEE_QUERY_KEY] })
           setDeleteModal(false)
         }
       } catch (error) {
         errorToast(error);
       }
     }
  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      render: (text, record) => (
        <span className="table-avatar">
          {/* <Link to="/profile" className="avatar">
            <img alt="" src={record.image} />
          </Link> */}
          <Link to="/profile">
            {text} <span>{record?.designationId?.designationName}</span>
          </Link>
        </span>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },    
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      sorter: (a, b) => a.employeeId.length - b.employeeId.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "Mobile",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },

    {
      title: "Join Date",
      dataIndex: "joiningDate",
      sorter: (a, b) => new Date(a.joiningDate) - new Date(b.joiningDate),
      render: (date) => date.split("T")[0],
    },
    
    // {
    //   title: "Role",
    //   sorter: true,
    //   render: () => (
    //     <div className="dropdown">
    //       <Link
    //         to="#"
    //         className="btn btn-white btn-sm btn-rounded dropdown-toggle"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         Web Developer{" "}
    //       </Link>
    //       <div className="dropdown-menu">
    //         <Link className="dropdown-item" to="#">
    //           Software Engineer
    //         </Link>
    //         <Link className="dropdown-item" to="#">
    //           Software Tester
    //         </Link>
    //         <Link className="dropdown-item" to="#">
    //           Frontend Developer
    //         </Link>
    //         <Link className="dropdown-item" to="#">
    //           UI/UX Developer
    //         </Link>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      title: "Action",
      sorter: true,
      render: (text, record) => (
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
              data-bs-target="#add_employee"
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
    <div>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Employee"
            title="Dashboard"
            subtitle="Employee"
            modal="#add_employee"
            name="Add Employee"
            Linkname="/employees"
            Linkname1="/employees-list"
          />
          {/* /Page Header */}
          {/* <EmployeeListFilter /> */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
                <Table
                  className="table-striped"
                  columns={columns}
                  dataSource={employee}
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
        <AllEmployeeAddPopup id={edit} setUs={setUs}/>
        <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={deleteEmployee}
        name="Delete Employee"
        ID={selectedId}
      />
      </div>
    </div>
  );
};

export default EmployeeList;
