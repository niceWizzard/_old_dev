"use client";

import { FormEvent, useState } from "react";
import { Runner } from "../../lib/runner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RequestPage() {
  const [isRunning, setIsRunning] = useState(false);

  const [runner, setRunner] = useState<Runner | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setIsRunning((v) => !v);
    if (isRunning) {
      runner?.abort();
      return;
    }
    setRunner(
      new Runner({
        msInterval: 500,
        requestPerBatch: 20,
        url: "https://github.com/vercel/next.js/discussions/47933",
      })
    );
  }
  return (
    <main className="p-3">
      <div className="container m-auto border px-6 py-3 border-blue-200 shadow-sm rounded-lg ">
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <div className="gap-2 flex items-center">
            <label>Url</label>
            <Input placeholder="https://google.com/api" />
          </div>
          <Button className="self-end">{isRunning ? "Stop" : "Run"}</Button>
        </form>
      </div>
    </main>
  );
}
