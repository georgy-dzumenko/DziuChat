import { ChatsPanel } from "./ChatsPanel";
import { Chat } from "./Chat";
export const Home = () => {

  return (
    <div className="home">
      <ChatsPanel />
      <Chat />
    </div>
  );
}