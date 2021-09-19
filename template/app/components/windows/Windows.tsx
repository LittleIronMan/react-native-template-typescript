import React from 'react';
import { showWindow } from 'rnweb_ui';
import { FileTreeData, getFolderContent, FileTree } from 'ironman_utils';
import { FileBrowser } from 'rnweb_ui';
import WindowSignUp from 'windows/WindowSignUp';
import WindowLoading from 'windows/WindowLoading';
import WindowError from 'windows/WindowError';
import Window_Test from 'windows/Window_Test';
import WindowCreateNewFolder from './WindowCreateNewFolder';
import WindowSelectImage from 'windows/WindowSelectImage';

import config from 'global/config';
import { EventEmitter } from 'ironman_utils';

function createFolder(fs: FileTreeData, fileBrowserRef: FileBrowser) {
    const cd = getFolderContent(fs.data.fileTree, fileBrowserRef.state.currentCatalog);

    if (!cd) {
        return;
    }

    windows.showCreateFolderWindow(cd, (dirname) => {
        FileTree.addFolder(cd, dirname);
        fileBrowserRef.forceUpdate();
    });
}

const windows = {
    showSignUpWindow: (onSignUp: () => void) => showWindow({
        id: 'signUp',
        component: WindowSignUp,
        props: (self) => ({
            onSubmit: async (email, password, login) => {
                const loading = windows.showLoadingWindow();

                // const res = await cloudApi.auth.signUp(email, password);
                const res: any = true;

                loading.close();

                if (res instanceof Error) {
                    windows.showErrorWindow(res.message);
                } else {
                    self.close();
                    onSignUp();
                }
            }
        })
    }),

    showCreateFolderWindow: (cd: FileTree, onCreate: (dirname: string) => void) => showWindow({
        id: 'createFolder', 
        component: WindowCreateNewFolder,
        props: {
            cd,
            onSubmit: onCreate
        }
    }),

    showSelectImageWindow: (imagesStorage: FileTreeData, selectedImageHook: EventEmitter<string>) => showWindow({
        id: 'selectComponent', 
        component: WindowSelectImage,
        props: {
            imagesStorage,
            newImage: (fileBrowserRef) => {

            },
            createFolder: createFolder.bind(null, imagesStorage),
            onSelectImage: (path) => {
                selectedImageHook.updateData(path);
            }
        }
    }),

    showLoadingWindow: (allowClose = false) => showWindow({
        id: 'loading',
        component: WindowLoading,
        options: { cannotBeClosedByUser: !allowClose },
    }),

    showErrorWindow: (err: string, title?: string) => showWindow({
        id: 'error',
        component: WindowError,
        props: {errorDesc: err, errorTitle: title},
    }),

    testWindow: (id: string, title: string, content: React.ReactNode) => showWindow({
        id,
        component: Window_Test,
        props: {title, content},
    }),
};

config.devTools('windows', windows);

export default windows;