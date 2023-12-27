import React from "react";
import { Link } from "react-router-dom";
import { api_nestjs } from "../utils/api"; 
import FormPreview from "./create-form-header";
import { useQuery, useMutation } from "react-query";
import toast from "react-hot-toast";
import { ShareSocial } from "react-share-social";

const Forms = () => {
  const [selectedForm, setSelectedForm] = React.useState({});

  const [previewVisible, setPreviewVisible] = React.useState(false);

  const [sharePopup, setSharePopup] = React.useState(false);

  const showPreview = (form) => {
    setSelectedForm(form.data);
    setPreviewVisible(true);
  };

  const closePreview = () => {
    setPreviewVisible(false);
  };
/*

      query to get all form

      */
  const {
    data: forms,
    
    refetch,
  } = useQuery(`/forms`, () => api_nestjs.get(`/forms`), {
    onSuccess: (data) => {
      console.log(data);
    },
  });


  /*

      mutation form delete form
  */
  const {
    
    mutate,
  } = useMutation(
    async (params) => await api_nestjs.post(`forms/remove/${params.id}`, {}),
    {
      onSuccess: (data) => {
        toast.success("Successfully deleted!");

        refetch();
      },
    }
  );

  const handleDelete = (formId) => {
    mutate({ id: formId });
  };

  // to share link in social media 

  const handleShare = (form) => {
    setSharePopup(true);
    setSelectedForm(form);
  };

  return (
    <div className="container">
      {previewVisible && (
        <FormPreview
          data={selectedForm}
          previewVisible={previewVisible}
          closePreview={closePreview}
        />
      )}
      <div className="my-5 d-flex justify-content-between align-items-center">
        <h1>Forms</h1>
        <Link to={"/create-form"} className="btn btn-outline-primary">
          Create Form
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Form Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms && forms.length > 0 ? (
              forms.map((form) => (
                <tr key={form._id}>
                  <td>{form._id}</td>
                  <td>{form.name}</td>
                  <td>
                    <button
                      onClick={() => showPreview(form)}
                      className="btn btn-primary mx-1"
                    >
                      Preview
                    </button>
                    <Link
                      to={`/view-form/${form._id}`}
                      className="btn btn-success mx-1"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-form/${form._id}`}
                      className="btn btn-warning mx-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(form._id)}
                      className="btn btn-danger mx-1"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleShare(form)}
                      className="btn btn-secondary mx-1"
                    >
                      Share
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {sharePopup && (
        <ShareModal form={selectedForm} setShowModal={setSharePopup} />
      )}
    </div>
  );
};

const ShareModal = ({ form, setShowModal }) => {
  let form_link = `${window.location.origin}/view-form/${form._id}`;

  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{form.name}</h5>
            <button
              type="button"
              className="close"
              onClick={() => setShowModal(false)}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ShareSocial
              url={form_link}
              socialTypes={[
                "facebook",
                "twitter",
                "whatsapp",
                "linkedin",
                "telegram",
              ]}
              onSocialButtonClicked={(data) => toast.success("shared")}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
