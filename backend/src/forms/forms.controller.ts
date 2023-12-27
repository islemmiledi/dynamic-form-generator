import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { FormsService } from './forms.service';
import { Form } from './form.model';
import { CreateFormDto } from '../dto/Create Form DTO';
import { UpdateFormDto } from '../dto/Update Form DTO';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('add')
  async createForm(@Body() formData: CreateFormDto): Promise<Form> {

    console.log({formData})
    return this.formsService.createForm(formData);
  }

  @Get()
  async getAllForms(): Promise<Form[]> {
    return this.formsService.findAllForms();
  }


  @Get('save-form')
  async saveForm(): Promise<any> {
    return {ok:true}
  }



  @Get(':id')
  async getFormById(@Param('id') id: string): Promise<Form | null> {
    return this.formsService.findFormById(id);
  }
  @Get(':id/json')
  async getFormByIdJson(@Param('id') id: string): Promise<any> {
    let res = await this.formsService.findFormById(id);

    return res?.data;
  }
  
  @Post('update/:id')
  async updateForm(@Param('id') id: string, @Body() updateData: UpdateFormDto): Promise<Form | null> {
    return this.formsService.updateForm(id, updateData);
  }

  @Post('remove/:id')
    async deleteForm(@Param('id') id: string): Promise<Form | null> {
    return this.formsService.deleteForm(id);
  }


  @Post(':id/submit')
  async submitForm(@Param('id') id: string, @Body() body): Promise<any> {


    console.log({id, body})

    return {ok : true}
  }


}
