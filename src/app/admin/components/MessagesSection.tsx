import { Empty } from "@/components/willswalks/Empty";
import { type AdminFormAction, type AdminMessage } from "../types";

export function MessagesSection({
  messages,
  deleteMessageAction,
}: {
  messages: AdminMessage[];
  deleteMessageAction: AdminFormAction;
}) {
  return (
    <section>
      <h2 className="ww-serif text-[1.4rem] mb-3">Messages</h2>
      <div className="flex flex-col gap-3">
        {messages.length === 0 ? (
          <Empty text="No messages yet" />
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="bg-[var(--warm-white)] rounded-2xl p-5 shadow-[var(--shadow)]"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="font-semibold mb-1">
                    {message.name}{" "}
                    <span className="text-[var(--muted)] font-normal text-sm">
                      · {message.email}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {message.message}
                  </p>
                  <p className="text-xs text-[var(--light)] mt-2">
                    {message.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <form action={deleteMessageAction}>
                  <input type="hidden" name="id" value={message.id} />
                  <button
                    type="submit"
                    className="text-xs text-[var(--danger)] bg-transparent border-none cursor-pointer hover:underline"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
