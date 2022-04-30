import React from 'react';
import { action, makeObservable, observable } from 'mobx';

interface Message {
  text: string;
  type: 'normal' | 'alert';
}

export class MessageStore {
  @observable messages: Message[] = [{text: "Welcome to MURDUR 0.1!", type: 'normal'}];

  constructor() {
    makeObservable(this);
  }

  public messagePanelScrollRef: React.RefObject<HTMLDivElement> = React.createRef();

  @action addMessage = (text: string, type: 'normal' | 'alert' = 'normal') => {
    this.messages.push({text, type});
    this.scrollMessagesToBottom();
  }

  private scrollMessagesToBottom = () => {
    const messagePanelScrollRefElement = this.messagePanelScrollRef.current;
    if(messagePanelScrollRefElement) {
      messagePanelScrollRefElement.scrollTop = messagePanelScrollRefElement.scrollHeight
    }
  }

  @action clearMessage = () => {
    this.messages = [{text: "Welcome to MURDUR 0.1!", type: 'normal'}];
  }
}

const messageStore = new MessageStore();

export default messageStore;