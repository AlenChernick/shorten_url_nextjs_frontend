'use client';
import { ChangeEvent, useState } from 'react';

export interface IFormValues {
  [key: string]: string;
}

export const useForm = (initialValues: IFormValues) => {
  const [values, setValues] = useState<IFormValues>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
};
