import React from 'react';
import { ReactFormGenerator} from 'react-form-builder2';
import { api_nestjs } from "../utils/api"; 
import {useQuery,useMutation} from 'react-query';
import {   useParams } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast'

const ViewFrom = () => {




    const { formId } = useParams();

    // get form with id 
 
    const { data : formData, isLoading} = useQuery(`/forms/${formId}`, () =>  
  
    api_nestjs.get(`/forms/${formId}`),
    { 
      onSuccess : (data) => {
  
       console.log(data)
  
      },
      
    });

// submit a form input data to backend 
    const { 
        isSuccess,
        mutate,
      } = useMutation(
        async (params) => await api_nestjs.post(`forms/${formId}/submit`, params),
        {  
          onSuccess: (data) => {

            toast.success('Form Submited Successfully !');
   },
    
        }
      );
  

    const handleSubmit = (params) => {


        console.log({params})

        mutate(params)
    }

    

        
if(isLoading){

    return (<div>Loading ...</div>)
  }
  

  if (isSuccess) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <div className="container">
          <div className="message-container success-message text-center">
            <h1 className="success-heading">
              <FaCheckCircle className="success-icon mr-2" style={{ color: 'green' }} />
              Success!
            </h1>
            <p className="success-text">
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  
  
  return (
    
      // 
   

    <div className="container mt-4">

      <h1 className="text-center font-weight-bold mb-4" style={{ color: 'blue' }}>
        {formData.name}
      </h1>
      <div className="card">
        <div className="card-body">
          <ReactFormGenerator
            answer_data={{}}
            data={formData.data}
            form_method='POST'
            onSubmit={handleSubmit}
            submitButton={<button type="submit" className="btn btn-primary">Submit</button>}
          />
          
        </div>
      </div>
    </div>
  );
};

export default ViewFrom;
