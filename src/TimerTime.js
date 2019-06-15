import React, { useState, useEffect } from "react";

const TimerTime = ({ className, time, beginTime, handleRefreshTime }) => {
  const [idInterval, setIdInterval] = useState(false);
  const refreshInterval = () => {
    if (beginTime) {
      setIdInterval(
        setInterval(() => {
          handleRefreshTime(beginTime);
        }, 500)
      );
    }
    return clearInterval(idInterval);
  };

  useEffect(refreshInterval, [beginTime]);
  const displayTime00 = time =>
    time.toString().length === 1 ? "0" + time : time;
  return (
    <div className={className}>
      {time
        ? displayTime00(time.hours()) +
          ":" +
          displayTime00(time.minutes()) +
          ":" +
          displayTime00(time.seconds())
        : "00:00:00"}
    </div>
  );
};

export default TimerTime;
