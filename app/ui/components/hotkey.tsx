import * as React from "react";
import { ALT_SYM, isMac, joinHotKeys, MOD_SYM, SHIFT_SYM } from "../../common/constants";

interface HotkeyOwnProps {
    alt?: boolean;
    char: string;
    className?: string;
    shift?: boolean;
}

class Hotkey extends React.PureComponent<HotkeyOwnProps, any> {
    render() {
        const { char, shift, alt, className } = this.props;
        const chars = [];

        alt && chars.push(ALT_SYM);
        shift && chars.push(SHIFT_SYM);
        chars.push(MOD_SYM);
        chars.push(char);

        return (
            <span className={ `${ isMac() ? "font-normal" : "" } ${ className }` }>
                { joinHotKeys(chars) }
            </span>
        );
    }
}

export default Hotkey;
