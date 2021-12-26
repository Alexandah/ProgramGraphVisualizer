// import * as React from "react";
// import * as toastr from "toastr";
// import 'free-jqgrid';
// import { GridFieldModel, GridFunc, GridFieldSearchRulesModel, GridFieldSOptionsModel } from "src/model/grid-field";
// import SearchingDialogOptions = FreeJqGrid.SearchingDialogOptions;
// import JqFilterDiv = FreeJqGrid.JqFilterDiv;
// import JqFilterOptions = FreeJqGrid.JqFilterOptions;
// import AppModel from "src/model/app";
// import DataLayer from "src/datalayer";
// import InvoiceAPI from "src/api/invoice";
// import { useState } from "react";
// import 'daterangepicker';
// import QParamModel from "src/model/qparam";
// import CoreAPI from "src/api/core";
// import PaymentModel from "src/model/payment";
//
//
//
// export default function PaymentCollectionView(props: AppModel) {
//     const meta: GridFieldModel[] = [
//         {
//             label: "Employer Name",
//             name: "employerName",
//             type: "text",
//             align: "right",
//             search: true,
//         } as GridFieldModel,
//         {
//             label: "Create Date",
//             name: "dateCreate",
//             type: "date",
//             align: "right",
//             search: true,
//             searchoptions: GridFunc.searchOptionDate
//         } as GridFieldModel,
//         {
//             label: "Invoice Due Date",
//             name: "invoiceDueDate",
//             type: "date",
//             align: "right",
//             search: true,
//             searchoptions: GridFunc.searchOptionDate
//         } as GridFieldModel,
//         {
//             hidden: false,
//             label: "Status",
//             name: "status",
//             type: "text",
//             search: true,
//             autoResizable: true,
//             formatter: "select",
//             template: "select",
//             edittype: "select",
//             stype: "select",
//             align: "right",
//             searchoptions: GridFunc.searchOptionSelect,
//             editoptions: { value: "Open:Open;Paid:Paid;PartialPay:Partially Paid" }
//         } as GridFieldModel,
//         {
//             label: "Amount",
//             name: "amount",
//             type: "number",
//             sorttype: "number",
//             align: "right",
//             editable: true,
//             search: true,
//             searchoptions: GridFunc.searchOptionNumber,
//             searchrules: { number: true } as GridFieldSearchRulesModel
//         } as GridFieldModel,
//         {
//             hidden: true,
//             key: true,
//             label: "Invoice ID",
//             name: "invoiceId",
//             type: "text",
//         } as GridFieldModel,
//         {
//             label: "QuickBooks Company",
//             name: "qbCompanyName",
//             type: "text",
//             align: "right",
//             search: true,
//             searchrules: { number: true } as GridFieldSearchRulesModel
//         } as GridFieldModel,
//         {
//             hidden: true,
//             label: "QuickBooks ID",
//             name: "qb",
//             type: "text",
//             align: "right",
//             search: true,
//             searchrules: { number: true } as GridFieldSearchRulesModel
//         } as GridFieldModel,
//         {
//             hidden: true,
//             label: "QB Sync Date",
//             name: "qbDateSync",
//             type: "date",
//             align: "right",
//             search: false,
//         } as GridFieldModel
//     ];
//     const [grid, setGrid] = useState<any>();
//     const [data, setData] = useState<PaymentModel[]>([]);
//     const RESOURCE_NAME = "payments";
//
//     function fetchData(query: QParamModel) {
//         props.setIsLoading(true);
//
//         CoreAPI
//             .fetchData(RESOURCE_NAME, query)
//             .then(r => setData(r))
//             .catch(err => DataLayer.handleError(err, true))
//             .finally(() => props.setIsLoading(false));
//     }
//
//
//     React.useEffect(() => {
//         fetchData(new QParamModel(null, null, 1, 100));
//
//         CoreAPI.fetchStats(RESOURCE_NAME)
//             .then(r => props.setWidgets(r))
//             .catch(err => DataLayer.handleError(err, true));
//
//         let grid = $('#grid');
//         setGrid(grid);
//
//         grid.jqGrid({
//             colModel: meta,
//             localReader: {
//                 repeatitems: true,
//             },
//             pager: true,
//             datatype: "local",
//             iconSet: "fontAwesome",
//             guiStyle: "bootstrap4",
//             autoencode: true,
//             autoresizeOnLoad: true,
//             viewrecords: true,
//             multiselect: true,
//             multiPageSelection: true,
//             multiselectPosition: "none",
//             rownumbers: false,
//             rowNum: 15,
//             altRows: true, // Set a zebra-striped grid (alternate rows have different styles)
//             rowList: [15, 50, "10000:All"],
//             cmTemplate: { editable: true, autoResizable: true },
//             subGrid: true,
//             autoResizing: { compact: true },
//             subGridRowExpanded: function (subgridDivId: any, rowId: any) {
//                 $("#" + $.jgrid.jqID(subgridDivId)).html("<em>Invoice ID: " + rowId + "</em>");
//             },
//
//             actionsNavOptions: {
//                 editbutton: false,
//                 delbutton: false,
//                 addbutton: false,
//                 addUsericon: "fo icon-arrows-cw py-1 mx-3 px-2",
//                 addUsertitle: "Sync to QuickBooks",
//                 deleteUsericon: "fa-user-times",
//                 deleteUsertitle: "Delete user",
//                 addToCarticon: "fa-cart-plus",
//                 addToCarttitle: "Add item to the cart",
//                 custom: [
//                     {
//                         action: "addUser",
//                         position: "first",
//                         onClick: (options: any) => {
//                             alert("Add user, rowid=" + options.rowid);
//                         }
//                     },
//                 ]
//             },
//             navOptions: {
//                 del: true,
//                 add: false,
//                 edit: false,
//                 search: false,
//                 refresh: false,
//                 view: false,
//                 delicon: 'fo icon-upload',
//                 deltext: 'Sync To QuickBooks',
//                 delfunc: (fid: any) => {
//                     props.setIsLoading(true);
//                     InvoiceAPI.pushInvoiceCollectionToQuickBooks(fid)
//                         .then(r => {
//                             if (r && r.length != 0)
//                                 toastr.success(`Create ${r.length} invoices`, "QuickBooks Sync");
//                             else
//                                 toastr.warning("While operation is successful no new invoices have been created on QuickBooks.", "No Invoices Synced")
//                         })
//                         .catch(err => DataLayer.handleError(err, true))
//                         .finally(() => props.setIsLoading(false));
//                     return true;
//                 }
//             },
//             hidegrid: false,
//             shrinkToFit: false,
//             autowidth: true, // Recalculated width automatically to the width of the parent element. This is done only initially when the grid is created. In order to resize the grid when the parent element changes width you should apply custom code and use the setGridWidth method for this purpose
//
//             searching: {
//                 overlay: 0,
//                 Reset: "Reset",
//                 caption: "Filter",
//                 drag: false,
//                 clearSearch: false,
//                 closeAfterSearch: false,
//                 closeAfterReset: false,
//                 closeOnEscape: false,
//                 searchOnEnter: true,
//                 multipleSearch: true,
//                 multipleGroup: true,
//                 recreateForm: true,
//                 showQuery: false,
//                 recreateFilter: true,
//                 groupOps: [
//                     { op: "AND", text: "Match ALL" },
//                     { op: "OR", text: "Match ANY" }],
//                 beforeShowSearch: GridFunc.beforeShowSearch,
//                 afterRedraw: GridFunc.afterRedraw,
//                 afterChange: gridSearchAfterChange,
//                 onReset: () => props.setDefinition(props.barItemCurr.definitionFromServer),
//                 onSearch: gridSearchButtonClick,
//             }
//         })
//             .jqGrid("navGrid")
//             .searchGrid({ searchOnEnter: true });
//     }, []);
//
//     React.useEffect(() => {
//         if (grid == null)
//             return;
//
//         const arr = data != null ? data : []
//
//         grid.jqGrid('clearGridData');
//         grid.jqGrid('setGridParam', { data: arr.map(fm => { return { 'id': fm.id, 'cell': meta.map(x => (fm as any)[x.name]) } }) });
//         grid.getGridParam("postData").filters = props.barItemCurr.definition;
//
//         grid.trigger('reloadGrid');
//         grid.searchGrid();
//     });
//
//     function gridSearchButtonClick(filters: any) {
//         if (props.isLoading)
//             return;
//
//         let grid = $('#grid');
//         fetchData(new QParamModel(null, grid.getGridParam("postData").filters, 1, 200));
//         return false;
//     }
//
//     function gridSearchAfterChange(filter: JQuery, options: SearchingDialogOptions, filterOptions: JqFilterOptions, searchFilterDiv: JqFilterDiv) {
//         $('input[type="checkbox"]').replaceWith('<i class="fa fa-square-o" style="font-size:2rem; margin-right: 0.2rem; margin-left: 0.2rem" aria-hidden="true"/>');
//         props.setDefinition(filterOptions.filter);
//     }
//
//     return <div>
//         <table id='grid' />
//         <br />
//         <br />
//         <br />
//         <button
//             className="sl-button-export cl-position-absolute"
//             onClick={e => {
//                 props.setIsLoading(true);
//                 InvoiceAPI.createPaymentsForSelectPlusInvoices()
//                     .then(r => {
//                         if (r && r.length != 0)
//                             toastr.success(`Created/Updated ${r.length} payments`, "Payments Generated");
//                         else
//                             toastr.warning("While operation is successful no new payments have been created.", "No New Payments")
//                         fetchData(new QParamModel(null, null, 1, 100));
//                         CoreAPI.fetchStats(RESOURCE_NAME)
//                             .then(r => props.setWidgets(r))
//                             .catch(err => DataLayer.handleError(err, true));
//                     })
//                     .catch(err => DataLayer.handleError(err, true))
//                     .finally(() => props.setIsLoading(false));
//             }
//             }
//         >Generate Payments
//         </button>
//     </div >
// }