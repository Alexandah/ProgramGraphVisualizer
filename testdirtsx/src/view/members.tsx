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
import 'daterangepicker';
import QParamModel from "src/model/qparam";
import MemberModel from "src/model/member";
import EmployerAPI from "src/api/employer";
import CoreAPI from "src/api/core";
import { CSVLink } from "react-csv";

export default function MemberCollectionView(props: AppModel) {
    const meta: GridFieldModel[] = [
        {
            label: "Name",
            name: "name",
            type: "text",
            width: 200,
            align: "left",
            editable: true,
            search: true,
        } as GridFieldModel,
        {
            label: "Product",
            name: "productType",
            type: "text",
            width: 70,
            search: true,
        } as GridFieldModel,
        {
            label: "Employer",
            name: "employerName",
            type: "text",
            width: 250,
            search: true,
        } as GridFieldModel,
        {
            label: "Type",
            name: "type",
            type: "text",
            width: 60,
            align: "right",
            search: true,
        } as GridFieldModel,        
        {
            hidden: false,
            key: true,
            label: "ID",
            name: "id",
            align: "right",
            width: 305,
            type: "text"
        } as GridFieldModel,
        {
            hidden: false,
            key: true,
            label: "Account ID",
            name: "accountId",
            align: "right",
            width: 305,
            type: "text"
        } as GridFieldModel,
        {
            hidden: false,
            key: true,
            label: "External ID",
            name: "sederaMemberExternalId",
            align: "right",
            width: 305,
            type: "text"
        } as GridFieldModel
    ];
    const [grid, setGrid] = useState<any>();
    const [data, setData] = useState<MemberModel[]>([]);
    const RESOURCE_NAME = 'members';

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
            rowNum: 15,
            altRows: true, // Set a zebra-striped grid (alternate rows have different styles)
            rowList: [15, 75, "10000:All"],
            navOptions: {
                del: false,
                add: false,
                edit: false,
                search: false,
                refresh: false,
                view: false
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
        const arr = data != null ? data : []

        grid.jqGrid('clearGridData');
        grid.jqGrid('setGridParam', { data: arr.map(fm => { return { 'id': fm.id, 'cell': meta.map(x => (fm as any)[x.name]) } }) });
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

    return <div>
        <table id='grid' />
        <br />
        <br />
        <br />
        {data &&
            <CSVLink data={data}
                headers={meta.map(x => x.name)}
                className="sl-button-export cl-position-absolute"
                filename="members.csv">
                CSV Export
        </CSVLink>
        }
    </div >
}