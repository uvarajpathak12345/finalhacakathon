import React from "react";
import { Compare } from "../components/compare";

export function CompareDemo() {
  return (
    <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800 px-4">
      <Compare
        firstImage="https://images.unsplash.com/photo-1606166187734-a4cb74079037?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2ljayUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
        secondImage="https://media.istockphoto.com/id/1592210966/photo/happy-black-man-running-in-park-with-music-smile-and-mockup-in-nature-garden-and-workout.jpg?s=612x612&w=0&k=20&c=pkxEU_3g0-ClVb95hCZYxeVK5QrWFoY5J4uoES9seM8="
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
        slideMode="hover"
      />
    </div>
  );
}
