import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import { VITE_APP_BACKEND_URL } from '../constants';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(64),
});

const Signin = () => {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { handleSubmit, register, formState: { isSubmitting, isValid } } = form;

    const onSubmit = async (values) => {
        try {
            console.log(values);
            const response = await fetch(`${VITE_APP_BACKEND_URL}/login`, {
                method: 'POST',
                headers: values
            });
            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate(`/courses`);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-blue-200 rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Logo Here
                    </h1>

                    <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            type="email"
                            name="email"
                            label="Email"
                            register={register}
                        />

                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            register={register}
                        />

                        <button
                            type="submit"
                            className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center ${(!isValid || isSubmitting) && 'opacity-50 cursor-not-allowed hover:bg-blue-700'}`}
                            disabled={!isValid || isSubmitting}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;