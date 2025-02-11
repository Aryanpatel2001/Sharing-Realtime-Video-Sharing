import { TabsContent } from "@/components/ui/tabs";
import React from "react";

type Props = {
  transcript: string;
};

const VideoTranscript = ({ transcript }: Props) => {
  return (
    <TabsContent
      value="Transcript"
      className="p-5  rounded-xl flex flex-col gap-y-6"
    >
      <p className="text-[#a7a7a7]">{transcript}</p>
    </TabsContent>
  );
};

export default VideoTranscript;
