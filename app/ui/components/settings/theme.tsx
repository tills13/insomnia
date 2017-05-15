import autobind from "autobind-decorator";
import { chunk } from "lodash";
import * as React from "react";
import Button from "../base/button";

import * as imgDark from "../../images/dark.png";
import * as imgDefault from "../../images/default.png";
import * as imgLight from "../../images/light.png";
import * as imgMaterial from "../../images/material.png";
import * as imgPurple from "../../images/purple.png";
import * as imgRailscasts from "../../images/railscasts.png";
import * as imgSolarizedDark from "../../images/solarized-dark.png";
import * as imgSolarizedLight from "../../images/solarized-light.png";
import * as imgSolarized from "../../images/solarized.png";

import * as session from "../../../sync/session";

const THEMES_PER_ROW = 3;
const THEMES = [
    { key: "default", name: "Insomnia", img: imgDefault },
    { key: "light", name: "Simple Light", img: imgLight },
    { key: "dark", name: "Simple Dark", img: imgDark },
    { key: "purple", name: "Purple", img: imgPurple, paid: true },
    { key: "material", name: "Material", img: imgMaterial, paid: true },
    { key: "solarized", name: "Solarized", img: imgSolarized, paid: true },
    { key: "solarized-light", name: "Solarized Light", img: imgSolarizedLight, paid: true },
    { key: "solarized-dark", name: "Solarized Dark", img: imgSolarizedDark, paid: true },
    { key: "railscasts", name: "Railscasts", img: imgRailscasts, paid: true }
];

interface ThemeOwnProps {
    handleChangeTheme: (event) => void;
    activeTheme: any;
}

@autobind
export class Theme extends React.PureComponent<ThemeOwnProps, any> {
    state = {
        isPremium: window.localStorage.getItem("settings.theme.isPremium") || false
    };

    componentDidMount() {
        if (!session.isLoggedIn()) {
            this.setState({ isPremium: false });
            return;
        }

        session.whoami().then(({ isPremium }) => {
            this.setState({ isPremium });
            window.localStorage.setItem("settings.theme.isPremium", isPremium);
        });
    }

    renderTheme = (theme) => {
        const { handleChangeTheme, activeTheme } = this.props;
        const isActive = activeTheme === theme.key;

        return (
            <div key={ theme.key } className="themes__theme" style={ { maxWidth: `${ 100 / THEMES_PER_ROW }%` } }>
                <h2 className="txt-lg">
                    { theme.name }
                    { " " }
                    { isActive ? <span className="no-margin-top faint italic txt-md">(Active)</span> : null }
                </h2>
                <Button onClick={ handleChangeTheme } value={ theme.key }>
                    <img src={ theme.img } alt={ theme.name } style={ { maxWidth: "100%" } } />
                </Button>
            </div>
        );
    }

    renderThemeRows(themes) {
        const rows = chunk(themes, THEMES_PER_ROW);

        return rows.map((row, i) => (
            <div key={ i } className="themes__row">
                { row.map(this.renderTheme) }
            </div>
        ));
    }

    render() {
        return (
            <div className="themes pad-top">
                { this.renderThemeRows(THEMES) }
            </div>
        );
    }
}

export default Theme;
