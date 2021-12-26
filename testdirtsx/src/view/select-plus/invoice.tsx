import * as React from "react";
import * as toastr from "toastr";
import 'free-jqgrid';
import { GridFieldModel, GridFunc, GridFieldSearchRulesModel, GridFieldSOptionsModel } from "src/model/grid-field";
import SearchingDialogOptions = FreeJqGrid.SearchingDialogOptions;
import JqFilterDiv = FreeJqGrid.JqFilterDiv;
import JqFilterOptions = FreeJqGrid.JqFilterOptions;
import AppModel from "src/model/app";
import DataLayer from "src/datalayer";
import InvoiceAPI from "src/api/invoice";
import { useState } from "react";
import 'daterangepicker';
import QParamModel from "src/model/qparam";
import { CSVLink } from "react-csv";
import InvoiceModel from "src/model/invoice";
import CoreAPI from "src/api/core";



export default function SelectPlusInvoiceCollectionView(props: AppModel) {
    const meta: GridFieldModel[] = [
        {
            label: "Employer Name",
            name: "employerName",
            type: "text",
            align: "right",
            width: 250,
            search: true,
        } as GridFieldModel,
        {
            label: "Invoice Date",
            name: "startBillingPeriod",
            type: "date",
            align: "right",
            search: true,
            searchoptions: GridFunc.searchOptionDate,
        } as GridFieldModel,
        {
            label: "Payment Date",
            name: "fundingEndDate",
            type: "date",
            align: "right",
            search: true,
            searchoptions: GridFunc.searchOptionDate,
        } as GridFieldModel,
        {
            label: "Sedera Inc Posting Date",
            name: "feeDistributionEndDate",
            type: "date",
            align: "right",
            search: true,
            searchoptions: GridFunc.searchOptionDate,
        } as GridFieldModel,
        {
            label: "Sedera MCS Posting Date",
            name: "addOnDistributionEndDate",
            type: "date",
            align: "right",
            search: true,
            searchoptions: GridFunc.searchOptionDate,
        } as GridFieldModel,
        {
            hidden: false,
            label: "Payment Status",
            name: "status",
            type: "text",
            search: true,
            autoResizable: true,
            formatter: "select",
            template: "select",
            edittype: "select",
            stype: "select",
            align: "right",
            searchoptions: GridFunc.searchOptionSelect,
            editoptions: { value: "Open:Open;Paid:Paid;PartialPay:Partially Paid" }
        } as GridFieldModel,
        {
            label: "Payment Create Date",
            name: "paymentDate",
            type: "date",
            align: "right",
            search: true,
            searchoptions: GridFunc.searchOptionDate,
        } as GridFieldModel,
        {
            label: "Amount Invoiced",
            name: "amount",
            type: "number",
            align: "right",
            sorttype: "number",
            formatter:"currency",
            editable: true,
            search: true,
            searchoptions: GridFunc.searchOptionNumber,
            searchrules: { number: true } as GridFieldSearchRulesModel
        } as GridFieldModel,
        {
            label: "Amount Paid",
            name: "paymentAmount",
            type: "number",
            align: "right",
            sorttype: "number",
            formatter:"currency",
            editable: true,
            search: true,
            searchoptions: GridFunc.searchOptionNumber,
            searchrules: { number: true } as GridFieldSearchRulesModel
        } as GridFieldModel,
        {
            label: "Open Balance",
            name: "openBalance",
            type: "number",
            align: "right",
            sorttype: "number",
            formatter:"currency",
            editable: true,
            search: true,
            searchoptions: GridFunc.searchOptionNumber,
            searchrules: { number: true } as GridFieldSearchRulesModel
        } as GridFieldModel,
        {
            label: "Open Balance Inc",
            name: "openBalanceInc",
            type: "number",
            align: "right",
            sorttype: "number",
            formatter:"currency",
            editable: true,
            search: true,
            searchoptions: GridFunc.searchOptionNumber,
            searchrules: { number: true } as GridFieldSearchRulesModel
        } as GridFieldModel,
        {
            hidden: true,
            label: "Employer Id",
            name: "employerId",
            type: "text",
            align: "right",
            search: false,
        } as GridFieldModel
    ];
    const [grid, setGrid] = useState<any>();
    const [data, setData] = useState<InvoiceModel[]>([]);
    const RESOURCE_NAME = "selectPlus/invoices";

    function fetchData(query: QParamModel) {
        props.setIsLoading(true);

        CoreAPI
            .fetchData(RESOURCE_NAME, query)
            .then(r => setData(r))
            .catch(err => DataLayer.handleError(err, true))
            .finally(() => props.setIsLoading(false));
    }

    function invoiceLines(subgrid_id: string, row_id: string) {
        var subgrid_table_id = subgrid_id + "_t",
            pager_id = "p_" + subgrid_table_id,
            localRowData = $(this).jqGrid("getLocalRow", row_id);
        $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "'></table><div id='" + pager_id + "'></div>");
        $("#" + subgrid_table_id).jqGrid({
            datatype: "local",
            data: (localRowData as any).cell[12],
            colModel: [
                {
                    label: "Company Name",
                    name: "company",
                    type: "text",
                    align: "center",
                    width: 250,
                    search: true,
                } as GridFieldModel,
                {
                    label: "Amount Invoiced",
                    name: "amount",
                    type: "number",
                    align: "center",
                    sorttype: "number",
                    formatter:"currency",
                    editable: true,
                    search: true,
                    searchoptions: GridFunc.searchOptionNumber,
                    searchrules: { number: true } as GridFieldSearchRulesModel
                } as GridFieldModel
            ],
            rowNum: 20,
            idPrefix: "s_" + row_id + "_",
            pager: "#" + pager_id,
            autowidth: true,
            autoencode: true,
            sortname: "num",
            sortorder: "asc",
            height: "auto"
        }).jqGrid('navGrid', "#" + pager_id, { edit: false, add: false, del: false });
    }

    React.useEffect(() => {
        fetchData(new QParamModel(null, null, 1, 1000));

        CoreAPI.fetchStats(RESOURCE_NAME)
            .then(r => props.setWidgets(r))
            .catch(err => DataLayer.handleError(err, true));

        let grid = $('#grid');
        setGrid(grid);

        grid.jqGrid({
            colModel: meta,
            localReader: {
                repeatitems: true,
            },
            pager: true,
            datatype: "local",
            iconSet: "fontAwesome",
            guiStyle: "bootstrap4",
            autoencode: true,
            autoresizeOnLoad: true,
            viewrecords: true,
            multiselect: false,
            multiPageSelection: false,
            multiselectPosition: "none",
            rownumbers: false,
            rowNum: 15,
            altRows: true, // Set a zebra-striped grid (alternate rows have different styles)
            rowList: [15, 75, "10000:All"],
            cmTemplate: { editable: true, autoResizable: true },
            subGrid: true,
            autoResizing: { compact: true },
            subGridRowExpanded: invoiceLines,
            navOptions: {
                iconsOverText: false,
                add: false,
                edit: false,
                search: false,
                refresh: false,
                del: false,
                view: false,
            },
            hidegrid: false,
            shrinkToFit: false,
            autowidth: true, // Recalculated width automatically to the width of the parent element. This is done only initially when the grid is created. In order to resize the grid when the parent element changes width you should apply custom code and use the setGridWidth method for this purpose

            searching: {
                overlay: 0,
                Reset: "Reset",
                caption: "Filter",
                drag: false,
                clearSearch: false,
                closeAfterSearch: false,
                closeAfterReset: false,
                closeOnEscape: false,
                searchOnEnter: true,
                multipleSearch: true,
                multipleGroup: true,
                recreateForm: true,
                showQuery: false,
                recreateFilter: true,
                groupOps: [
                    { op: "AND", text: "Match ALL" },
                    { op: "OR", text: "Match ANY" }],
                beforeShowSearch: GridFunc.beforeShowSearch,
                afterRedraw: GridFunc.afterRedraw,
                afterChange: gridSearchAfterChange,
                onReset: () => props.setDefinition(props.barItemCurr.definitionFromServer),
                onSearch: gridSearchButtonClick,
            }
        })
            .jqGrid("navGrid")
            .searchGrid({ searchOnEnter: true });
    }, []);

    React.useEffect(() => {
        if (grid == null)
            return;

        const arr = data != null ? data : []

        grid.jqGrid('clearGridData');
        grid.jqGrid('setGridParam', { data: arr.map(fm => { return { 'id': fm.id, 'cell': [...meta.map(x => (fm as any)[x.name]), fm.subgrid] } }) });
        grid.getGridParam("postData").filters = props.barItemCurr.definition;

        grid.trigger('reloadGrid');
        grid.searchGrid();
    });

    function gridSearchButtonClick(filters: any) {
        if (props.isLoading)
            return;

        let grid = $('#grid');
        fetchData(new QParamModel(null, grid.getGridParam("postData").filters, 1, 200));
        return false;
    }

    function gridSearchAfterChange(filter: JQuery, options: SearchingDialogOptions, filterOptions: JqFilterOptions, searchFilterDiv: JqFilterDiv) {
        $('input[type="checkbox"]').replaceWith('<i class="fa fa-square-o" style="font-size:2rem; margin-right: 0.2rem; margin-left: 0.2rem" aria-hidden="true"/>');
        props.setDefinition(filterOptions.filter);
    }

    let headers = meta.map(x => ({
            label: x.label,
            key: x.name
        }
    ));
    let MCS = { label: 'Sedera MCS', key: 'subgrid.0.amount' };
    let INC = { label: 'Sedera INC', key: 'subgrid.1.amount' };
    headers.push(MCS);
    headers.push(INC);

    return <div>
        <table id='grid' />
        <br />
        <br />
        <br />
        <button
            className="sl-button-export cl-position-left"
            onClick={e => {
                props.setIsLoading(true);
                InvoiceAPI.createPaymentsForSelectPlusInvoices()
                    .then(r => {
                        if (r && r.length != 0)
                            toastr.success(`Created/Updated ${r.length} payments`, "Payments Generated");
                        else
                            toastr.warning("While operation is successful no new payments have been created.", "No New Payments")
                        fetchData(new QParamModel(null, null, 1, 100));
                        CoreAPI.fetchStats(RESOURCE_NAME)
                            .then(r => props.setWidgets(r))
                            .catch(err => DataLayer.handleError(err, true));
                    })
                    .catch(err => DataLayer.handleError(err, true))
                    .finally(() => props.setIsLoading(false));
            }
            }
        >Generate Payments
        </button>

        {data &&
            <CSVLink data={data}
                headers={headers}
                className="sl-button-export cl-position-absolute"
                filename="invoices.csv">
                CSV Export
        </CSVLink>
        }
    </div >
}