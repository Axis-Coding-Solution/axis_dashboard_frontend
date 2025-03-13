import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import AddDesingnationModelPopup from "../../../components/modelpopup/AddDesingnationModelPopup";
import SearchBox from "../../../components/SearchBox";
import { base_url } from "../../../base_urls";
import { DSIGNATION_MUTATION_KEY, DSIGNATION_QUERY_KEY, useDeleteDesignation, useGetAllDesignation } from "../../../api/hooks/employees/designations.ts";
import { errorToast, successToast } from "../../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";

const Designation = () => {
  const [edit, setEdit] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const queryClient = useQueryClient();
  const { data: designationResponse, isLoading } = useGetAllDesignation(currentPage, pageSize);
  const designations = designationResponse?.data || [];
  const paginationInfo = designationResponse?.pagination || {};
  const handleTableChange = (page, newPageSize) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const { mutateAsync } = useDeleteDesignation();
  const [selectedId, setSelectedId] = useState(null);

  async function deleteDesignation() {
    try {
      const response = await mutateAsync(selectedId);
      queryClient.invalidateQueries({ queryKey: [DSIGNATION_MUTATION_KEY] });
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries({ queryKey: [DSIGNATION_QUERY_KEY] });
        setDeleteModal(false);
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
      dataIndex: "departmentId",
      sorter: (a, b) => (a.departmentId?.departmentName || "").length - (b.departmentId?.departmentName || "").length,
      width: "40%",
      render: (departmentId) => departmentId?.departmentName || "NOT SELECTED",
    },
    {
      title: "Designation",
      dataIndex: "designationName",
      sorter: (a, b) => a.designationName.length - b.designationName.length,
      width: "40%",
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
                data-bs-target="#designation"
                onClick={() => setEdit(record)}
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
      sorter: (a, b) => a.length - b.length,
      width: "10%",
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Designations"
            title="Dashboard"
            subtitle="Designations"
            modal="#designation"
            name="Add Designation"
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
                <Table
                  columns={columns}
                  dataSource={designations}
                  className="table-striped"
                  rowKey={(record) => record._id}
                  loading={isLoading}
                  locale={{ emptyText: "No records found" }}
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
      </div>

      <AddDesingnationModelPopup editData={edit} setedit={setEdit} />
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={deleteDesignation}
        name="Delete Designation"
        ID={selectedId}
      />
    </div>
  );
};

export default Designation;
