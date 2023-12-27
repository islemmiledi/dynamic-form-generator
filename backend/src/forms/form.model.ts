import mongoose, { Document } from 'mongoose';



export interface Form {
  name: string;
  data: [];
}

export type FormDocument = Form & Document;



const FormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: [{ type: Object }],
});

export const FormModel = mongoose.model<FormDocument>('Form', FormSchema);
export const FormSchemaDef = FormSchema;
