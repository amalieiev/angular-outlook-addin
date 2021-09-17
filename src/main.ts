import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

Office.initialize = () => {
    const platform = platformBrowserDynamic();
    platform.bootstrapModule(AppModule);
};
