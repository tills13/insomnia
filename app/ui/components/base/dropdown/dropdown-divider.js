import React, { PropTypes, PureComponent } from "react";
import classnames from "classnames";

class DropdownDivider extends PureComponent {
    render() {
        const { children } = this.props;

        const classes = classnames(
            "dropdown__divider",
            { "dropdown__divider--no-name": !children }
        );

        return (
            <li className={ classes }>
                <span className="dropdown__divider__label">
                    { children }
                </span>
            </li>
        );
    }
}

DropdownDivider.propTypes = {
    children: PropTypes.node
};

export default DropdownDivider;
