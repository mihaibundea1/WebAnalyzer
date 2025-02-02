// Links.tsx
import React from 'react';

interface LinkProps {
    href: string;
    label: string;
}

const Links: React.FC<LinkProps> = ({ href, label }) => (
    <p>
        <a href={href} className="font-medium text-zinc-950 dark:text-white text-sm">
            {label}
        </a>
    </p>
);

export default Links;
