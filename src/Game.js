import React from 'react';
import { Godot } from 'react-godot';

const GodotGameComponent = () => {
  return (
    <div>
      <h1>Pong with GDScript</h1>
      <div className="godot">
        <Godot game="/game/public/index.html" />
      </div>
    </div>
  );
}

export default GodotGameComponent;
