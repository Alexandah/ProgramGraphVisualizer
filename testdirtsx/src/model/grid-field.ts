import 'free-jqgrid';
import * as toastr from "toastr";
import moment from "moment";
import ColumnModelWithoutLabel = FreeJqGrid.ColumnModelWithoutLabel;
import EditOptions = FreeJqGrid.EditOptions;
import SearchOptions = FreeJqGrid.SearchOptions;
import EditOrSearchRules = FreeJqGrid.EditOrSearchRules;

//----------------------------------------------------------------------------------------------------------------------
export class GridFieldSOptionsModel implements SearchOptions {
    constructor() {
        this.buildSelect = this.buildSelect.bind(this);
    }

    searchhidden: boolean = false;  // Hdden elements are not searchable . To enable searching set this option to true
    sopt: string[] = ['eq', 'ne'];
    dataUrl: string;
    value: string | { [propName: string]: string } | (() => string | { [propName: string]: string });

    dataInit?: (elem: any) => void;

    buildSelect(data: string, _jqXhr: JQueryXHR, _cm: any, _iCol: number) {
        const kvPairs = JSON.parse(data);
        const options = kvPairs.map((kv: any) => "<option value='" + kv[0] + "'>" + kv[1] + "</option>");
        const defaultOption = '<option disabled selected value> -- select an option -- </option>';
        return `<select>${defaultOption}${options}</select>`
    }
}

//----------------------------------------------------------------------------------------------------------------------
export class GridFieldSearchRulesModel implements EditOrSearchRules {
    required: boolean = false;  // If value is empty an error message will be displayed.
    number: boolean = false;    // If value is not a number an error message will be displayed.
    integer: boolean = false;   // If value is not a integer an error message will be displayed.
    minValue?: number;          // If value is less than this an error message will be displayed.
    maxValue?: number;          // If value is greater than this an error message will be displayed.
    email: boolean = false;     // If value is not valid e-mail an error message will be displayed
    url: boolean = false;       // If value is not valid url, an error message will be displayed
    date: boolean = false;      // If value from datefmt option is get (if not set ISO date is used) and the value will be checked and if this is not valid date, an error message will be displayed
    time: boolean = false;      // If value is not valid time, an error message will be displayed. Currently we support only hh:mm format and optional am/pm at the end
    custom: boolean = false;    // Allow definition of the custom checking rules via a custom function. See below
    custom_func: (value: any, colname: string) => [boolean, string];
}

//----------------------------------------------------------------------------------------------------------------------
export class GridFieldModel implements ColumnModelWithoutLabel {
    public constructor(
        fields?: {
            name?: string,
            label?: string,
            hidden?: number,
            type: string,
            align: string,
            sorttype: any,
            search: boolean,
            editoptions: EditOptions,
            searchoptions: GridFieldSOptionsModel,
            searchrules: GridFieldSearchRulesModel
        }) {
        if (fields) Object.assign(this, fields);
    }

    name: string;               // Internal field name
    label: string = "(no name)";// Show in gridSQ field and query builder
    autoResizable = false;
    hidden: boolean = false;    // Do not show this field in gridSQ
    sortable: boolean = false;  // can we sort by this field. for POC lets FALSE ?
    search: boolean = true;     // Does field appear in query builder
    size: number = 2;           // max number of digits\chars
    type: string = 'text';      // Field datatype: number, date, text, bool, choice
    width?: number;             // Width of this field on UI in px.
    editable: boolean = true;   // Is this field editable.
    key: boolean = false;       // This field is the ID or KEY field. Must be unique for each row, kind of like PK.

    sorttype: "integer" | "int" | "number" | "currency" | "float" | "numeric" | "boolean" | "date" | "datetime" | "text" | string | ((this: any, value: any, item: any) => any);
    edittype: "text" | "textarea" | "checkbox" | "select" | "password" | "button" | "image" | "file" | "custom" = "text";
    dataEvents?: any;

    align: "left" | "center" | "right" = "left";
    template: string;
    formatter: string;
    // formatoptions: { [id: string]: string };
    // formatoptions: any;
    stype: "select" | "checkbox" | "custom" | "text" = 'text';
    endpoint: string;

    editoptions: EditOptions;
    searchoptions: GridFieldSOptionsModel = new GridFieldSOptionsModel();
    searchrules: GridFieldSearchRulesModel = new GridFieldSearchRulesModel();
}

//======================================================================================================================
export class GridFunc {
    static afterRedraw(form: any): void {
        $('input[type="button"][value="-"]')
            .prop('value', '⌫ Delete');

        $('input[type="button"][value="+"]')
            .prop('value', '＋ Add rule');

        $('input[type="button"][value="+ {}"]')
            .prop('value', '⊕ Add group');

        $('.input-elm').css({ height: "2rem" });
        $('input[type="checkbox"]').replaceWith('<i class="fa fa-square-o" style="font-size:2rem; margin-right: 0.2rem; margin-left: 0.2rem" aria-hidden="true"/>');
    }
    //-----------------------------------------------------------------------------------------------------------------
    static beforeShowSearch(form: any): boolean {
        let grid = $('#grid');
        let searchDialog = form.closest(".ui-jqdialog");
        let gbox = $(grid.closest(".ui-jqgrid"));

        searchDialog.insertBefore(gbox);
        searchDialog.css({
            position: "relative",
            zIndex: "800",
            float: "left",
            width: "100%",
        });
        gbox.css({ clear: "left" });
        return true;
    }

    //-----------------------------------------------------------------------------------------------------------------
    static searchOptionDate: SearchOptions = {
        sopt: ["gt", "lt", 'eq', 'ne'],
        dataInit: (element: any) => {
            $(element).daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: moment().year() - 10,
                maxYear: moment().year() + 1,
            }, function (start: any, end: any, label: any) {
                toastr.success("Date Selected");
            });
        }
    }

    //-----------------------------------------------------------------------------------------------------------------
    // ['eq','ne','lt','le','gt','ge','bw','bn','in','ni','ew','en','cn','nc'] 
    static searchOptionNumber: SearchOptions = {
        searchhidden: false,
        sopt: ["eq", "ne", "gt", "lt"]
    }

    //-----------------------------------------------------------------------------------------------------------------
    static searchOptionSelect: SearchOptions = {
        searchhidden: false,
        sopt: ["eq", "ne"]
    }
}