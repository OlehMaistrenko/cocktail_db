"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { apiLoginUser, apiRegisterUser } from "@/lib/api-requests";
import {
  LoginUserInput,
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import FormInput from "@/components/ui/FormInput";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";

export default function RegisterForm() {
  const store = useStore();
  const router = useRouter();

  const methods = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function RegisterUserFunction(credentials: RegisterUserInput) {
    store.setRequestLoading(true);
    try {
      await apiRegisterUser(JSON.stringify(credentials));
      const user = await apiLoginUser(
        JSON.stringify(credentials as LoginUserInput)
      );
      store.setAuthUser(user);
      toast.success("Registration complete");
      return router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      store.setRequestLoading(false);
    }
  }
  const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
    RegisterUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormInput label='Name' name='name' type='text' />
        <FormInput label='Email' name='email' type='email' />
        <FormInput label='Password' name='password' type='password' />
        <FormInput
          label='Confirm password'
          name='passwordConfirm'
          type='password'
        />
        <Button isLoading={store.requestLoading}>submit</Button>
      </form>
    </FormProvider>
  );
}
