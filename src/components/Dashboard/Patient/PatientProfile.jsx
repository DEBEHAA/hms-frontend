import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "../shared/DashboardHeader";
import ProfilePasswordForm from "../shared/ProfilePasswordForm";
import PatientProfileForm from "./PatientProfileForm";

const PatientProfile = () => {
  return (
    <>
      <DashboardHeader title="Profile" desc="Update your profile" />
      <div className="h-[calc(100dvh-80px)] w-full overflow-y-auto">
        <div className="p-3 sm:p-5 xl:p-10">
          <Tabs
            defaultValue="account"
            className="mx-auto max-w-xl space-y-3 rounded-md border bg-white p-3 sm:p-5 md:p-10"
          >
            <TabsList className="grid h-11 grid-cols-2">
              <TabsTrigger className="h-full" value="account">
                Account
              </TabsTrigger>
              <TabsTrigger className="h-full" value="password">
                Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <PatientProfileForm />
            </TabsContent>
            <TabsContent value="password">
              <ProfilePasswordForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
