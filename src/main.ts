import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { TaskpaneModule } from "./taskpane/taskpane.module";

Office.initialize = () => {
    const platform = platformBrowserDynamic();
    platform.bootstrapModule(TaskpaneModule);
};
