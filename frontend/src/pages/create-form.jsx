import React from 'react';
import { ReactFormBuilder, ElementStore } from 'react-form-builder2';
import CreateFormPreview from "./create-form-header";
import {  useNavigate} from "react-router-dom";
import { api_nestjs } from "../utils/api"; 
import randomName from '@scaleway/random-name'
import toast from 'react-hot-toast';


import 'react-form-builder2/dist/app.css';





const CreateForm = () => {

  const navigate = useNavigate();



    const [data, setData] = React.useState([]);

    const [previewVisible, setPreviewVisible] = React.useState(false)

    React.useEffect(() => {

        ElementStore.subscribe((state) => setData(state.data));
      }, []);
    

      const showPreview = () => {
        setPreviewVisible(true);
      };

      const closePreview = () => {
        setPreviewVisible(false);
      };

      //save form 
      const saveForm = async () => {

        console.log({data})


        let form_data = {

            name : randomName('form', '_'),
            data : data
        }

        await api_nestjs.post("forms/add", form_data); 

        toast.success('Form created Successfully !');

        navigate('/')

      }
    


return(
    <div>

<div className="clearfix" style={{ margin: '10px', width: '70%' }}>
      <h4 className="float-left">Generate form : </h4>
      <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={showPreview}>
        Preview Form
      </button>

      <button className="btn btn-success float-right" style={{ marginRight: '10px' }} onClick={saveForm}>
        Save Form
      </button>

      {previewVisible && (<CreateFormPreview  data={data} previewVisible={previewVisible} closePreview={closePreview} />) }


      </div>

    <ReactFormBuilder
      locale='en'
      saveAlways={false}  

    />
    
    </div>)
    
};
  
  export default CreateForm;