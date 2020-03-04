import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react"

@observer 
class MessagesPanel extends ComponentWithGameContext {
  render() {
    const {messageStore} = this.context;
    return <div className="explore-messages" ref={messageStore.messagePanelScrollRef}>
      <ul>
        {messageStore.messages.map(message => 
          <li>{message.text}</li>)}
      </ul>
    </div>
  }
}

export default MessagesPanel;
