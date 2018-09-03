import React from 'react';

export default function PageNotFound({ location }) {
  return (
    <p>
      Page not found - the path, <code>{location.pathname}</code>,
      did not match any React Router routes.
    </p>
  );
}
