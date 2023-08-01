"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { apiLoginUser } from "@/lib/api-requests";
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import FormInput from "@/components/ui/FormInput";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const store = useStore();
  const router = useRouter();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;
  useEffect(() => {
    store.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function LoginUserFunction(credentials: LoginUserInput) {
    store.setRequestLoading(true);
    try {
      const user = await apiLoginUser(JSON.stringify(credentials));
      store.setAuthUser(user);
      toast.success("Logged in successfully");
      return router.push("/favorites");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      store.setRequestLoading(false);
    }
  }
  const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
    LoginUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormInput label='Email' name='email' type='email' />
        <FormInput label='Password' name='password' type='password' />
        <Button isLoading={store.requestLoading}>submit</Button>
      </form>
    </FormProvider>
  );
}
