// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Fullscreen from "react-full-screen";
import TopToolBar from "../components/TopToolBar";
import DrawerField from "../components/DrawerField";

export default class PlayBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionNumber: 0,
      isFull: false,
      isDrawing: true,
      isDrawingArrows: false,
      dashed: false,
      arrwosArray: [],
      ballPosition: [{ ballX: 50, ballY: 20 }, { ballX: 50, ballY: 20 }],
      players: this.addPlayersToInitialList(99, "ourTeam"),
      enemyPlayers: this.addPlayersToInitialList(18, "enemy")
    };

    this.handleFullScreen = this.handleFullScreen.bind(this);
    this.handleStopDrawing = this.handleStopDrawing.bind(this);
    this.handleStartDrowingArrows = this.handleStartDrowingArrows.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleUpdateArrowsPosition = this.handleUpdateArrowsPosition.bind(this);
    this.handleUpdateBallPosition = this.handleUpdateBallPosition.bind(this);
    this.handleUpdateEnemyPlayersPosition = this.handleUpdateEnemyPlayersPosition.bind(this);
    this.handleUpdateOldPlayersPosition = this.handleUpdateOldPlayersPosition.bind(this);
    this.handleUpdatePlayersPosition = this.handleUpdatePlayersPosition.bind(this);
  }

  addPlayersToInitialList(playerNumber, team) {
    const ourPlayerX = 100;
    const ourPlayerY = 20;
    const enemyPlayerX = 180;
    const enemyPlayerY = 20;

    let playerList = [];
    for (
      let playerIterator = 1;
      playerIterator <= playerNumber;
      playerIterator++
    ) {
      if (team == "ourTeam") {
        playerList.push({ x: ourPlayerX, y: ourPlayerY, id: playerIterator });
      } else {
        playerList.push({
          x: enemyPlayerX,
          y: enemyPlayerY,
          id: playerIterator
        });
      }
    }
    return playerList;
  }

  handleFullScreen() {
    this.setState({ isFull: true });
  }

  handleStopDrawing() {
    this.setState(previousState => ({
      isDrawing: !previousState.isDrawing
    }));
  }

  handleStartDrowingArrows(dashed) {
    this.setState(previousState => ({
      isDrawingArrows: !previousState.isDrawingArrows,
      dashed: dashed
    }));
  }

  handleUndo() {
    const playersPosition = this.state.players;
    const enemyPlayersPosition = this.state.enemyPlayers;
    const playersOldPosition = this.state.oldPlayerPosition;

    switch (this.state.actionNumber) {
      case 1:
        const arrows = this.state.arrwosArray;
        arrows.pop();
        this.setState({
          arrwosArray: arrows,
          actionNumber: 0
        });
        break;

      case 2:
        const ballPosition = this.state.ballPosition;
        ballPosition.reverse();
        this.setState({
          ballPosition: ballPosition,
          actionNumber: 0
        });
        break;

      case 3:
        enemyPlayersPosition[playersOldPosition.playerId - 1].x =
          playersOldPosition.playerX;
        enemyPlayersPosition[playersOldPosition.playerId - 1].y =
          playersOldPosition.playerY;
        this.setState({
          enemyPlayers: enemyPlayersPosition,
          actionNumber: 0
        });
        break;

      case 4:
        playersPosition[playersOldPosition.playerId - 1].x =
          playersOldPosition.playerX;
        playersPosition[playersOldPosition.playerId - 1].y =
          playersOldPosition.playerY;
        this.setState({
          players: playersPosition,
          actionNumber: 0
        });
        break;
    }
  }

  handleUpdateArrowsPosition(arrwosArray) {
    this.setState({
      arrwosArray: arrwosArray,
      actionNumber: 1
    });
  }

  handleUpdateBallPosition(ballPosition) {
    this.setState({
      ballPosition: ballPosition,
      actionNumber: 2
    });
  }

  handleUpdateEnemyPlayersPosition(playersPosition) {
    this.setState({
      enemyPlayers: playersPosition,
      actionNumber: 3
    });
  }

  handleUpdatePlayersPosition(playersPosition) {
    this.setState({
      players: playersPosition,
      actionNumber: 4
    });
  }

  handleUpdateOldPlayersPosition(playersPosition) {
    this.setState({
      oldPlayerPosition: playersPosition
    });
  }

  render() {
    return (
      <div className="PlayBook">
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({ isFull })}
        >
          <div className="full-screenable-node d-flex flex-column">
            <TopToolBar
              onHandleStopDrawing={this.handleStopDrawing}
              onChangeToFullScreen={this.handleFullScreen}
              onHandleStartDrowingArrows={this.handleStartDrowingArrows}
              onHandleUndo={this.handleUndo}
            />
            <DrawerField
              stopDrawing={this.state.isDrawing}
              startDrawingArrows={this.state.isDrawingArrows}
              startDrawingArrowsDashed={this.state.dashed}
              arrwosArray={this.state.arrwosArray}
              players={this.state.players}
              enemyPlayers={this.state.enemyPlayers}
              ballPosition={this.state.ballPosition}
              onHandleUpdateArrowsPosition={this.handleUpdateArrowsPosition}
              onHandleUpdateBallPosition={this.handleUpdateBallPosition}
              onHandleUpdateOldPlayersPosition={this.handleUpdateOldPlayersPosition}
              onHandleUpdateEnemyPlayersPosition={this.handleUpdateEnemyPlayersPosition}
              onHandleUpdatePlayersPosition={this.handleUpdatePlayersPosition}
            />
          </div>
        </Fullscreen>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<PlayBook />, document.getElementById("play_book"));
});
