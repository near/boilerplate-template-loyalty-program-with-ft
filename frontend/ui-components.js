import React from 'react';

export function SignOutButton({ accountId, onClick }) {
  return (
    <button style={{ float: 'right' }} onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}
