/* eslint-disable no-unused-expressions */

import { Table } from "antd";
import { AddHoliday } from "../../../components/modelpopup/AddHoliday";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { base_url } from "../../../base_urls";
import { HOLIDAY_MUTATION_KEY, HOLIDAY_QUERY_KEY, useDeleteHoliday, useGetAllHoliday } from "../../../api/hooks/employees/holiday.ts";
import { errorToast, successToast } from "../../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";

const Holidays = () => {
  const { data } = useGetAllHoliday();
  const [edit, setUs] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const queryClient = useQueryClient();
  const { mutateAsync } = useDeleteHoliday();
  async function deleteEmployee() {
    try {
      const response = await mutateAsync(selectedId);
      queryClient.invalidateQueries({ queryKey: [HOLIDAY_MUTATION_KEY] });
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries({ queryKey: [HOLIDAY_QUERY_KEY] })
        setDeleteModal(false)
      }
    } catch (error) {
      errorToast(error);
    }
  }


  const columns = [
    {
      title: "#",
      render: (text, record, index) => <span>{index + 1}</span>,
    }
    ,
    {
      title: "Title",
      dataIndex: "holidayName",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.Title.length - b.Title.length,
    },
    {
      title: "HolidayDate",
      dataIndex: "holidayDate",
      render: (text) => <span>{text ? text.split("T")[0] : ""}</span>,
      sorter: (a, b) => new Date(a.holidayDate) - new Date(b.holidayDate),
    },

    {
      title: "Day",
      dataIndex: "day",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.Day.length - b.Day.length,
    },
    {
      title: "Action",
      render: (record) => (
        <div className="dropdown dropdown-action ">
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
              data-bs-target="#add_holiday"
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
              <i className="fa-regular fa-trash-can m-r-5" /> Delete
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
        {/* Page Content */}
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Holidays"
            title="Dashboard"
            subtitle="Holidays"
            modal="#add_holiday"
            name="Add Holiday"
          />

          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data?.length > 0 ? data : []}
                  className="table-striped"
                  rowKey={(record) => record.id}
                  locale={{ emptyText: 'No records found' }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
      <AddHoliday id={edit} setUs={setUs}/>
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={deleteEmployee}
        name="Delete Holiday"
        ID={selectedId}
      />
    </>
  );
};

export default Holidays;
