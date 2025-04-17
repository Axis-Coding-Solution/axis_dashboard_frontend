import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar_09,
} from "../../../Routes/ImagePath";
import AttendenceModelPopup from "../../../components/modelpopup/AttendenceModelPopup";
import { useGetAllStatsForAdmin } from "../../../api/hooks/employees/attendanceEpmloyees.ts";

const TableAvatar = () => {
  const { data: statsForAdmin } = useGetAllStatsForAdmin();
  const employees = Array.isArray(statsForAdmin) ? statsForAdmin : [];
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);

  return (
    <>
      <table className="table table-striped custom-table table-nowrap mb-0">
        <thead>
          <tr>
            <th>Employee</th>
            {Array.from({ length: 31 }, (_, i) => (
              <th key={i + 1}>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employeeData) => {
            const { employee, attendance } = employeeData;

            return (
              <tr key={employee.id}>
                <td>
                  <h2 className="table-avatar">
                    <Link className="avatar avatar-xs" to="/profile">
                      <img alt="" src={Avatar_09} />
                    </Link>
                    <Link to="/profile">{employee.firstName}</Link>
                  </h2>
                </td>
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const attendanceRecord = attendance.find(
                    (a) => new Date(a.date).getDate() === day
                  );
                  const isPresent = attendanceRecord ? attendanceRecord.present : false;

                  return (
                    <td key={day}>
                      {isPresent ? (
                        <Link
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#attendance_info"
                          onClick={() => setSelectedAttendanceId(attendanceRecord?.attendanceId)} // Set correct attendance ID
                        >
                          <i className="fa fa-check text-success" />
                        </Link>
                      ) : (
                        <i className="fa fa-close text-danger" />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <AttendenceModelPopup attendanceId={selectedAttendanceId} />
    </>
  );
};

export default TableAvatar;
