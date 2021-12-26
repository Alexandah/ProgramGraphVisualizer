import * as React from "react";
import * as toastr from "toastr";
import 'free-jqgrid';
import { GridFieldModel, GridFieldSearchRulesModel, GridFunc } from "src/model/grid-field";
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
import ContributionModel from "src/model/contribution";
import CoreAPI from "src/api/core";


export default function AccessPlusContributionsView(props: AppModel) {
    const meta: GridFieldModel[] = [
        {
            key: true,
            label: "Member Name",
            name: "memberName",
            type: "text",
        } as GridFieldModel,
        {
            label: "Start Billing Period",
            name: "startBillingPeriod",
            type: "date",
            align: "right",
            search: true,
            searchoptions: GridFunc.searchOptionDate
        } as GridFieldModel,
        {
            label: "End Billing Period",
            name: "endBillingPeriod",
            type: "date",
            align: "right",
            search: true,
            searchoptions: GridFunc.searchOptionDate
        } as GridFieldModel,

        {
            label: "Base Monthly Contribution",
            name: "baseMonthlyContribution",
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
            label: "MCS",
            name: "medicalCostSharing",
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
            label: "Excess Needs Sharing",
            name: "excessNeedsCommunitySharing",
            type: "number",
            sorttype: "number",
            formatter:"currency",
            align: "right",
            search: false,
        } as GridFieldModel,
        {
            label: "New member MCS",
            name: "newMemberMedicalCostSharing",
            type: "number",
            formatter:"currency",
            align: "right",
            sorttype: "number",
            search: false,
        } as GridFieldModel,
        {
            label: "Regular Needs Sharing",
            name: "regularNeedsCommunitySharing",
            type: "number",
            sorttype: "number",
            formatter:"currency",
            align: "right",
            search: false,
        } as GridFieldModel,
        {
            label: "Passthrough Fees",
            name: "passThroughFees",
            type: "number",
            sorttype: "number",
            formatter:"currency",
            align: "right",
            search: true
        } as GridFieldModel,
        {
            label: "Additional Fees",
            name: "additionalFees",
            type: "number",
            sorttype: "number",
            formatter:"currency",
            align: "right",
            search: true
        } as GridFieldModel,
        {
            label: "Discount",
            name: "discount_amount",
            type: "number",
            sorttype: "number",
            formatter:"currency",
            align: "right",
            search: false,
        } as GridFieldModel,
        {
            label: "Distributions",
            name: "distributions",
            type: "number",
            sorttype: "number",
            formatter:"currency",
            align: "right",
            search: false,
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
            label: "Contribution Id",
            name: "id",
            type: "text",
            align: "right",
            search: false,
        } as GridFieldModel,
        {
            label: "Member Id",
            name: "memberId",
            type: "text",
            align: "right",
            search: false,
        } as GridFieldModel   
    ];
    const [grid, setGrid] = useState<any>();
    const [data, setData] = useState<ContributionModel[]>([]);
    const RESOURCE_NAME = 'accessPlus/contributions';


    function fetchData(query: QParamModel) {
        props.setIsLoading(true);

        CoreAPI
            .fetchData(RESOURCE_NAME, query)
            .then(r => setData(r))
            .catch(err => DataLayer.handleError(err, true))
            .finally(() => props.setIsLoading(false));
    }

    React.useEffect(() => {
        fetchData(new QParamModel(null, null, 1, 1000));
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
                refresh: true,
                view: false,
                refreshicon: 'fo icon-tag',
                refreshtext: 'Generate Invoices',
                beforeRefresh: (fid: any) => {
                    props.setIsLoading(true);
                    InvoiceAPI.createInvoicesFromAccessPlusContributions()
                        .then(r => {
                            if (!r || r.length == 0)
                                toastr.warning("No new invoice have been created. This is likely because all of the contributions have been invoiced already.", "No New Invoices");
                            else
                                toastr.success(`Total number of created invoices: ${r.length}.`, "Invoices Created");
                        })
                        .catch(err => DataLayer.handleError(err, true))
                        .finally(() => props.setIsLoading(false))
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
                    'id': fm.id, 'cell': [fm.memberName, fm.startBillingPeriod, fm.endBillingPeriod,
                    fm.baseMonthlyContribution, fm.medicalCostSharing, fm.excessNeedsCommunitySharing,
                    fm.newMemberMedicalCostSharing, fm.regularNeedsCommunitySharing,
                    sum(fm.passThroughFees), sum(fm.additionalFees), fm.discountAmount, sum(fm.distributions),
                    fm.totalContribution, fm.id, fm.memberId]
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


    // console.log(`Render:  ${++nRender}`);
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
                filename="contributions_access_plus.csv">
                CSV Export
        </CSVLink>
        }
    </div >
}