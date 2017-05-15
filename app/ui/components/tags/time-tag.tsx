import * as classnames from "classnames";
import * as React from "react";

interface TimeTagOwnProps {
    className?: string;
    milliseconds: number;
    small?: boolean;
}

export const TimeTag = ({ className, milliseconds, small }: TimeTagOwnProps) => {
    let unit = "ms";
    let mMilliseconds = milliseconds;

    if (milliseconds > 1000 * 60) {
        unit = "m";
        mMilliseconds = milliseconds / 1000 / 60;
    } else if (milliseconds > 1000) {
        unit = "s";
        mMilliseconds = milliseconds / 1000;
    }

    // Round to 0, 1, 2 decimal places depending on how big the number is
    if (mMilliseconds > 100) mMilliseconds = Math.round(mMilliseconds);
    else if (mMilliseconds > 10) mMilliseconds = Math.round(mMilliseconds * 10) / 10;
    else mMilliseconds = Math.round(mMilliseconds * 100) / 100;

    const description = `${ milliseconds.toFixed(1) } milliseconds`;
    const mClassName = classnames("tag", { "tag--small": small }, className);
    return (
        <div className={ mClassName } title={ description }>
            <strong>TIME</strong> { mMilliseconds } { unit }
        </div>
    );
};

export default TimeTag;
