import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import {
  Avatar_06,
  Avatar_07,
  Avatar_14,
  Avatar_18,
  Avatar_19,
  Avatar_22,
  Avatar_26,
  Avatar_29,
} from "../../../Routes/ImagePath";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import { ClientModelPopup } from "../../../components/modelpopup/ClientModelPopup";
import SearchBox from "../../../components/SearchBox";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ClientsFilter from "../../../components/ClientsFilter";
import { CLIENT_MUTATION_KEY, CLIENT_QUERY_KEY, useDeleteClient, useGetAllClient } from "../../../api/hooks/client/index.ts";
import { useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "../../../utils/index.ts";

const ClientList = () => {
  const [edit, setUs] = useState("");
  const queryClient = useQueryClient();
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: clientResponse, isLoading } = useGetAllClient(currentPage, pageSize);
  const client = clientResponse?.data || [];
  const paginationInfo = clientResponse?.pagination || {};
  const handleTableChange = (page, newPageSize) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };
//delete
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { mutateAsync } = useDeleteClient();
  async function deleteEmployee() {
    try {
      const response = await mutateAsync(selectedId);
      queryClient.invalidateQueries({ queryKey: [CLIENT_MUTATION_KEY] });
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries({ queryKey: [CLIENT_QUERY_KEY] })
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
      // render: (text, record) => (
      //   <span className="table-avatar">
      //     <Link to="/profile" className="avatar">
      //       <img alt="" src={record.Image} />
      //     </Link>
      //     <Link to="/profile">{text}</Link>
      //   </span>
      // ),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
    },
    {
      title: " ClientId ",
      dataIndex: "clientId",
      sorter: (a, b) => a.clientId.length - b.clientId.length,
    },

    // {
    //   title: "Contact Person",
    //   dataIndex: "ContactPerson",
    //   sorter: (a, b) => a.ContactPerson.length - b.ContactPerson.length,
    // },
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
    // {
    //   title: "Status",
    //   dataIndex: "Status",
    //   render: (text) => (
    //     <div className="dropdown">
    //       <Link
    //         to="#"
    //         className="btn btn-white btn-sm btn-rounded dropdown-toggle"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i
    //           className={
    //             text === "Active"
    //               ? "far fa-dot-circle text-success"
    //               : "far fa-dot-circle text-danger"
    //           }
    //         />{" "}
    //         {text}{" "}
    //       </Link>
    //       <div className="dropdown-menu">
    //         <Link className="dropdown-item" to="#">
    //           <i className="far fa-dot-circle text-success" /> Active
    //         </Link>
    //         <Link className="dropdown-item" to="#">
    //           <i className="far fa-dot-circle text-danger" /> Inactive
    //         </Link>
    //       </div>
    //     </div>
    //   ),
    //   sorter: (a, b) => a.Status.length - b.Status.length,
    // },
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
              data-bs-target="#add_client"
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
      sorter: true,
    },
  ];
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Clients"
            title="Dashboard"
            subtitle="Clients"
            modal="#add_client"
            name="Add Client"
            Linkname="/clients"
            Linkname1="/clients-list"
          />
          {/* /Page Header */}
          {/* <ClientsFilter /> */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
                <Table
                  className="table-striped"
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={client}
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
      </div>
      <ClientModelPopup id={edit} setUs={setUs} />
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={deleteEmployee}
        name="Delete Employee"
        ID={selectedId}
      />
    </>
  );
};

export default ClientList;
