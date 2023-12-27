import React from 'react';
import { ReactFormBuilder, ElementStore } from 'react-form-builder2';
import CreateFormPreview from "./create-form-header";
import {  useNavigate, useParams } from "react-router-dom";
import { api_nestjs } from "../utils/api"; 
import {useQuery,useMutation} from 'react-query'
import 'react-form-builder2/dist/app.css';




const EditForm = () => {


    const { formId } = useParams();
    const navigate = useNavigate();
    
//get form with id 
    const { data : formData, isLoading} = useQuery(`/forms/${formId}`, () =>  
  
    api_nestjs.get(`/forms/${formId}`),
    { 
      onSuccess : (data) => {
  
       console.log(data)
  
      },
      
    });


//edit form
    const {
     
      mutate,
    } = useMutation(async (params) => await api_nestjs.post(`forms/update/${formId}`, params),
        {  
          onSuccess : (data) => {

            navigate('/')
            

          }
        }
    );
  

    const [formDataEdit, setFormDataEdit] = React.useState([]);
    const [previewVisible, setPreviewVisible] = React.useState(false)

    React.useEffect(() => {

        ElementStore.subscribe((state) => setFormDataEdit(state.data));
      }, []);
    

      const showPreview = () => {
        setPreviewVisible(true);
      };

      const closePreview = () => {
        setPreviewVisible(false);
      };

      const saveForm =  () => {

        console.log({formDataEdit})


        let form_data = {

            id : formData._id,
            data : formDataEdit
        }

         mutate(form_data); 

      }

      
if(isLoading){

  return (<div>Loading ...</div>)
}


return(
    <div>

<div className="clearfix" style={{ margin: '10px', width: '70%' }}>
      <h4 className="float-left">Generate form : </h4>
      <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={showPreview}>
        Preview Form
      </button>

      <button className="btn btn-success float-right" style={{ marginRight: '10px' }} onClick={saveForm}>
        Modify Form
      </button>

      {previewVisible && (<CreateFormPreview  data={formDataEdit} previewVisible={previewVisible} closePreview={closePreview} />) }


      </div>

    <ReactFormBuilder

      data={formData.data}
      locale='en'
      saveAlways={false}  

    />
    
    </div>)
    
};
  
  export default EditForm;