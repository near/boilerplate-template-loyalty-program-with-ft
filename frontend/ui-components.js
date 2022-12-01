import React from 'react';

export function SignOutButton({ accountId, onClick }) {
  return (
    <button className='btn btn-primary' onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}
