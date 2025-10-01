import { Table } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar_05 } from '../../../Routes/ImagePath'
import { LEAVESETTINGS_MUTATION_KEY, LEAVESETTINGS_QUERY_KEY, useDeleteLeaveSettings, useGetAllLeaveSettings } from '../../../api/hooks/employees/leaveSettings.ts'
import DeleteModal from '../../../components/modelpopup/DeleteModal.jsx'
import LeaveSettingAddModelPopup from '../../../components/modelpopup/LeaveSettingAddModelPopup'
import { useQueryClient } from '@tanstack/react-query'
import { errorToast, successToast } from '../../../utils/index.ts'

const LeaveSettingCustomPolicy = () => {
  const { data, isLoading } = useGetAllLeaveSettings();
  const { mutateAsync } = useDeleteLeaveSettings();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const queryClient = useQueryClient();
  const [edit, setUs] = useState("");
  async function deleteEmployee() {
    try {
      const response = await mutateAsync(selectedId);
      queryClient.invalidateQueries({ queryKey: [LEAVESETTINGS_MUTATION_KEY] });
      if (response?.success) {
        successToast(response.message);
        queryClient.invalidateQueries({ queryKey: [LEAVESETTINGS_QUERY_KEY] })
        setDeleteModal(false)
      }
    } catch (error) {
      errorToast(error);
    }
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "policyName",
      key: "policyName",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.policyName.localeCompare(b.policyName),
    },
    {
      title: "Days",
      dataIndex: "noOfDays",
      key: "noOfDays",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.noOfDays - b.noOfDays,
    },
    {
      title: "",
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
              data-bs-target="#add_custom_policy"
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
    },
  ];

  return (
    <div>
      {/* Custom Policy */}
      <div className="custom-policy">
        <div className="leave-header">
          <div className="title">Custom policy</div>
          <div className="leave-action">
            <button
              className="btn btn-sm btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#add_custom_policy">
              <i className="fa fa-plus" /> Add custom policy
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={
              data
                ?.filter(item => item.isCustomPolicy && item.type === "annual")
                .map(item => ({
                  key: item._id, // this is still needed for rowKey
                  _id: item._id, // this is needed for delete
                  policyName: item.policyName,
                  noOfDays: item.noOfDays
                }))

            }
            loading={isLoading}
            className="table-striped"
            rowKey={(record) => record.key}
          />



        </div>
      </div>
      <LeaveSettingAddModelPopup id={edit} setUs={setUs}/>

      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={deleteEmployee}
        name="Delete Custoem Leave"
        ID={selectedId}
      />
    </div>
  )
}

export default LeaveSettingCustomPolicy
