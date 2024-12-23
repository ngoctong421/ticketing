import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    ...(!currentUser ? [{ label: 'Sign up', href: '/auth/sign-up' }] : []),
    ...(!currentUser ? [{ label: 'Sign in', href: '/auth/sign-in' }] : []),
    ...(currentUser ? [{ label: 'Sign out', href: '/auth/sign-out' }] : []),
  ].map(({ label, href }) => {
    return (
      <li key={href} className="nav-item">
        <Link href={href}>{label}</Link>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link className="navbar-brand" href="/">
        GitTix
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
