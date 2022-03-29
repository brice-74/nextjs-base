import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Field, Button, Banner } from "@components";

type FormProps = {
  onSubmit: (data: FormData) => void
  loading?: boolean
  error?: boolean
  errorMessage?: string
};

type FormData = {
  email: string
  password: string
};

const formSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be valid")
      .max(225, "Email must have maximum of 255 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must have minimum of 8 characters")
      .max(225, "Password must have maximum of 255 characters")
      .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase character')
      .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase character')
      .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
      .matches(/^(?=.*[=|!@#$%^&(){}[\]:;<>,.?\\/~_+-])/, 'Password must contain at least one special character'),
  }) 
  .required();

function Form({ onSubmit, loading = false, error = false, errorMessage }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error ? (
        <Banner type="DANGER">{errorMessage}</Banner>
      ): null}

      <Field
        {...register("email")}
        label="Email"
        placeholder="Enter your email address"
        error={errors.email?.message}
      />

      <Field
        {...register("password")}
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        className="mb-10"
      />

      <Button 
        type="submit" 
        loading={loading}
        className="py-3 px-8 text-th-light-1 bg-th-primary rounded-[10px]
        hover:bg-th-primary-dark"
      >
        Login
      </Button>
    </form>
  );
}

export { Form }
export type { FormData }
