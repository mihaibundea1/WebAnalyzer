// Register.tsx
import React from 'react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
import Links from '../../components/common/Links';

const Register: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-white w-screen h-[100vh]">
            <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
                <a className="mt-10 w-fit text-zinc-950 dark:text-white" href="/">
                    <div className="flex w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 320 512"
                            className="mr-3 h-[13px] w-[8px] text-zinc-950 dark:text-white"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
                        </svg>
                        <p className="ml-0 text-sm text-zinc-950 dark:text-white">Back to the website</p>
                    </div>
                </a>
                <div className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
                    <p className="text-[32px] font-bold text-zinc-950 dark:text-white">Sign Up</p>
                    <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">Enter your details to create an account!</p>
                    <form className="mt-8">
                        <InputField id="first-name" label="First Name" placeholder="John" type="text" />
                        <InputField id="last-name" label="Last Name" placeholder="Doe" type="text" />
                        <InputField id="email" label="Email" placeholder="name@example.com" type="email" />
                        <InputField id="password" label="Password" placeholder="Password" type="password" />
                        <Button label="Sign Up" type="submit" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90" />
                    </form>
                    <Divider />
                    <Links href="/auth/login" label="Already have an account? Sign in" />
                </div>
            </div>
        </div>
    );
};

export default Register;
