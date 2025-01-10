"use client";
import { getAllUserVideos } from "@/actions/workspace";
import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types/index.type";
import React from "react";
import VideoCard from "./video-card";

type Props = {
  folderId: string;
  videosKey: string;
  workspaceId: string;
};

// df679b53-24c3-4a40-ad9f-df375ba770cc this is a workspace id for the user cf31907e-f7d4-43c5-9437-2926b6857265 this is a user id for the given location

const Videos = ({ folderId, workspaceId, videosKey }: Props) => {
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  );

  const { status: videosStatus, data: videos } = (videoData ?? {
    status: 404,
    data: [],
  }) as VideosProps;
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoRecorderDuotone />
          <h2 className="text-xl text-[#BdBdBd]">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videosStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {videosStatus === 200 ? (
          videos.map((video) => (
            <VideoCard workspaceId={workspaceId} {...video} key={video.id} />
          ))
        ) : (
          <p className="text-[#BDBDBD]">No Videos in Workspace</p>
        )}
      </section>
    </div>
  );
};

export default Videos;
