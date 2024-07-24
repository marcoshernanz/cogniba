import Link from "next/link";

interface OptionalLinkWrapperProps {
  children: React.ReactNode;
  href?: string;
}

export default function OptionalLinkWrapper({
  children,
  href,
}: OptionalLinkWrapperProps) {
  return (
    <>
      {href ? (
        <Link className="h-full w-full" href={href}>
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
