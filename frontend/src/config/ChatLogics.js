//separating sender and match text in the chat box
export const isSameSenderMargin = (messages, message, i, user) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].name === message.name &&
    messages[i].name !== user?.name
  )
    return 34.5;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].name !== message.name &&
      messages[i].name !== user?.name) ||
    (i === messages.length - 1 && messages[i].name !== user?.name)
  )
    return 0;
  else return "auto";
};

//padding between same user's/sender's texts
export const isSameUser = (messages, message, i) => {
  return i > 0 && messages[i - 1].name === message.name;
};

//displaying avatar on sender's last message
export const isSameSender = (messages, message, i, user) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].name !== message.name ||
      messages[i + 1].name === undefined) &&
    messages[i].name !== user?.name
  );
};


export const isLastMessage = (messages, i, user) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].name !== user?.name &&
    messages[messages.length - 1].name
  );
};
