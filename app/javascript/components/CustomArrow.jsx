import React, { Component } from "react";
import { Arrow } from "react-konva";

export default function CustomArrow(props) {
  const { startPos, endPos } = props;

  return (
    <Arrow
      points={[startPos.x, startPos.y, endPos.x, endPos.y]}
      pointerLength={20}
      pointerWidth={20}
      fill="red"
      stroke="red"
      // dash={[30, 10]}
      strokeWidth={4}
    />
  );
}