import React from "react";
import { ReactFormGenerator } from "react-form-builder2";

const CreateFormHeader = ({ data, previewVisible, closePreview }) => {
  let modalClass = "modal";
  if (previewVisible) {
    modalClass += " show d-block";
  }

  return (
    <div className={modalClass}>
      <div className="modal-dialog">
        <div className="modal-content">
          <ReactFormGenerator
            answer_data={{}}
            hide_actions={true}
            data={data}
          />

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={closePreview}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFormHeader;
