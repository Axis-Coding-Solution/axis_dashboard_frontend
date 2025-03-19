import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectsFilter from "../../../../components/ProjectsFilter";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import SearchBox from "../../../../components/SearchBox";
import { Table } from "antd";
import {
  Avatar_01,
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_13,
  Avatar_16,
} from "../../../../Routes/ImagePath";
import DeleteModal from "../../../../components/modelpopup/DeleteModal";
import ProjectModelPopup from "../../../../components/modelpopup/ProjectModelPopup";
import { PROJECT_MUTATION_KEY, PROJECT_QUERY_KEY, useDeleteProject, useGetAllProject } from "../../../../api/hooks/project/project.ts";
import { errorToast, successToast } from "../../../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";

const ProjectList = () => {
  const [edit, setUs] = useState("");
 const [currentPage, setCurrentPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);
  const { data: projectResponse, isLoading } = useGetAllProject(currentPage, pageSize);
  const project = projectResponse?.data || [];
  const paginationInfo = projectResponse?.pagination || {};
  const handleTableChange = (page, newPageSize) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };
  const [deleteModal, setDeleteModal] = useState(false);
  const { mutateAsync } = useDeleteProject();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState(null);
  async function deleteEmployee() {
    try {
      const response = await mutateAsync(selectedId);
      queryClient.invalidateQueries({ queryKey: [PROJECT_MUTATION_KEY] });
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEY] })
        setDeleteModal(false)
      }
    } catch (error) {
      errorToast(error);
    }
  }

  const columns = [
    {
      title: "Project",
      dataIndex: "projectName",
      sorter: (a, b) => a.projectName.length - b.projectName.length,
    },
    // {
    //   title: "ProjectId",
    //   dataIndex: "ProjectId",
    //   sorter: (a, b) => a.ProjectId.length - b.ProjectId.length,
    // },
    {
      title: "Team",
      dataIndex: "team", // you can set a dummy index if you're using render
      render: (text, record) => {
        const leaderName = record.projectLeader?.firstName || "N/A";
        const memberNames = record.teamMembers?.map(member => member.firstName).join(", ") || "No Members";
  
        return (
          <div>
            <div><strong>Project Leader:</strong> {leaderName}</div>
            <div><strong>Team Members:</strong> {memberNames}</div>
          </div>
        );
      },
      sorter: (a, b) => {
        const aLeader = a.projectLeader?.firstName || "";
        const bLeader = b.projectLeader?.firstName || "";
        return aLeader.localeCompare(bLeader);
      }
    },
    {
      title: "Deadline",
      dataIndex: "endDate",
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
      render: (date) => typeof date === "string" ? date.split("T")[0] : "-",

    },
    // {
    //   title: "Status",
    //   dataIndex: "Status",
    //   render: (text) => (
    //     <div className="dropdown action-label">
    //       <Link
    //         className="btn btn-white btn-sm btn-rounded dropdown-toggle"
    //         to="#"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i
    //           className={
    //             text === "Inactive"
    //               ? "far fa-dot-circle text-danger"
    //               : "far fa-dot-circle text-success"
    //           }
    //         />{" "}
    //         {text}
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
    // {
    //   title: "Priority",
    //   dataIndex: "priority",
    //   render: () => (
    //     <div className="dropdown action-label">
    //       <Link
    //         className="btn btn-white btn-sm btn-rounded dropdown-toggle"
    //         to="#"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i className="far fa-dot-circle text-danger" /> High
    //       </Link>
    //       <div className="dropdown-menu dropdown-menu-right">
    //         <Link className="dropdown-item" to="#">
    //           <i className="far fa-dot-circle text-danger" /> High
    //         </Link>
    //         <Link className="dropdown-item" to="#">
    //           <i className="far fa-dot-circle text-warning" /> Medium
    //         </Link>
    //         <Link className="dropdown-item" to="#">
    //           <i className="far fa-dot-circle text-success" /> Low
    //         </Link>
    //       </div>
    //     </div>
    //   ),
    //   sorter: (a, b) => a.Priority.length - b.Priority.length,
    // },
    {
      title: "Priority",
      dataIndex: "priority",
      sorter: (a, b) => a.priority.length - b.priority.length,
      render: (text) =>
        text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "-",
    },
    {
      title: "Action",
      className: "text-end",
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
              data-bs-target="#create_project"
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
      width: "10%",
    },
  ];
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Projects"
            title="Dashboard"
            subtitle="Projects"
            modal="#create_project"
            name="Create Project"
            Linkname="/projects"
            Linkname1="/project-list"
          />

          {/* /Page Header */}
          <ProjectsFilter />
          <div className="row">
            <div className="col-md-12">
              <SearchBox pageSize={pageSize} onPageSizeChange={handlePageSizeChange}/>

              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={project}
                  className="table table-striped custom-table datatable dataTable no-footer"
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
      <ProjectModelPopup id={edit} setUs={setUs}/>
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={deleteEmployee}
        name="Delete Project"
        ID={selectedId}
      />
    </>
  );
};

export default ProjectList;
