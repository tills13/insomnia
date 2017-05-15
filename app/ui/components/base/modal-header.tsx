import * as classnames from "classnames";
import * as React from "react";

interface ModalHeaderOwnProps {
    className?: string;
    hideCloseButton?: boolean;
}

export class ModalHeader extends React.Component<ModalHeaderOwnProps, any> {
    render() {
        const { hideCloseButton, className, children } = this.props;
        let closeButton = null;

        if (!hideCloseButton) {
            closeButton = (
                <button type="button" className="btn btn--compact modal__close-btn" data-close-modal="true">
                    <i className="fa fa-times" />
                </button>
            );
        }

        const mClassName = classnames("modal__header", className);

        return (
            <div className={ mClassName }>
                <div className="modal__header__children">
                    { children }
                </div>
                { closeButton }
            </div>
        );
    }
}

export default ModalHeader;
