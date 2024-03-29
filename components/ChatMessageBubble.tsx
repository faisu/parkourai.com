import type { Message } from "ai/react";

export function ChatMessageBubble(props: { message: Message, aiEmoji?: string }) {
  const colorClassName =
  "bg-slate-50 text-white";
  const alignmentClassName =
    props.message.role === "user" ? "ml-auto" : "mr-auto";
  const prefix = props.message.role === "user" ? "User" : "Noor";
  return (
    <div
      className={`${alignmentClassName} ${colorClassName} bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter px-4 py-2 max-w-[80%] mb-8`}
    >
      <div className="text-lg mr-2 mb-2 text-primary underline">
        {prefix}
      </div>
      <div className="whitespace-pre-wrap text-tertiary">
        {props.message.content}
      </div>
    </div>
  );
}