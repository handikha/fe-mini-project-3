import React from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function UsernameSetting() {
  return (
    <form>
      <Input placeholder="Username" id="username" name="username" type="text" />
      <Button
        title="Change Username"
        isButton
        isPrimary
        isBLock
        className="mt-4"
      />
    </form>
  );
}
