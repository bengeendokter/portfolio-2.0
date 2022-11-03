
export default function ExtLink({ children, href, target = "_blank", ...rest } : any)
{
    return (
        <a href={href} target={target} rel="noopener noreferrer" {...rest}>
            {children}
        </a>
    );
};
