interface FormData {
  id?: string;
  password?: string;
  passwordConfirm?: string;
  currentPassword?: string;
  name?: string;
  email?: string;
  phone?: string;
}

const validateField = (fieldName: keyof FormData, fieldValue: string, formData: FormData) => {
  let fieldRegex: RegExp;

  switch (fieldName) {
    case 'id':
      fieldRegex = /^[a-z0-9]{6,20}$/;
      break;
    case 'password':
      fieldRegex = /^.{8,}$/;
      break;
    case 'passwordConfirm':
      return fieldValue === formData.password;
    case 'currentPassword':
      fieldRegex = /^.{8,}$/;
      break;
    case 'email':
      fieldRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      break;
    case 'phone':
      fieldRegex = /^\d{3}-\d{4}-\d{4}$/;
      break;
    case 'name':
      fieldRegex = /^.{2,}$/;
      break;
    default:
      return true;
  }

  return fieldRegex.test(fieldValue);
};

export { validateField };
