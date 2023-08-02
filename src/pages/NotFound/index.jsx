import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h3>Oops! Looks like you got lost.</h3>
      <p className="text-lg">The page you're trying to reach was not found.</p>
      <Button
        isLink
        title="Back to Home"
        className="mt-2 underline underline-offset-2 hover:text-primary"
        path="/"
      />
    </div>
  );
}
