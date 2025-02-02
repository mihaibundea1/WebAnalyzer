import React from 'react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
import Links from '../../components/common/Links';
import enhancedImage from '../../assets/auth_images/enhanced.png'; // Calea corectă

const Login: React.FC = () => {
    return (
        <div className="flex justify-center items-center bg-white w-screen h-screen">
            <div className="flex w-full max-w-7xl mx-auto px-5 py-8">
                {/* Container pentru formular */}
                <div className="flex flex-col justify-center items-center w-full max-w-[450px] mx-auto mt-8">
                    <a className="mt-10 w-fit text-zinc-950 dark:text-white" href="/">
                    </a>
                    <div className="flex flex-col items-center w-full max-w-[450px] mx-auto mt-8">
                        <p className="text-[32px] font-bold text-zinc-950 dark:text-white">Sign In</p>
                        <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">Enter your email and password to sign in!</p>
                        <form className="mt-8 w-full">
                            <InputField id="email" label="Email" placeholder="name@example.com" type="email" />
                            <InputField id="password" label="Password" placeholder="Password" type="password" />
                            <Button label="Log in" type="submit" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90" />
                        </form>
                        <Divider />
                        <Links href="/auth/register" label="Don't have an account? Sign up" />
                    </div>
                </div>

                {/* Container pentru imagine */}
                <div className="hidden lg:block w-1/2">
                    <img src={enhancedImage} alt="Login Image" className="object-cover w-full h-full" />
                </div>
            </div>
        </div>
    );
};

export default Login;
