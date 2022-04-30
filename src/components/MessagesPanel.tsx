import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { observer } from "mobx-react"

const MessagesPanel = observer(() => {
  const context = useContext(gameContext);
  const {messageStore} = context;
  return <div className="explore-messages" ref={messageStore.messagePanelScrollRef}>
    <ul>
      {messageStore.messages.map((message, index) => 
        <li key={"message-" + index}>{message.text}</li>)}
    </ul>
  </div>
})

export default MessagesPanel;
