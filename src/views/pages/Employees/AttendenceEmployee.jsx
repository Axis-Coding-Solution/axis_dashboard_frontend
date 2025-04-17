import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import AttendanceEmployeeFilter from "../../../components/AttendanceEmployeeFilter";
import { base_url } from "../../../base_urls";
import { useAttendenceMutation, useGetAllAttendence, useGetAllStats, useUpdateAttendence } from "../../../api/hooks/employees/attendanceEpmloyees.ts";
import { attendanceInitialValue } from "../../../utils/constants/attendance.ts";
import { AttendanceSchema } from "../../../utils/validation-schemas/attendance.ts";

const AttendanceEmployee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [punchId, setPunchId] = useState(null);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { mutateAsync: punchIn } = useAttendenceMutation();
  const { mutateAsync: punchOut } = useUpdateAttendence();
  const { data: apiData } = useGetAllAttendence(currentPage, pageSize);
  const { data: stats } = useGetAllStats();

  const record = apiData?.data || [];
  const paginationInfo = apiData?.pagination || {};

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedPunchId = localStorage.getItem("punchId");
    const storedPunchStatus = localStorage.getItem("isPunchedIn") === "true";
    const storedPunchTime = localStorage.getItem("punchTime");

    if (storedPunchId) setPunchId(storedPunchId);
    if (storedPunchStatus) setIsPunchedIn(true);
    if (storedPunchTime) setPunchTime(parseInt(storedPunchTime, 10));
  }, []);

  const handlePunch = async () => {
    try {
      if (!isPunchedIn) {
        const punchInTime = Date.now();
        const response = await punchIn({ isPunch: true });
        const id = response?.data?._id;

        if (id) {
          localStorage.setItem("punchId", id);
          localStorage.setItem("isPunchedIn", "true");
          localStorage.setItem("punchTime", punchInTime);
          setPunchId(id);
          setIsPunchedIn(true);
          setPunchTime(punchInTime);
        }
      } else {
        if (!punchId) return console.error("No active punch-in record found.");
        await punchOut({ punchId, data: { isPunch: false } });

        localStorage.removeItem("punchId");
        localStorage.removeItem("isPunchedIn");
        localStorage.removeItem("punchTime");

        setPunchId(null);
        setIsPunchedIn(false);
        setPunchTime(null);
      }
    } catch (error) {
      console.error("Error during punch:", error);
    }
  };

  useEffect(() => {
    axios.get(`${base_url}/api/attendenceemployee.json`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs maintitle="Attendance" title="Dashboard" subtitle="Attendance" />
        <div className="row">
          <div className="col-md-6">
            <div className="card punch-status">
              <div className="card-body">
                <h5 className="card-title">Timesheet <small className="text-muted">{new Date().toLocaleDateString()}</small></h5>
                <div className="punch-det"><h6>Time Clock</h6><p>{new Date().toLocaleTimeString()}</p></div>
                <div className="punch-det"><h6>Punch In at</h6><p>{punchTime ? new Date(punchTime).toLocaleTimeString() : "--"}</p></div>
                <div className="punch-info">
                  <div className="punch-hours">
                    <span>{isPunchedIn ? `${Math.floor((currentTime - punchTime) / 3600000)} hrs` : "0 hrs"}</span>
                  </div>
                </div>
                <div className="punch-btn-section">
                  <button onClick={handlePunch} className="btn btn-primary punch-btn">{isPunchedIn ? "Punch Out" : "Punch In"}</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card att-statistics">
              <div className="card-body">
                <h5 className="card-title">Statistics</h5>
                <div className="stats-list">
                  <div className="stats-info"><p>Today Hours: <strong>{stats?.todayHours || 0} hrs</strong></p></div>
                  <div className="stats-info"><p>Weekly Hours: <strong>{stats?.weeklyHours || 0} hrs</strong></p></div>
                  <div className="stats-info"><p>Monthly Hours: <strong>{stats?.monthlyHours || 0} hrs</strong></p></div>
                  <div className="stats-info"><p>Remaining Hours: <strong>{stats?.remaining || 0} hrs</strong></p></div>
                  <div className="stats-info"><p>Overtime: <strong>{stats?.overtime || 0} hrs</strong></p></div>
                </div>
              </div>
            </div>
          </div>
     
        </div>

        <AttendanceEmployeeFilter />
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <Table
                columns={[
                  { title: "#", dataIndex: "id", sorter: (a, b) => b.id - a.id },
                  { title: "Date", dataIndex: "date", sorter: (a, b) => new Date(b.date) - new Date(a.date) },
                  { title: "PunchIn", dataIndex: "punchIn", sorter: (a, b) => new Date(b.punchIn) - new Date(a.punchIn) },
                  { title: "PunchOut", dataIndex: "punchOut", sorter: (a, b) => new Date(b.punchOut) - new Date(a.punchOut) },
                  { title: "Break", dataIndex: "break", sorter: (a, b) => b.break - a.break },
                  { title: "Overtime", dataIndex: "overtime", sorter: (a, b) => b.overtime - a.overtime },
                ]}
                dataSource={record.map((item, index) => ({
                  key: item._id || index,
                  id: index + 1,
                  date: new Date(item.date).toLocaleDateString(),
                  punchIn: item.punchIn || "N/A",
                  punchOut: item.punchOut || "N/A",
                  break: item.break || 0,
                  overtime: item.overtime || 0,
                }))}
                rowKey={(record) => record.id}
                pagination={{
                  current: paginationInfo.currentPage || currentPage,
                  pageSize: paginationInfo.itemsPerPage || pageSize,
                  total: paginationInfo.totalItems || 0,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  onChange: setCurrentPage,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AttendanceEmployee;
