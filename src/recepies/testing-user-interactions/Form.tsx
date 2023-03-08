import { useState, ChangeEvent, FormEvent } from 'react';

type FormData = {
  username: string;
  email: string;
};

type FormErrors = {
  username?: string;
  email?: string;
};

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submittedValue, setSubmittedValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): FormErrors => {
    let errors: FormErrors = {};
    if (!formData.username) {
      errors.username = 'Username is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    return errors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setSubmittedValue(`Username: ${formData.username}, Email: ${formData.email}`);
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          data-testid="username-input"
        />
        {formErrors.username && <span data-testid="username-error">{formErrors.username}</span>}
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          data-testid="email-input"
        />
        {formErrors.email && <span data-testid="email-error">{formErrors.email}</span>}
      </div>
      <button type="submit" data-testid="submit-button">Submit</button>
      {submittedValue && <div data-testid="submitted-value">{submittedValue}</div>}
    </form>
  );
};

export default Form;
