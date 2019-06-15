import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import TimerTime from "./TimerTime";

const Timer = ({ timeLeftInMinute, autoStart }) => {
  const initialTimeInMillisecond = timeLeftInMinute * 60000;
  /* Displayed time */
  const [time, setTime] = useState(moment.duration(initialTimeInMillisecond));
  /* Date when the timer start */
  const [beginTime, setBeginTime] = useState(false);
  /* Store the time when the timer is stopped */
  const [oldDuration, setOldDuration] = useState(moment.duration(0));

  const refreshTime = t =>
    setTime(
      moment
        .duration(initialTimeInMillisecond)
        .subtract(
          moment.duration(t ? moment().diff(moment(t)) : moment.duration(0))
        )
    );

  const start = () => {
    if (beginTime) {
      reset();
    }
    setBeginTime(moment().subtract(oldDuration));
    setOldDuration(moment.duration(0));
  };
  const stop = () => {
    setOldDuration(
      moment.duration(initialTimeInMillisecond).subtract(moment.duration(time))
    );
    setBeginTime(false);
  };
  const reset = useCallback(() => {
    setBeginTime(false);
    setTime(moment.duration(initialTimeInMillisecond));
    setOldDuration(moment.duration(0));
    if (autoStart) {
      setBeginTime(moment());
    }
  }, [autoStart, initialTimeInMillisecond]);

  /* Each time the component is update we reset it */
  useEffect(() => {
    reset();
  }, [timeLeftInMinute, reset]);

  const hasStarted = () => time.asMinutes() !== timeLeftInMinute;
  const isActivate = () => hasStarted() && beginTime;

  return (
    <div className="Timer">
      <TimerTime
        className="Timer-time"
        time={time}
        beginTime={beginTime}
        handleRefreshTime={refreshTime}
      />
      <div className="Timer-buttons">
        {isActivate() ? (
          <button onClick={() => stop()}>
            <i className="fas fa-pause" /> Stop
          </button>
        ) : (
          <button onClick={() => start()}>
            <i className="fas fa-play" /> Start
          </button>
        )}
        {hasStarted() ? (
          <button onClick={() => reset()}>
            <i className="fas fa-undo" /> Reset
          </button>
        ) : ''}
      </div>
    </div>
  );
};

export default Timer;
