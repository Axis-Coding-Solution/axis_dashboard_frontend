import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar_02,
  Avatar_03,
  Avatar_04,
  Avatar_05,
  Avatar_08,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_12,
  Avatar_13,
  Avatar_19,
} from "../../../Routes/ImagePath";
import AllEmployeeAddPopup from "../../../components/modelpopup/AllEmployeeAddPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import EmployeeListFilter from "../../../components/EmployeeListFilter";
import { EMPLOYEE_MUTATION_KEY, EMPLOYEE_QUERY_KEY, useDeleteEmployee, useGetAllEmployee } from "../../../api/hooks/employees/allEmployee.ts";
import { useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "../../../utils/index.ts";

const AllEmployee = () => {
  const { data: employeeData, isLoading } = useGetAllEmployee();
  console.log("employeeData:", employeeData);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  // Safely access the array of employees
  const employees = employeeData?.data ?? [];
    const { mutateAsync } = useDeleteEmployee();
    const [deleteModal, setDeleteModal] = useState(false);
    const queryClient = useQueryClient();
    const [selectedId, setSelectedId] = useState(null);
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
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Employee"
            title="Dashboard"
            subtitle="Employee"
            modal="#add_employee"
            name="Add Employee"
            Linkname="/employees"
            Linkname1="/employees-list"
          />

          <EmployeeListFilter />

          {isLoading ? (
            <div className="text-center my-5">
              <h5>Loading employees...</h5>
            </div>
          ) : (
            <div className="row">
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <div
                    className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                    key={employee._id}
                  >
                    <div className="profile-widget">
                      <div className="profile-img">
                        <Link to={`/profile`} className="avatar">
                          <img
                            src={employee.profileImage || "/assets/img/default-avatar.jpg"}
                            style={{ cursor: 'pointer' }}
                          />
                        </Link>

                      </div>
                      <div className="dropdown profile-action">
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
                            onClick={() => {
                              setSelectedId(employee._id);
                              setDeleteModal(true);
                            }}
                          >
                            <i className="fa-regular fa-trash-can m-r-5" /> Delete
                          </Link>
                        </div>
                      </div>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                        <Link to={`/profile/${employee._id}`}>
                          {employee.firstName} {employee.lastName}
                        </Link>
                      </h4>
                      <div className="small text-muted">{employee.designationId?.designationName}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center my-4">
                  <p>No employees found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AllEmployeeAddPopup />
      <DeleteModal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onDelete={deleteEmployee}
          name="Delete Employee"
          ID={selectedId}
        />
    </div>
  );
};

export default AllEmployee;
