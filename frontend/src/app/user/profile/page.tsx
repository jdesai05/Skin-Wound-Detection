import { apiclient } from "@/apis/client";

export default function Page() {
  const user = apiclient.getTokenPayload()
  return (
    <div>
      Hello, {user?.name}!
    </div>
  );
}