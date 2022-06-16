import { useEffect, useState } from "react";
import { Point } from "../redux/reducers";

const roundCheck = (p: Array<Point>) => {
  if (p?.length === 3) {
    const sumOfPoints = p.reduce(
      (prev: number, current: Point) => current.point + prev,
      0
    );
    const numberOfFoursInRound = [...p].filter(
      (item) => item.isSumOfFour
    )?.length;
    if (10 === sumOfPoints && numberOfFoursInRound === 1) {
      return true;
    } else if (sumOfPoints === 5 && numberOfFoursInRound <= 1) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export { roundCheck };
