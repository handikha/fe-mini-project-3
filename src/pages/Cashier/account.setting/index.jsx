import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";

import PasswordSetting from "../../../components/PasswordSetting";
import { useEffect } from "react";
import ImageSetting from "./image.setting";

export default function CashierAccountSetting({ user }) {
  const navigate = useNavigate();

  const { context } = useParams();
  const settings = [
    {
      title: "Password",
      path: "/cashier/account-setting/password",
      context: "password",
    },
    {
      title: "Change Image",
      path: "/cashier/account-setting/change-image",
      context: "change-image",
    },
  ];

  useEffect(() => {
    const allowedContext = settings.find((item) => item.context === context);

    if (!allowedContext) {
      return navigate("/not-found", { replace: true });
    }
  }, [context]);

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

        {context === "password" && <PasswordSetting />}

        {context === "change-image" && <ImageSetting />}
      </div>
    </div>
  );
}
