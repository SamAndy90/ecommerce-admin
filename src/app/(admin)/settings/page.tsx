import { AddNewAdmin } from "components/Settings/AddNewAdmin";
import { UpdateInfo } from "components/Settings/UpdateInfo";
import { UserInfo } from "components/Settings/UserInfo";

export default function SettingsPage() {
  return (
    <>
      <UserInfo />
      <div className={"flex gap-2"}>
        <AddNewAdmin />
        <UpdateInfo />
      </div>
    </>
  );
}
