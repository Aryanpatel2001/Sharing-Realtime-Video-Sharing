"use client";
import { enableFirstView, getFirstView } from "@/actions/user";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {};

const SettingPage = (props: Props) => {
  const [firstView, setFirstView] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    if (firstView !== undefined) return;
    const fetchData = async () => {
      const response = await getFirstView();
      if (response.status === 200) setFirstView(response?.data);
    };
    fetchData();
  }, [firstView]);

  const switchState = async (checked: boolean) => {
    const view = await enableFirstView(checked);
    if (view) {
      toast(view.status === 200 ? "success" : "Failed", {
        description: view.data,
      });
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mt-4">Video Sharing Settings</h2>
      <p className="text-muted-foreground">
        Enabling this feature will send you notifications when someone watched
        your video for the first time.This feature can help during client
        outreach.
      </p>
      <label htmlFor="" className="flex items-center gap-x-3 mt-4 text-md">
        Enable First View
        <Switch
          onCheckedChange={switchState}
          disabled={firstView === undefined}
          checked={firstView}
          onClick={() => setFirstView(!firstView)}
        />
      </label>
    </div>
  );
};

export default SettingPage;
