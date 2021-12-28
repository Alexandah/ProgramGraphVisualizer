import * as React from "react";
import BarItemModel, {
  BarItemGroup as BarItemGroup,
  BarItemId,
} from "src/model/filter";
import AppModel from "src/model/app";
import { useHistory } from "react-router-dom";

//---------------------------------------------------------------------------------------------------------------------------------------------------
// ------ OTHER GROUP
//---------------------------------------------------------------------------------------------------------------------------------------------------
export function Employers(props: AppModel) {
  let history = useHistory();
  return (
    <div
      className="cl-panel-item-level1 list-group-item list-group-item-action flex-column align-items-start"
      onClick={() => {
        let model = new BarItemModel({
          id: BarItemId.Employer,
          name: "Employers",
          group: BarItemGroup.Other,
        });
        props.selectView(model);
        history.push("/employers");
      }}
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <i className="fo icon-bank mr-3" />
        <span className="menu-collapsed">Employers</span>
      </div>
    </div>
  );
}

//---------------------------------------------------------------------------------------------------------------------------------------------------
export function Members(props: AppModel) {
  let history = useHistory();
  return (
    <div
      className="cl-panel-item-level1 list-group-item list-group-item-action flex-column align-items-start"
      onClick={() => {
        let model = new BarItemModel({
          id: BarItemId.Member,
          name: "Members",
          group: BarItemGroup.Other,
        });
        props.selectView(model);
        history.push("/members");
      }}
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <i className="fo icon-user mr-3" />
        <span className="menu-collapsed">Members</span>
      </div>
    </div>
  );
}

//---------------------------------------------------------------------------------------------------------------------------------------------------
// ------ SELECT PLUS
//---------------------------------------------------------------------------------------------------------------------------------------------------
export function SelectPlusContribution(props: AppModel) {
  let history = useHistory();
  return (
    <div
      className="cl-panel-item-level1 list-group-item list-group-item-action flex-column align-items-start"
      onClick={() => {
        let model = new BarItemModel({
          id: BarItemId.Contribution,
          name: "Contributions (Select+)",
          group: BarItemGroup.SelectPlus,
        });
        props.selectView(model);
        history.push("/selectPlus/contributions");
      }}
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <i className="fo icon-chart-pie mr-3" />
        <span className="menu-collapsed">Contributions</span>
      </div>
    </div>
  );
}

export function SelectPlusTransactions(props: AppModel) {
  let history = useHistory();
  return (
    <div
      className="cl-panel-item-level1 list-group-item list-group-item-action flex-column align-items-start"
      onClick={() => {
        let model = new BarItemModel({
          id: BarItemId.Transaction,
          name: "Transactions (Select+)",
          group: BarItemGroup.SelectPlus,
        });
        props.selectView(model);
        history.push("/selectPlus/transactions");
      }}
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <i className="fo icon-shuffle mr-3" />
        <span className="menu-collapsed">Transactions</span>
      </div>
    </div>
  );
}

export function SelectPlusInvoice(props: AppModel) {
  let history = useHistory();
  return (
    <div
      className="cl-panel-item-level1 list-group-item list-group-item-action flex-column align-items-start"
      onClick={() => {
        let model = new BarItemModel({
          id: BarItemId.Invoice,
          name: "Invoices (Select+)",
          group: BarItemGroup.SelectPlus,
        });
        props.selectView(model);
        history.push("/selectPlus/invoices");
      }}
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <i className="fo icon-tags mr-3" />
        <span className="menu-collapsed">Invoices</span>
      </div>
    </div>
  );
}

export function SelectPlusPayment(props: AppModel) {
  let history = useHistory();
  return (
    <div
      className="cl-panel-item-level1 list-group-item list-group-item-action flex-column align-items-start"
      onClick={() => {
        let model = new BarItemModel({
          id: BarItemId.Payment,
          name: "Payments (Select+)",
          group: BarItemGroup.SelectPlus,
        });
        props.selectView(model);
        history.push("/selectPlus/payments");
      }}
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <i className="fo icon-dollar mr-3" />
        <span className="menu-collapsed">Payments</span>
      </div>
    </div>
  );
}

//---------------------------------------------------------------------------------------------------------------------------------------------------
// ------ ACCESS PLUS
//---------------------------------------------------------------------------------------------------------------------------------------------------
export function AccessPlusContribution(props: AppModel) {
  let history = useHistory();
  return (
    <div
      className="cl-panel-item-level1 list-group-item list-group-item-action flex-column align-items-start"
      onClick={() => {
        let model = new BarItemModel({
          id: BarItemId.Contribution,
          name: "Contributions (Access+)",
          group: BarItemGroup.AccessPlus,
        });
        props.selectView(model);
        history.push("/accessPlus/contributions");
      }}
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <i className="fo icon-chart-pie mr-3" />
        <span className="menu-collapsed">Contributions</span>
      </div>
    </div>
  );
}

export function AccessPlusTransactions(props: AppModel) {
  let history = useHistory();
  return (
    <div
      className="cl-panel-item-level1 list-group-item list-group-item-action flex-column align-items-start"
      onClick={() => {
        let model = new BarItemModel({
          id: BarItemId.Transaction,
          name: "Transactions (Access+)",
          group: BarItemGroup.AccessPlus,
        });
        props.selectView(model);
        history.push("/accessPlus/transactions");
      }}
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <i className="fo icon-shuffle mr-3" />
        <span className="menu-collapsed">Transactions</span>
      </div>
    </div>
  );
}

export function AccessPlusInvoice(props: AppModel) {
  let history = useHistory();
  return (
    <div
      className="cl-panel-item-level1 list-group-item list-group-item-action flex-column align-items-start"
      onClick={() => {
        let model = new BarItemModel({
          id: BarItemId.Invoice,
          name: "Invoices (Access+)",
          group: BarItemGroup.AccessPlus,
        });
        props.selectView(model);
        history.push("/accessPlus/invoices");
      }}
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <i className="fo icon-tags mr-3" />
        <span className="menu-collapsed">Invoices</span>
      </div>
    </div>
  );
}

export function AccessPlusPayment(props: AppModel) {
  let history = useHistory();
  return (
    <div
      className="cl-panel-item-level1 list-group-item list-group-item-action flex-column align-items-start"
      onClick={() => {
        let model = new BarItemModel({
          id: BarItemId.Payment,
          name: "Payments (Access+)",
          group: BarItemGroup.AccessPlus,
        });
        props.selectView(model);
        history.push("/accessPlus/payments");
      }}
    >
      <div className="d-flex w-100 justify-content-start align-items-center">
        <i className="fo icon-dollar mr-3" />
        <span className="menu-collapsed">Payments</span>
      </div>
    </div>
  );
}

// Main container for the side bar
//---------------------------------------------------------------------------------------------------------------------------------------------------
export default function EditorSidebar(props: AppModel) {
  return (
    <div
      id="sidebar-container"
      className="col-md-3 col-xl-2 sidebar-container d-none d-md-block"
    >
      <ul className="list-group pl-3 position-fixed">
        <br />
        <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed pw-sidebar-noborder">
          <small>ACCESS PLUS</small>
        </li>
        <AccessPlusContribution {...props} />
        <AccessPlusTransactions {...props} />
        <AccessPlusInvoice {...props} />
        {/*<AccessPlusPayment {...props} />*/}
        <br />
        <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed pw-sidebar-noborder">
          <small>SELECT PLUS</small>
        </li>
        <SelectPlusContribution {...props} />
        <SelectPlusTransactions {...props} />
        <SelectPlusInvoice {...props} />
        {/*<SelectPlusPayment {...props} />*/}

        <br />
        <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed pw-sidebar-noborder">
          <small>OTHER</small>
        </li>
        <Employers {...props} />
        <Members {...props} />
      </ul>
    </div>
  );
}
