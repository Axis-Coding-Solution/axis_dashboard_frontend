import React from "react";
import { Link } from "react-router-dom";

const DeleteModal = ({ isOpen, onClose, onDelete, name, ID }) => {
  return (
    <>
      <div
      className={`modal custom-modal fade ${isOpen ? "show" : ""}`}
        role="dialog"
        style={{ display: isOpen ? "block" : "none" }}
        aria-hidden={!isOpen}
        >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>{name}</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <Link to="#" className="btn btn-primary continue-btn" onClick={() => onDelete(ID)}>
                      Delete
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      to="#"
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                      onClick={onClose}
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
