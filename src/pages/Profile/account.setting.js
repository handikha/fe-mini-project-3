import { useLocation } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function AccountSetting() {
  const location = useLocation().pathname.split("/");
  const settingType = location[location.length - 1];
  const settings = [
    {
      title: "Username",
      path: "/profile/account-setting/username",
    },
    {
      title: "Email",
      path: "/profile/account-setting/email",
    },
    {
      title: "Password",
      path: "/profile/account-setting/password",
    },
  ];
  return (
    <div className="container flex justify-center gap-x-10 py-24">
      <div className="mt-11 flex flex-col items-start gap-3 border-r-2  pr-10">
        {settings.map((setting, index) => (
          <Button
            key={index}
            title={setting.title}
            path={setting.path}
            className={`${
              settingType === setting.title.toLocaleLowerCase()
                ? "font-semibold text-primary"
                : null
            } duration-300 hover:text-primary`}
            isLink
          />
        ))}
      </div>
      <div className="flex w-4/5 flex-col gap-y-3 md:w-1/3">
        <h3 className="title">Account Setting</h3>

        {settingType === "username" && (
          <>
            <Input label="Username" id="username" name="username" type="text" />
            <Button title="Change Username" isPrimary className="mt-4" />
          </>
        )}

        {settingType === "email" && (
          <>
            <Input label="Email" id="email" name="email" type="text" />
            <Button title="Change Email" isPrimary className="mt-4" />
          </>
        )}

        {settingType === "password" && (
          <>
            <Input
              label="Current Password"
              id="currentPassword"
              name="currentPassword"
              type="password"
            />
            <Input
              label="New Password"
              id="newPassword"
              name="newPassword"
              type="password"
            />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />
            <Button title="Change Password" isPrimary className="mt-4" />
          </>
        )}
      </div>
    </div>
  );
}
