import { useParams } from "react-router-dom";
import Button from "../../../components/Button";
import ChangeImage from "../../../components/ChangeImage";
import UsernameSetting from "./username.setting";
import EmailSetting from "./email.setting";
import PasswordSetting from "./password.setting";

export default function AdminAccountSetting({ user }) {
  const { context } = useParams();

  const settings = [
    {
      title: "Username",
      path: "/admin/account-setting/username",
      context: "username",
    },
    {
      title: "Email",
      path: "/admin/account-setting/email",
      context: "email",
    },
    {
      title: "Password",
      path: "/admin/account-setting/password",
      context: "password",
    },
    {
      title: "Change Image",
      path: "/admin/account-setting/change-image",
      context: "change-image",
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
              context === setting.context ? "font-semibold text-primary" : null
            } duration-300 hover:text-primary`}
            isLink
          />
        ))}
      </div>

      <div className="flex w-4/5 flex-col gap-y-3 md:w-1/3">
        <h3 className="title">Account Setting</h3>

        {context === "username" && <UsernameSetting />}

        {context === "email" && <EmailSetting />}

        {context === "password" && <PasswordSetting />}

        {context === "change-image" && <ChangeImage />}
      </div>
    </div>
  );
}
