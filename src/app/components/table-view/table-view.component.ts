import { Component, OnInit, Input } from "@angular/core";

export interface TreeNode<T> {
    data: T;
    children?: TreeNode<T>[];
    expanded?: boolean;
}

export interface FSEntry {
    name: string;
    size: string;
    kind: string;
    items?: number;
}

@Component({
    selector: "app-table-view",
    templateUrl: "./table-view.component.html",
    styleUrls: ["./table-view.component.scss"],
})
export class TableViewComponent {}
