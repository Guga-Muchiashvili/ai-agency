import React from "react";
import SignInForm from "../../app/(landing)/elements/SignInForm";

const LandingPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-2xl text-white absolute top-8 font-bebas left-12">
        Ai Agency
      </h1>
      <SignInForm />
    </div>
  );
};

export default LandingPage;
