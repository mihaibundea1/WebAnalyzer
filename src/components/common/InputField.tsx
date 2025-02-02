// InputField.tsx
import React from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    type: 'email' | 'password' | 'text';
}

const InputField: React.FC<InputFieldProps> = ({ id, label, placeholder, type }) => {
    return (
        <div className="grid gap-1">
            <label className="text-zinc-950 dark:text-white" htmlFor={id}>
                {label}
            </label>
            <input
                className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                id={id}
                placeholder={placeholder}
                type={type}
                autoComplete={type === 'email' ? 'email' : 'current-password'}
                name={id}
            />
        </div>
    );
};

export default InputField;
