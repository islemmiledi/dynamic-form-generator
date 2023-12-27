import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form, FormDocument } from './form.model'; 

@Injectable()
export class FormsService {
  constructor(@InjectModel('Form') private readonly formModel: Model<FormDocument>) {}

  async createForm(formData: Partial<Form>): Promise<Form> {
    const createdForm = new this.formModel(formData);
    return await createdForm.save();
  }

  async findAllForms(): Promise<Form[]> {
    return await this.formModel.find().lean().exec(); 
  }

  async findFormById(id: string): Promise<Form | null> {
    return await this.formModel.findById(id).lean().exec();
  }

  async updateForm(id: string, updateData: Partial<Form>): Promise<Form | null> {
    return await this.formModel.findByIdAndUpdate(id, updateData, { new: true }).lean().exec();
  }

  async deleteForm(id: string): Promise<Form | null> {
    return await this.formModel.findByIdAndDelete(id).lean().exec();
  }
}
