import React from "react";

export default function LoadingCards() {
  const length = 9;
  const loadingItems = Array.from({ length });
  return loadingItems.map((_, index) => (
    <div key={index} className="flex h-[320px] w-full animate-pulse flex-col gap-3 rounded-md p-4 shadow-md duration-300 hover:scale-[103%] hover:shadow-xl dark:bg-slate-800/60">
      <div className="aspect-[2/1] w-full overflow-hidden rounded-lg bg-slate-400"></div>

      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded-md bg-slate-400"></div>
        <div className="h-4 w-1/3 rounded-md bg-slate-400"></div>
      </div>

      <div className="mt-auto">
        <div className="h-6 w-full rounded-md bg-slate-400"></div>
      </div>
      <div className="h-10 rounded-lg bg-slate-400"></div>
    </div>
  ));
}
