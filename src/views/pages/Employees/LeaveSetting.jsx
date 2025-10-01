/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import LeaveSettingCustomPolicy from "./LeaveSettingCustomPolicy";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import LeaveSettingAddModelPopup from "../../../components/modelpopup/LeaveSettingAddModelPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useAddLeaveSettings, useEditLeaveSettings, useGetAllLeaveSettings } from "../../../api/hooks/employees/leaveSettings.ts";
import { errorToast, successToast } from "../../../utils/index.ts";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { leaveGenaricInitialValue } from "../../../utils/constants/leaveSettings.ts";
import { leaveGenaricSchema } from "../../../utils/validation-schemas/leaveSettings.ts";
import AnnualLeave from "./Annual.jsx";
import SickLeave from "./SickLeave.jsx";
import HospitalisationLeave from "./Hospitalisation.jsx";
import MaternityLeave from "./Maternity.jsx";
import PaternityLeave from "./Paternity.jsx";
import LOPLeave from "./LOP.jsx";

const LeaveSettings = () => {
  const [show, setShow] = useState(false);
  const [carryFrwd, setCarryfrwd] = useState(false);
  const [carryEarned, setCarryearned] = useState(false);
  const [sickDay, setSickday] = useState(false);
  const [hosp, setHosp] = useState(false);
  const [maternty, setMaternty] = useState(false);
  const [paternty, setPaternty] = useState(false);
  const [lopDays, setLopdays] = useState(false);
  const [lopCarryfrwd, setLopcarryfrwd] = useState(false);
  const [lopEarn, setLopearn] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const carryFrwdshow = () => {
    setCarryfrwd(true);
  };

  const carryFrwdclose = () => {
    setCarryfrwd(false);
  };
  const carryEarnedshow = () => {
    setCarryearned(true);
  };
  const carryEarnedclose = () => {
    setCarryearned(false);
  };

  const sickDayshow = () => {
    setSickday(true);
  };
  const sickDayclose = () => {
    setSickday(false);
  };
  const hospShow = () => {
    setHosp(true);
  };

  const hospClose = () => {
    setHosp(false);
  };
  const materntyShow = () => {
    setMaternty(true);
  };

  const materntyClose = () => {
    setMaternty(false);
  };
  const paterntyShow = () => {
    setPaternty(true);
  };

  const paterntyClose = () => {
    setPaternty(false);
  };
  const lopDayshow = () => {
    setLopdays(true);
  };

  const lopDayclose = () => {
    setLopdays(false);
  };
  const lopCarryshow = () => {
    setLopcarryfrwd(true);
  };
  const lopCarryclose = () => {
    setLopcarryfrwd(false);
  };
  const lopEarnshow = () => {
    setLopearn(true);
  };

  const lopEarnclose = () => {
    setLopearn(false);
  };
  



  return (
    <>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          {/* <Breadcrumbs
            maintitle="Leave Settings"
            title="Dashboard"
            subtitle="Leave Settings"
            modal="#add_custom_policy"
            name="Add New"
          /> */}
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              {/* Annual Leave */}
              {/* <div className="card leave-box " id="leave_annual">
                <div className="card-body">
                  <div className="h3 card-title with-switch">
                    Annual
                  </div>
                  <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="leave-item">
                      <div className="leave-row">
                        <div className="leave-left">
                          <div className="input-box">
                            <div className="input-block">
                              <label>Days</label>
                              <input
                                type="text"
                                className="form-control"
                                disabled={!show}
                                {...register("noOfDays")}
                              />
                            </div>
                          </div>
                        </div>
                        {show ? (
                          <div className="leave-right">
                            <button
                              type="button"
                              className="btn btn-white leave-cancel-btn"
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              aria-label="Close"
                              className="btn btn-primary leave-save-btn"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="leave-right">
                            <button
                              type="button"
                              className="leave-edit-btn"
                              onClick={handleShow}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>

                  <LeaveSettingCustomPolicy />
                </div>
              </div> */}
              <AnnualLeave />
              {/* /Annual Leave */}
              {/* Sick Leave */}
              
             <SickLeave/>
             {/* <div className="card leave-box" id="leave_sick">
                <div className="card-body">
                  <div className="h3 card-title with-switch">
                    Sick
                  </div>
                  
                  <div className="leave-item">
                    <div className="leave-row">
                      <div className="leave-left">
                        <div className="input-box">
                          <div className="input-block">
                            <label>Days</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled={!sickDay}
                            />
                          </div>
                        </div>
                      </div>

                      {sickDay ? (
                        <div className="leave-right">
                          <button
                            className="btn btn-white leave-cancel-btn"
                            onClick={sickDayclose}
                          >
                            {" "}
                            Cancel
                          </button>
                          <button className="btn btn-primary leave-save-btn">
                            {" "}
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="leave-right">
                          <button
                            className="leave-edit-btn"
                            onClick={sickDayshow}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <LeaveSettingCustomPolicy /> 
              </div>  */}
              
              {/* /Sick Leave */}
              {/* Hospitalisation Leave */}
              {/* <div className="card leave-box" id="leave_hospitalisation">
                <div className="card-body">
                  <div className="h3 card-title with-switch">
                    Hospitalisation
                   
                  </div>
                  <div className="leave-item">
                    <div className="leave-row">
                      <div className="leave-left">
                        <div className="input-box">
                          <div className="input-block">
                            <label>Days</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled={!hosp}
                            />
                          </div>
                        </div>
                      </div>
                      {hosp ? (
                        <div className="leave-right">
                          <button
                            className="btn btn-white leave-cancel-btn"
                            onClick={hospClose}
                          >
                            {" "}
                            Cancel
                          </button>
                          <button className="btn btn-primary leave-save-btn">
                            {" "}
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="leave-right">
                          <button className="leave-edit-btn" onClick={hospShow}>
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div> */}
              <HospitalisationLeave/>
              {/* /Hospitalisation Leave */}
              {/* Maternity Leave */}
              {/* <div className="card leave-box" id="leave_maternity">
                <div className="card-body">
                  <div className="h3 card-title with-switch">
                    Maternity{" "}
                    <span className="subtitle">Assigned to female only</span>
                  
                  </div>
                  <div className="leave-item">
                    <div className="leave-row">
                      <div className="leave-left">
                        <div className="input-box">
                          <div className="input-block">
                            <label>Days</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled={!maternty}
                            />
                          </div>
                        </div>
                      </div>
                      {maternty ? (
                        <div className="leave-right">
                          <button
                            className="btn btn-white leave-cancel-btn"
                            onClick={materntyClose}
                          >
                            {" "}
                            Cancel
                          </button>
                          <button className="btn btn-primary leave-save-btn">
                            {" "}
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="leave-right">
                          <button
                            className="leave-edit-btn"
                            onClick={materntyShow}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div> */}
               <MaternityLeave/>
              {/* /Maternity Leave */}
              {/* Paternity Leave */}
              {/* <div className="card leave-box" id="leave_paternity">
                <div className="card-body">
                  <div className="h3 card-title with-switch">
                    Paternity{" "}
                    <span className="subtitle">Assigned to male only</span>
                   
                  </div>
                  <div className="leave-item">
                    <div className="leave-row">
                      <div className="leave-left">
                        <div className="input-box">
                          <div className="input-block">
                            <label>Days</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled={!paternty}
                            />
                          </div>
                        </div>
                      </div>
                      {paternty ? (
                        <div className="leave-right">
                          <button
                            className="btn btn-white leave-cancel-btn"
                            onClick={paterntyClose}
                          >
                            {" "}
                            Cancel
                          </button>
                          <button className="btn btn-primary leave-save-btn">
                            {" "}
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="leave-right">
                          <button
                            className="leave-edit-btn"
                            onClick={paterntyShow}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div> */}
              <PaternityLeave/>
              {/* /Paternity Leave */}
              {/* Custom Create Leave */}
              {/* <div className="card leave-box mb-0" id="leave_custom01">
                <div className="card-body">
                  <div className="h3 card-title with-switch">
                    LOP
                   
                  </div>
                  <div className="leave-item">
                    <div className="leave-row">
                      <div className="leave-left">
                        <div className="input-box">
                          <div className="input-block">
                            <label>Days</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled={!lopDays}
                            />
                          </div>
                        </div>
                      </div>
                      {lopDays ? (
                        <div className="leave-right">
                          <button
                            className="btn btn-white leave-cancel-btn"
                            onClick={lopDayclose}
                          >
                            {" "}
                            Cancel
                          </button>
                          <button className="btn btn-primary leave-save-btn">
                            {" "}
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="leave-right">
                          <button
                            className="leave-edit-btn"
                            onClick={lopDayshow}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                  <LeaveSettingCustomPolicy />
                </div>
              </div> */}
               <LOPLeave/>
            </div>
            {/* /Custom Create Leave */}
          </div>
        </div>
      </div>
      {/* /Page Content */}

      {/* <LeaveSettingAddModelPopup /> */}
      {/* <DeleteModal Name="Custom Policy" /> */}
    </>
  );
};

export default LeaveSettings;
