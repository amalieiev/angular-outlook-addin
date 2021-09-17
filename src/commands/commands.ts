/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global global, Office, self, window */

Office.initialize = () => {};

/**
 * Shows a notification when the add-in command is executed.
 * @param event
 */
function onMessageComposeHandler(event: Office.AddinCommands.Event) {
    // Be sure to indicate when the add-in command function is complete
    event.completed();
}

function getGlobal() {
    return typeof self !== "undefined"
        ? self
        : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : undefined;
}

const g = getGlobal() as any;

// The add-in command functions need to be available in global scope
g.action = onMessageComposeHandler;

Office.actions.associate("onMessageComposeHandler", onMessageComposeHandler);
