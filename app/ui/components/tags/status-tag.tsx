import * as classnames from "classnames";
import * as React from "react";
import { RESPONSE_CODE_DESCRIPTIONS, STATUS_CODE_RENDER_FAILED } from "../../../common/constants";

interface StatusTagOwnProps {
    statusCode: number;
    statusMessage?: string;
    small?: boolean;
}

const StatusTag = ({ statusMessage, statusCode, small }: StatusTagOwnProps) => {
    let mStatusCode = String(statusCode);

    let colorClass;
    let backupStatusMessage;

    if (mStatusCode.startsWith("1")) {
        colorClass = "bg-info";
        backupStatusMessage = "INFO";
    } else if (mStatusCode.startsWith("2")) {
        colorClass = "bg-success";
        backupStatusMessage = "SUCCESS";
    } else if (mStatusCode.startsWith("3")) {
        colorClass = "bg-surprise";
        backupStatusMessage = "REDIRECT";
    } else if (mStatusCode.startsWith("4")) {
        colorClass = "bg-warning";
        backupStatusMessage = "INVALID";
    } else if (mStatusCode.startsWith("5")) {
        colorClass = "bg-danger";
        backupStatusMessage = "ERROR";
    } else if (mStatusCode.startsWith("0")) {
        colorClass = "bg-danger";
        backupStatusMessage = "ERROR";
        mStatusCode = "";  // Don't print a 0 status code
    } else if (mStatusCode === STATUS_CODE_RENDER_FAILED.toString()) {
        colorClass = "bg-danger";
        backupStatusMessage = "Uh Oh!\xa0\xa0٩◔̯◔۶";
        mStatusCode = "";  // Don't print status code
    } else {
        colorClass = "bg-danger";
        backupStatusMessage = "UNKNOWN";
    }

    const description = RESPONSE_CODE_DESCRIPTIONS[mStatusCode] || "Unknown Response Code";
    const message = typeof statusMessage === "string" ? statusMessage : backupStatusMessage;

    return (
        <div
            className={ classnames("tag", colorClass, { "tag--small": small }) }
            title={ description }
        >
            <strong>{ mStatusCode }</strong> { message.toUpperCase() }
        </div>
    );
};

export default StatusTag;
