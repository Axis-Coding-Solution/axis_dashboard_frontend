import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import SearchBox from "../../../components/SearchBox";
import DepartmentModal from "../../../components/modelpopup/DepartmentModal";
import { DEPARTMENT_MUTATION_KEY, DEPARTMENT_QUERY_KEY, useDeleteDepartment, useGetAllDepartment, useGetByIdDepartment } from "../../../api/hooks/employees/department.ts";
import { useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "../../../utils/index.ts";

const Department = () => {
  const [edit, setUs] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const queryClient = useQueryClient();
  const { data } = useGetAllDepartment();
  const { mutateAsync } = useDeleteDepartment();
  async function deleteDepartment() {
    try {
      const response = await mutateAsync(selectedId);
      queryClient.invalidateQueries({ queryKey: [DEPARTMENT_MUTATION_KEY] });
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries({ queryKey: [DEPARTMENT_QUERY_KEY] })
        setDeleteModal(false)
      }
    } catch (error) {
      errorToast(error);
    }
  }

  const columns = [
    {
      title: "#",
      dataIndex: "_id",
      sorter: (a, b) => a._id.length - b._id.length,
      width: "10%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Department Name",
      dataIndex: "departmentName",
      sorter: (a, b) => a.departmentName.length - b.departmentName.length,
      width: "80%",
    },
    {
      title: "Action",
      className: "text-end",
      render: (text, record) => {
        return (
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
                data-bs-target="#department"
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
        );
      },
      sorter: (a, b) => a.departmentName.length - b.departmentName.length,
      width: "10%",
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Department"
            title="Dashboard"
            subtitle="Department"
            modal="#department"
            name="Add Department"
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox />
                <Table
                  columns={columns}
                  dataSource={data?.length > 0 ? data : []}
                  className="table-striped"
                  rowKey={(record) => record._id}
                  locale={{ emptyText: 'No records found' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DepartmentModal id={edit} setUs={setUs} />

      {/* Pass the delete function and selected ID to the DeleteModal */}
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={deleteDepartment}
        name="Delete Department"
        ID={selectedId}
      />
    </>
  );
};

export default Department;
