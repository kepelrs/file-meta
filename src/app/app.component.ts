import { Component, Pipe, PipeTransform, OnInit } from "@angular/core";
import { DatabaseService } from "./data-access/database.service";
import { FileMeta } from "./data-access/entities/file-meta.entity";
import { promises as fs, Stats } from "fs";
import * as md5File from "md5-file";
import * as walkdir from "walkdir";
import {
    TreeNode,
    FSEntry,
} from "./components/table-view/table-view.component";

interface ExtendedStats extends Stats {
    $isDirectory: boolean;
    $isSymbolicLink: boolean;
    isDirectory: () => boolean;
    isSymbolicLink: () => boolean;
}

interface ExtendedWalk {
    [path: string]: ExtendedStats;
}

@Pipe({ name: "prettyJson", pure: false })
export class JsonPipe implements PipeTransform {
    transform(value: any): string {
        return JSON.stringify(value, null, 2);
    }
}

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    files: ExtendedWalk = {};
    treeNodes: TreeNode<FSEntry>[] = [];
    count = { a: 0 };

    hashes: string[] = [];

    fileMetas: FileMeta[] = [];
    // displayedColumns: string[] = ["Id", "FirstName", "LastName", "Age"];

    constructor(private databaseService: DatabaseService) {}

    async ngOnInit() {
        this.getFileMetas();

        console.time("walkTime");
        await this.loadFiles();
        console.timeEnd("walkTime");
    }

    getFileMetas() {
        this.databaseService.connection
            .then(() => FileMeta.find())
            .then((fileMetas) => {
                this.fileMetas = fileMetas;
            });
    }

    async loadFiles() {
        const targetDir = "./node_modules";
        const tree = ((await walkdir.async(targetDir, {
            return_object: true,
            max_depth: 1,
        })) as unknown) as ExtendedWalk;

        this.files = tree;
        this.count = { a: Object.keys(tree).length };
        for (const key in tree) {
            tree[key].$isDirectory = tree[key].isDirectory();
            tree[key].$isSymbolicLink = tree[key].isSymbolicLink();
        }
        this.filesToTreeNodes();
    }

    filesToTreeNodes() {
        const treeNodes: TreeNode<FSEntry>[] = [];
        for (const key in this.files) {
            const stat = this.files[key];
            const node = {
                data: {
                    name: key.split("/").slice(-1).join(""),
                    size: "1.8 MB",
                    items: 5,
                    kind: "pasta",
                },
            };
            treeNodes.push(node);
        }
        this.treeNodes = treeNodes;
    }
}
