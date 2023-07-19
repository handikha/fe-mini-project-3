import Button from "../../components/Button";
import Input from "../../components/Input";

export default function ProfileSetting() {
  return (
    <div className="container flex justify-center py-24">
      <div className="flex w-4/5 flex-col gap-y-3 md:w-1/3">
        <h3 className="title">Profile Setting</h3>

        <Input label="Name" id="name" name="name" type="text" />
        <Input label="Bio" id="bio" name="bio" type="text" />
        <Button title="Change Profile" isPrimary className="mt-4" />

        <input type="file" name="" id="" />
      </div>
    </div>
  );
}
