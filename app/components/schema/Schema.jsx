import * as yup from "yup";
export const todoSchema = yup.object({
  title:yup.string().min(3).max(20).required('plz enter your title'),
  des: yup.string().min(5).max(300).required('plz enter your description')
}) 