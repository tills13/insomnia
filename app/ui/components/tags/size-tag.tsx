import * as classnames from "classnames";
import * as React from "react";
import * as misc from "../../../common/misc";

interface SizeTagOwnProps {
    bytes: number;
    className?: string;
    small?: boolean;
}

export const SizeTag = ({ bytes, className, small }: SizeTagOwnProps) => {
    const responseSizeString = misc.describeByteSize(bytes);
    return (
        <div className={ classnames("tag", { "tag--small": small }, className) }
            title={ `${ bytes } bytes` }>
            <strong>SIZE</strong> { responseSizeString }
        </div>
    );
};

export default SizeTag;
