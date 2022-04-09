import classNames from "classnames";
import { auth } from "../firebase-config";

export const Message = ({message}) => {
  const {author, text} = message;
  return (
    <div
      className={classNames([
        "message",
        {"message--mine": author.uid === auth.currentUser?.uid}
      ])}
    >
      {!(author.uid === auth.currentUser?.uid) && <>{`${author.email}:`} <br /></>}
      {text}
    </div>
  );
}