import * as React from "react";
import * as toastr from "toastr";
import 'free-jqgrid';
import { GridFieldModel, GridFieldSearchRulesModel, GridFieldSOptionsModel, GridFunc } from "src/model/grid-field";
import SearchingDialogOptions = FreeJqGrid.SearchingDialogOptions;
import JqFilterDiv = FreeJqGrid.JqFilterDiv;
import JqFilterOptions = FreeJqGrid.JqFilterOptions;
import AppModel from "src/model/app";
import DataLayer from "src/datalayer";
import { useState } from "react";
import TransactionModel from "../../model/transaction";
import 'daterangepicker';
import QParamModel from "src/model/qparam";
import { CSVLink } from "react-csv";
import CoreAPI from "src/api/core";


export default function AccessPlusTransactionsView(props: AppModel) {
    const meta: GridFieldModel[] = [
        {
            key: true,
            label: "Member Name",
            name: "memberName",
            type: "text",
        } as GridFieldModel,
        {
            label: "Transaction Start",
            name: "transactionStartDate",
            type: "date",
            align: "right",
            search: false,
        } as GridFieldModel,
        {
            label: "Transaction End",
            name: "transactionEndDate",
            type: "date",
            align: "right",
            search: false,
        } as GridFieldModel,
        {
            label: "Transaction Type",
            name: "transactionType",
            type: "text",
            width:100,
            align: "right",
            search: true,
            searchoptions: {sopt: ["eq", "ne"],value : "AccountFunding:Account Funding;AddOnsDistribution:Add-Ons Distribution;Distribution:Distribution;MonthlyContributionDue:Monthly Contribution Due;PaymentClearance:Payment Clearance;ServiceFeeDistribution:Service Fee Distribution"},
            stype: "select",
        } as GridFieldModel,
        {
            label: "Payment Type",
            name: "paymentType",
            type: "text",
            width:100,
            align: "right",
            search: true,
            searchoptions: {sopt: ["eq", "ne"],value : "Distribution: Distribution; Receivables: Receivables; Transit: Transit; ExcessNeeds: Excess Needs; SederaInc: Sedera Inc; SederaNonProfit: Sedera MCS;AcbFees: ACB Fees; RegularNeeds: Regular Needs"},
            stype: "select",
        } as GridFieldModel,
        {
            label: "Total Contribution",
            name: "totalContribution",
            type: "number",
            sorttype: "number",
            formatter:"currency",
            align: "right",
            editable: true,
            search: true,
            searchoptions: GridFunc.searchOptionNumber,
            searchrules: { number: true } as GridFieldSearchRulesModel
        } as GridFieldModel,
        {
            hidden: false,
            key: true,
            label: "Member Id",
            name: "memberId",
            type: "text",
        } as GridFieldModel,
        {
            label: "Transaction Id",
            name: "id",
            type: "text",
            align: "right",
            search: false,
        } as GridFieldModel,
    ];
    const [grid, setGrid] = useState<any>();
    const [data, setData] = useState<TransactionModel[]>([]);
    const RESOURCE_NAME = "accessPlus/transactions";

    function fetchData(query: QParamModel) {
        props.setIsLoading(true);
        CoreAPI
            .fetchData(RESOURCE_NAME, query)
            .then(r => setData(r))
            .catch(err => DataLayer.handleError(err, true))
            .finally(() => props.setIsLoading(false));
    }

    React.useEffect(() => {
        fetchData(new QParamModel(null, null, 1, 100));
        CoreAPI.fetchStats(RESOURCE_NAME)
            .then(r => props.setWidgets(r))
            .catch(err => DataLayer.handleError(err, true))

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
            rowNum: 10,
            altRows: true, // Set a zebra-striped grid (alternate rows have different styles)
            rowList: [10, 50, "10000:All"],
            navOptions: {
                del: false,
                add: false,
                edit: false,
                search: false,
                refresh: false,
                view: false,
                // viewtext: 'View',
                delfunc: (fid: string) => {
                    toastr.warning("Delete feature is not yet implemented", "NOT IMPLEMENTED");
                    return true;
                }
            },
            rownumbers: false,
            hidegrid: false,
            shrinkToFit: true,
            autowidth: false, // Recalculated width automatically to the width of the parent element. This is done only initially when the grid is created. In order to resize the grid when the parent element changes width you should apply custom code and use the setGridWidth method for this purpose

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

        let r = [];

        if (data)
            for (let fm of data)
                r.push({
                    'id': fm.id, 'cell': [fm.memberName,
                    fm.transactionStartDate, fm.transactionEndDate, fm.transactionType, fm.paymentType,
                    fm.totalContribution,
                    fm.memberId, fm.id]
                })

        grid.jqGrid('clearGridData');
        grid.jqGrid('setGridParam', { data: r });
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


    function sum(obj: any) {
        var sum = 0;
        if (obj != null && obj != {})
            for (var el in obj) {
                if (obj.hasOwnProperty(el)) {
                    sum += parseFloat(obj[el]);
                }
            }
        return sum;
    }

    return <div>
        <table id='grid' />
        <br />
        <br />
        <br />
        {data &&
            <CSVLink data={data}
                headers={meta.flatMap(cur => {
                    if (cur.name == "passThroughFees")
                        return [
                            { label: "Banking Fee", key: "passThroughFees.bankingFee" },
                            { label: "Patient Advocacy", key: "passThroughFees.patientAdvocacy" },
                            { label: "Second Opinion", key: "passThroughFees.secondOpinion" },
                            { label: "Telemedicine", key: "passThroughFees.telemedicine" },
                            { label: "Liberty Rx", key: "passThroughFees.libertyRx" }];
                    if (cur.name == "additionalFees")
                        return [
                            { label: "Tobacco Use", key: "additionalFees.tobaccoUse" },
                            { label: "Member Services", key: "additionalFees.memberServices" },]
                    if (cur.name == "distributions")
                        return { label: "Tobacco Use MCS", key: "distributions.tobaccoUseMcs" }

                    return [{ label: cur.label, key: cur.name }]
                }, [])}
                className="sl-button-export cl-position-absolute"
                filename="transactions.csv">
                CSV Export
        </CSVLink>
        }
    </div >
}