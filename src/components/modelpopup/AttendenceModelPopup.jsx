import React from "react";
import { useGetByIdAttendenceEmployee } from "../../api/hooks/employees/attendanceEpmloyees.ts";

const AttendenceModelPopup = ({ attendanceId }) => {
  const { data: attendance } = useGetByIdAttendenceEmployee(attendanceId);
  if (!attendance) {
    return null; 
  }
  return (
    
    <div className="modal custom-modal fade" id="attendance_info" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Attendance Info</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="card punch-status">
                <div className="card-body">
                  <h5 className="card-title">
                    Timesheet{" "}
                    <small className="text-muted">
                    <p>{new Date(attendance.date).toLocaleDateString("en-CA")}</p>

                    </small>
                  </h5>

                  <div className="punch-det">
                    <h6>Punch In at</h6>
                    <p>{attendance.punchIn}</p>
                  </div>

                  <div className="punch-info">
                    <div className="punch-hours">
                      <span>{attendance.totalHours} hrs</span>
                    </div>
                  </div>

                  <div className="punch-det">
                    <h6>Punch Out at</h6>
                    <p>{attendance.punchOut}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default AttendenceModelPopup;
