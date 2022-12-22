import React from 'react';

export function SignOutButton({ accountId, onClick }) {
  return (
    <button className='btn btn-primary' onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}

export function Toggle({text, onChange, checked}) {
  return (
    <>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={checked} onChange={e => onChange(e)}/>
        <label class="form-check-label" for="flexSwitchCheckChecked">{text}</label>
      </div>
    </>
  );
}
