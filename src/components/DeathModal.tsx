import React, {useContext} from 'react';
import gameContext from '../stores/gameContext';
import { observer } from "mobx-react";
import gameController from '../controllers/gameController';

const DeathModal = observer(() => {
  // const context = useContext(gameContext);
  return <div className="modal-overlay">
    <div className="modal">
      <p>You died</p>
      <div className="modal-death-restart" onClick={() => {gameController.reset()}}>
        Resurrect
      </div>
    </div>
  </div>;
})

export default DeathModal;