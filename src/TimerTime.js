import React, { useState, useEffect, useCallback} from 'react'

const TimerTime = ({className, time, beginTime, handleRefreshTime}) => {
    const [idInterval, setIdInterval] = useState(false);
    const memoise = useCallback(
        () => {
            if (beginTime) {
            setIdInterval(
                setInterval(() => {
                    handleRefreshTime(beginTime)
                }, 500)
            )
        }
        },
        [beginTime, handleRefreshTime],
    );

    useEffect(() => {
        memoise();
        return clearInterval(idInterval);
    }
    , [beginTime, idInterval, memoise]);
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
    )
};

export default TimerTime;