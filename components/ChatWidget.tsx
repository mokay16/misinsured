"use client";

import { useState } from "react";
import Link from "next/link";
import PIcon from "./PIcon";

type Message = { id: number; text: string; cls: "bot" | "user" | "result" };
type Options = { id: string; opts: { label: string; onClick: () => void }[] } | null;
type CTA = { text: string; href: string } | null;

const INITIAL_MESSAGES: Message[] = [{ id: 0, text: "What kind of insurance problem do you have?", cls: "bot" }];

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [options, setOptions] = useState<Options>({
    id: "opts-1",
    opts: [
      { label: "It's a property insurance claim", onClick: () => step(1) },
      { label: "It's something else", onClick: () => step(2) },
    ],
  });
  const [cta, setCta] = useState<CTA>(null);

  function addMsg(text: string, cls: Message["cls"]) {
    setMessages((prev) => [...prev, { id: prev.length, text, cls }]);
  }

  function step(n: number) {
    if (n === 1) {
      setOptions(null);
      addMsg("It's a property insurance claim", "user");
      setTimeout(() => {
        addMsg("You may need a Public Adjuster.", "result");
        setCta({ text: "See what a Public Adjuster does →", href: "/public-adjuster" });
      }, 280);
    }
    if (n === 2) {
      setOptions(null);
      addMsg("It's something else", "user");
      setTimeout(() => {
        addMsg("Is your question about purchasing insurance coverage?", "bot");
        setOptions({
          id: "opts-2",
          opts: [
            { label: "Yes, about buying coverage", onClick: () => step(3) },
            { label: "No, it's a claim or broker dispute", onClick: () => step(4) },
          ],
        });
      }, 280);
    }
    if (n === 3) {
      setOptions(null);
      addMsg("Yes, about buying coverage", "user");
      setTimeout(() => {
        addMsg("You likely need the advice of an insurance agent or broker.", "result");
      }, 280);
    }
    if (n === 4) {
      setOptions(null);
      addMsg("No, it's a claim or broker dispute", "user");
      setTimeout(() => {
        addMsg("You likely need the advice of a Consumer Insurance Attorney.", "result");
        setCta({ text: "See what an Attorney handles →", href: "/consumer-insurance-attorney" });
      }, 280);
    }
  }

  function restart() {
    setMessages(INITIAL_MESSAGES);
    setCta(null);
    setOptions({
      id: "opts-1",
      opts: [
        { label: "It's a property insurance claim", onClick: () => step(1) },
        { label: "It's something else", onClick: () => step(2) },
      ],
    });
  }

  return (
    <div className="chat-window">
      <div className="chat-titlebar">
        <PIcon name="unsure" />
        <div>
          <div className="tt">MisInsured Guide</div>
          <div className="ss">Free &middot; No sign-up needed</div>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((m) => (
          <div key={m.id} className={`msg ${m.cls}`}>
            {m.text}
          </div>
        ))}
        {options ? (
          <div className="chat-options">
            {options.opts.map((o) => (
              <button key={o.label} onClick={o.onClick}>
                {o.label}
              </button>
            ))}
          </div>
        ) : null}
        {cta ? (
          <Link href={cta.href} className="btn solid chat-cta">
            {cta.text}
          </Link>
        ) : null}
      </div>
      <div className="chat-restart" onClick={restart}>
        Start over
      </div>
    </div>
  );
}
