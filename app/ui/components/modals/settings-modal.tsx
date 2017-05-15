import * as React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { getAppName, getAppVersion } from "../../../common/constants";

import * as models from "../../../models/index";
import * as session from "../../../sync/session";

import Button from "../base/button";
import Modal from "../base/modal";
import ModalBody from "../base/modal-body";
import ModalHeader from "../base/modal-header";
import Account from "../settings/account";
import General from "../settings/general";
import ImportExport from "../settings/import-export";
import SettingsShortcuts from "../settings/shortcuts";
import Theme from "../settings/theme";

export const TAB_INDEX_EXPORT = 1;

interface SettingsModalOwnProps {
    handleExportWorkspaceToFile: () => void;
    handleExportAllToFile: () => void;
    handleImportFile: () => void;
    handleImportUri: (uri: string) => void;

    settings: any;
}

interface SettingsModalState {
    currentTabIndex?: number;
}

export class SettingsModal extends React.Component<SettingsModalOwnProps, SettingsModalState> {
    state: SettingsModalState = {
        currentTabIndex: -1
    };

    private currentTabIndex = -1;
    private mModal;

    setModalRef = (modal) => {
        console.log(modal, this.mModal);
        this.mModal = modal;
        console.log(modal, this.mModal);
    }

    handleTabSelect = (currentTabIndex) => {
        this.setState({ currentTabIndex });
    }

    handleUpdateSetting = (key, value) => {
        models.settings.update(this.props.settings, { [key]: value });
    }

    handleExportAllToFile = () => {
        this.props.handleExportAllToFile();
        this.mModal.hide();
    }

    handleExportWorkspace = () => {
        this.props.handleExportWorkspaceToFile();
        this.mModal.hide();
    }

    handleImportFile = () => {
        this.props.handleImportFile();
        this.mModal.hide();
    }

    handleImportUri = (uri) => {
        this.props.handleImportUri(uri);
        this.mModal.hide();
    }

    handleChangeTheme = (theme, persist = true) => {
        document.body.setAttribute("theme", theme);

        if (persist) {
            models.settings.update(this.props.settings, { theme });
        }
    }

    componentDidMount() {
        this.handleChangeTheme(this.props.settings.theme, false);
    }

    show = (currentTabIndex = 0) => {
        this.setState({ currentTabIndex });
        this.mModal.show();
    }

    hide = () => {
        this.mModal.hide();
    }

    toggle = (currentTabIndex = 0) => {
        this.setState({ currentTabIndex });
        this.mModal.toggle();
    }

    public render() {
        const { settings, children, ...props } = this.props;
        const { currentTabIndex } = this.state;
        const email = session.isLoggedIn() ? session.getEmail() : null;

        return (
            <Modal {...props} ref={ this.setModalRef }>
                <ModalHeader>
                    { getAppName() } Preferences
                    <span className="faint txt-sm">
                        { ` v${ getAppVersion() }` }
                        { email ? ` – ${ email }` : null }
                    </span>
                </ModalHeader>
                <ModalBody noScroll>
                    <Tabs onSelect={ this.handleTabSelect }
                        selectedIndex={ currentTabIndex }
                        forceRenderTabPanel>
                        <TabList>
                            <Tab selected={ this.currentTabIndex === 0 }>
                                <Button value="General">General</Button>
                            </Tab>
                            <Tab selected={ this.currentTabIndex === 1 }>
                                <Button value="Import/Export">Import/Export</Button>
                            </Tab>
                            <Tab selected={ this.currentTabIndex === 2 }>
                                <Button value="Themes">Themes</Button>
                            </Tab>
                            <Tab selected={ this.currentTabIndex === 3 }>
                                <Button value="shortcuts">Shortcuts</Button>
                            </Tab>
                            <Tab selected={ this.currentTabIndex === 4 }>
                                <Button value="Account">Account</Button>
                            </Tab>
                        </TabList>
                        <TabPanel className="pad scrollable">
                            <General
                                settings={ settings }
                                updateSetting={ this.handleUpdateSetting }
                            />
                        </TabPanel>
                        <TabPanel className="pad scrollable">
                            <ImportExport
                                handleExportAll={ this.handleExportAllToFile }
                                handleExportWorkspace={ this.handleExportWorkspace }
                                handleImportFile={ this.handleImportFile }
                                handleImportUri={ this.handleImportUri }
                            />
                        </TabPanel>
                        <TabPanel className="scrollable">
                            <Theme
                                handleChangeTheme={ this.handleChangeTheme }
                                activeTheme={ settings.theme }
                            />
                        </TabPanel>
                        <TabPanel className="pad scrollable">
                            <SettingsShortcuts />
                        </TabPanel>
                        <TabPanel className="pad scrollable">
                            <Account />
                        </TabPanel>
                    </Tabs>
                </ModalBody>
            </Modal>
        );
    }
}

export default SettingsModal;
