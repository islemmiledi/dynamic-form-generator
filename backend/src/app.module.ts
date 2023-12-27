
import 'dotenv/config'


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormsController } from './forms/forms.controller'; 
import { FormsService } from './forms/forms.service'; 
import { FormModel, FormSchemaDef } from './forms/form.model'; 

const mongo_uri = process.env.MONGO_URI;


@Module({
  imports: [
    MongooseModule.forRoot(mongo_uri), 
    MongooseModule.forFeature([{ name: 'Form', schema: FormSchemaDef }]),
  ],
  controllers: [FormsController], 
  providers: [FormsService], 
})
export class AppModule {}
