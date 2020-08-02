import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TreeTableModule } from "primeng/treetable";

import { AppComponent, JsonPipe } from "./app.component";
import { TableViewComponent } from "./components/table-view/table-view.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    declarations: [AppComponent, JsonPipe, TableViewComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatButtonModule,
        MatToolbarModule,
        AppRoutingModule,
        TreeTableModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
