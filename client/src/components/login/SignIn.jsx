import React from 'react';

function SignIn() {
  const onSignIn = googleUser => {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  };

  return (
    <div>
      <div className="g-signin2" data-onsuccess={onSignIn}></div>
    </div>
  );
}

export default SignIn;
