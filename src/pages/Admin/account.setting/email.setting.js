import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function EmailSetting() {
  return (
    <form>
      <Input placeholder="Email" id="email" name="email" type="text" />
      <Button
        title="Change Email"
        isButton
        isPrimary
        isBLock
        className="mt-4"
      />
    </form>
  );
}
