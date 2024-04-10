
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const PhaserGame = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
        preload: preload,
        create: create
      },
      backgroundColor: '#ffffff' 
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('circle', 'assets/circle.png');
      this.load.image('square', 'assets/square.png');
      this.load.image('triangle', 'assets/triangle.png');
    }

    function create() {
      const circlePlaceholder = this.add.image(200, 100, 'circle').setInteractive();
      const squarePlaceholder = this.add.image(400, 100, 'square').setInteractive();
      const trianglePlaceholder = this.add.image(600, 100, 'triangle').setInteractive();

      const circleDropZone = this.add.rectangle(200, 300, 100, 100, 0x6666ff).setAlpha(0.3);
      const squareDropZone = this.add.rectangle(400, 300, 100, 100, 0x66ff66).setAlpha(0.3);
      const triangleDropZone = this.add.rectangle(600, 300, 100, 100, 0xff6666).setAlpha(0.3);

      const shapes = ['circle', 'square', 'triangle'];

      shapes.forEach((shape, index) => {
        const x = 750;
        const y = 150 + (index * 150);
        const draggableImage = this.add.image(x, y, shape).setInteractive();
        this.input.setDraggable(draggableImage);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });

        this.input.on('dragend', function (pointer, gameObject) {
          const dropZone = pointer.x > 150 && pointer.x < 250 ? circleDropZone :
            pointer.x > 350 && pointer.x < 450 ? squareDropZone :
            pointer.x > 550 && pointer.x < 650 ? triangleDropZone :
            null;

          const isCorrectShape = (gameObject.texture.key === 'circle' && dropZone === circleDropZone) ||
                                 (gameObject.texture.key === 'square' && dropZone === squareDropZone) ||
                                 (gameObject.texture.key === 'triangle' && dropZone === triangleDropZone);

          if (dropZone && Phaser.Geom.Rectangle.Contains(dropZone.getBounds(), pointer.x, pointer.y) && isCorrectShape) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            setScore(prevScore => prevScore + 1);

          } else {
            gameObject.x = x;
            gameObject.y = y;
          }
        });
      });
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div>
      <div id="phaser-game" />
      <p>Score: {score}</p>
    </div>
  );
};

export default PhaserGame;
