import * as React from "react";
import { METHOD_DELETE, METHOD_OPTIONS } from "../../../common/constants";
import * as util from "../../../common/misc";

interface MethodTagOwnProps {
    fullNames?: boolean;
    method: string;
}

export const MethodTag = ({ fullNames, method }: MethodTagOwnProps) => {
    let methodName = method;

    if (!fullNames) {
        if (methodName === METHOD_DELETE || methodName === METHOD_OPTIONS) {
            methodName = methodName.slice(0, 3);
        } else if (methodName.length > 4) {
            methodName = util.removeVowels(methodName).slice(0, 4);
        }
    }

    return (
        <div className={ `tag tag--no-bg tag--small http-method-${ method }` }>
            <span className="tag__inner">{ methodName }</span>
        </div>
    );
};

export default MethodTag;
