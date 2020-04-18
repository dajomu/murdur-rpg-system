import React from 'react';
import { ComponentWithGameContext } from './ComponentWithGameContext';
import { observer } from "mobx-react";
import gameController from '../controllers/gameController';

@observer 
class DeathModal extends ComponentWithGameContext {
  render() {
    return <div className="modal-overlay">
      <div className="modal">
        <p>You died</p>
        <div className="modal-death-restart" onClick={() => {gameController.reset()}}>
          Restart
        </div>
      </div>
    </div>;
  }
}

export default DeathModal;