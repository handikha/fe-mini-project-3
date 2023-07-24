import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function PasswordSetting() {
  return (
    <form className="flex flex-col gap-3">
      <Input
        placeholder="Current Password"
        id="currentPassword"
        name="currentPassword"
        type="password"
      />
      <Input
        placeholder="New Password"
        id="newPassword"
        name="newPassword"
        type="password"
      />
      <Input
        placeholder="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
      />
      <Button
        title="Change Password"
        isButton
        isPrimary
        isBLock
        className="mt-1"
      />
    </form>
  );
}
