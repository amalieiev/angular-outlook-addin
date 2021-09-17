import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { TaskpaneComponent } from "./taskpane.component";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [TaskpaneComponent],
    bootstrap: [TaskpaneComponent],
})
export class TaskpaneModule {}
